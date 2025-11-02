-- =========================================
-- Tasrepo Schema (MVP)
-- =========================================

-- === Users =================================
-- Supabase Authと同期されるユーザーテーブル
-- 新規登録時にauth.users → public.usersへ自動反映
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  theme TEXT DEFAULT 'system',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- Supabase Authとの同期トリガー
-- =========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- === Groups ================================
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- === Memberships ===========================
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'member', 'guest')),
  status TEXT NOT NULL CHECK (status IN ('active', 'invited', 'removed')),
  invited_by UUID REFERENCES users(id) ON DELETE SET NULL,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, group_id)
);

-- === Tasks =================================
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('todo', 'in_progress', 'done')),
  due_date DATE,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- === Work Logs =============================
CREATE TABLE work_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_minutes INTEGER GENERATED ALWAYS AS (
    CASE WHEN end_time IS NOT NULL
         THEN EXTRACT(EPOCH FROM (end_time - start_time)) / 60
         ELSE NULL END
  ) STORED,
  memo TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- === Reports ===============================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  content TEXT NOT NULL,
  generated_from_task_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, date)
);

-- === Notifications =========================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('task', 'report', 'system', 'comment')),
  title TEXT NOT NULL,
  description TEXT,
  related_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- Indexes
-- =========================================

CREATE INDEX idx_tasks_group ON tasks(group_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);

CREATE INDEX idx_reports_group ON reports(group_id);
CREATE INDEX idx_reports_user ON reports(user_id);

CREATE INDEX idx_worklogs_task ON work_logs(task_id);
CREATE INDEX idx_worklogs_user ON work_logs(user_id);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_group ON notifications(group_id);

-- =========================================
-- storage (avatars) / RLS
-- 自分のUIDフォルダ配下のオブジェクトのみ参照・操作可能
-- =========================================
CREATE POLICY "storage: avatars_manage_self"
  ON storage.objects
  FOR ALL
  USING (auth.uid()::text = (storage.foldername(name))[2])  -- /avatars/users/{uid}/image.png 想定
  WITH CHECK (auth.uid()::text = (storage.foldername(name))[2]);

-- =========================================
-- RLS有効化
-- =========================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =========================================
-- RLSの定義について
-- # 命名規則のポイント
-- 項目	内容
-- テーブル名:	Supabase Studioのポリシー一覧でグループ化されやすい
-- 動詞（select / insert / update / delete）	操作種別を即判別
-- 条件（self / in_member_groups）	誰のものに対してか一目でわかる
-- 命名を英小文字＋スネークケースに統一	SQL的にも一貫して見やすい

-- # Studioで見たとき
-- users: select_self
-- users: update_self
-- tasks: select_in_member_groups
-- tasks: update_in_member_groups
-- => 「このテーブルで何が許されているか」がすぐ視認できる
-- =========================================

-- =========================================
-- users / RLS
-- 自分のユーザー情報のみ参照・更新可能
-- =========================================
CREATE POLICY "users: select_self"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users: update_self"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- =========================================
-- groups / RLS
-- 所属しているグループのみ参照可能
-- =========================================
CREATE POLICY "groups: select_member_groups"
  ON groups FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.group_id = groups.id
      AND memberships.user_id = auth.uid()
      AND memberships.status = 'active'
    )
  );

-- =========================================
-- memberships / RLS
-- 自分の所属データのみ参照・登録可能
-- =========================================
CREATE POLICY "memberships: select_self_active"
  ON memberships
  FOR SELECT
  USING (
    auth.uid() = user_id
    AND status = 'active'
  );

CREATE POLICY "memberships: insert_self"
  ON memberships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =========================================
-- tasks / RLS
-- 自分の所属グループのタスクのみ参照・操作可能
-- =========================================
CREATE POLICY "tasks: select_in_member_groups"
  ON tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.group_id = tasks.group_id
      AND memberships.user_id = auth.uid()
      AND memberships.status = 'active'
    )
  );

CREATE POLICY "tasks: insert_in_member_groups"
  ON tasks FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.group_id = group_id
      AND memberships.user_id = auth.uid()
      AND memberships.status = 'active'
    )
  );

CREATE POLICY "tasks: update_in_member_groups"
  ON tasks FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.group_id = tasks.group_id
      AND memberships.user_id = auth.uid()
      AND memberships.status = 'active'
    )
  );

-- =========================================
-- work_logs / RLS
-- 自分の所属グループのタスクに紐づく作業ログのみ
-- =========================================
CREATE POLICY "work_logs: select_in_member_groups"
  ON work_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tasks
      JOIN memberships ON memberships.group_id = tasks.group_id
      WHERE tasks.id = work_logs.task_id
      AND memberships.user_id = auth.uid()
      AND memberships.status = 'active'
    )
  );

CREATE POLICY "work_logs: insert_in_member_groups"
  ON work_logs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tasks
      JOIN memberships ON memberships.group_id = tasks.group_id
      WHERE tasks.id = task_id
      AND memberships.user_id = auth.uid()
      AND memberships.status = 'active'
    )
  );

-- =========================================
-- reports / RLS
-- 自分または所属グループに紐づく日報のみ
-- =========================================
CREATE POLICY "reports: select_in_member_groups"
  ON reports FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.group_id = reports.group_id
      AND memberships.user_id = auth.uid()
      AND memberships.status = 'active'
    )
  );

CREATE POLICY "reports: insert_self"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reports: update_self"
  ON reports FOR UPDATE
  USING (auth.uid() = user_id);

-- =========================================
-- notifications / RLS
-- 宛先が自分のもののみ参照可能
-- =========================================
CREATE POLICY "notifications: select_self"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);


-- =========================================
-- 完全ロックモード/FORCE RLS
-- 「ポリシーを設定していないテーブル」や「不正なアクセス」は一切通らなくなる
-- =========================================
-- ALTER TABLE tasks FORCE ROW LEVEL SECURITY;
