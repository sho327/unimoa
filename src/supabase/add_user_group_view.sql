-- =========================================
-- View: user_groups_view
-- （ユーザーが所属しているグループ＋ロール・ステータス）
-- =========================================
CREATE OR REPLACE VIEW user_groups_view AS
SELECT
  m.user_id,
  g.id AS group_id,
  g.name AS group_name,
  g.description AS group_description,
  g.owner_id,
  m.role,
  m.status,
  m.joined_at,
  g.created_at AS group_created_at
FROM memberships m
JOIN groups g ON g.id = m.group_id;

-- =========================================
-- user_groups_view / RLS
-- 自分の所属しているグループのみ
-- =========================================
ALTER VIEW user_groups_view OWNER TO postgres;
GRANT SELECT ON user_groups_view TO authenticated;

-- =========================================
-- * 自分の active な membership 行のみ取得できる
-- * JOIN先の group 情報も自分が属するグループのみ見える
-- => `user_groups_view` 全体が安全に機能する
-- | 項目            | 内容                               |
-- | ------------- | -------------------------------- |
-- | 現在のポリシー       | 最低限の条件でOK（動作はする）                 |
-- | ビューに直接ポリシーは不要 | 各テーブルのRLSで制御すればOK                |
-- =========================================