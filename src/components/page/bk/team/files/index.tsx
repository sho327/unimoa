"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload, FileText, ImageIcon, File, Download, MoreVertical, Grid3x3, List, Folder } from "lucide-react"
// Layout/Components
import PageHeader from "@/components/layout/page-header"

type FileItem = {
  id: number
  name: string
  type: "image" | "document" | "other"
  size: string
  uploadedBy: string
  uploadedAt: string
  folder: string
  url?: string
}

// Mock files data
const mockFiles: FileItem[] = [
  {
    id: 1,
    name: "homepage-design.png",
    type: "image",
    size: "2.4 MB",
    uploadedBy: "Alice",
    uploadedAt: "2024-03-10",
    folder: "Design",
    url: "/homepage-design-mockup.jpg",
  },
  {
    id: 2,
    name: "brand-guidelines.pdf",
    type: "document",
    size: "1.8 MB",
    uploadedBy: "Bob",
    uploadedAt: "2024-03-09",
    folder: "Documents",
  },
  {
    id: 3,
    name: "team-photo.jpg",
    type: "image",
    size: "3.2 MB",
    uploadedBy: "Carol",
    uploadedAt: "2024-03-08",
    folder: "Photos",
    url: "/team-photo-group.jpg",
  },
  {
    id: 4,
    name: "project-proposal.docx",
    type: "document",
    size: "856 KB",
    uploadedBy: "David",
    uploadedAt: "2024-03-07",
    folder: "Documents",
  },
  {
    id: 5,
    name: "logo-variations.png",
    type: "image",
    size: "1.2 MB",
    uploadedBy: "Alice",
    uploadedAt: "2024-03-06",
    folder: "Design",
    url: "/logo-variations.png",
  },
  {
    id: 6,
    name: "meeting-recording.mp4",
    type: "other",
    size: "45.6 MB",
    uploadedBy: "Eve",
    uploadedAt: "2024-03-05",
    folder: "Recordings",
  },
]

export default function FilesPage() {
  const [files] = useState<FileItem[]>(mockFiles)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  // Group files by folder
  const folders = Array.from(new Set(files.map((f) => f.folder)))
  const filesByFolder = folders.reduce(
    (acc, folder) => {
      acc[folder] = files.filter((f) => f.folder === folder)
      return acc
    },
    {} as Record<string, FileItem[]>,
  )

  const getFileIcon = (type: FileItem["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5" />
      case "document":
        return <FileText className="w-5 h-5" />
      default:
        return <File className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ページヘッダー */}
      <PageHeader 
        pageTitle="ファイル共有"
        pageDescription="Share and organize team files"
        isBackButton={false}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            {/* ファイルアップロードボタン(ダイアログトリガー) */}
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 rounded-sm">
                <Plus className="w-4 h-4" />
                ファイルアップロード
              </Button>
            </DialogTrigger>
            {/* ファイルアップロードダイアログ */}
            <DialogContent className="rounded-sm">
              {/* ダイアログ/ヘッダー */}
              <DialogHeader>
                <DialogTitle>ファイルアップロード</DialogTitle>
                <DialogDescription>チームのストレージにファイルを追加します</DialogDescription>
              </DialogHeader>
              {/* ダイアログ/ボディ */}
              <div className="space-y-4">
                {/* ファイル選択 */}
                <div className="border-2 border-dashed border-border rounded-sm p-12 text-center space-y-4">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-foreground font-medium">アップロードするファイルを選択してください</p>
                    <p className="text-sm text-muted-foreground mt-1">画像、その他ファイル形式に対応しています</p>
                  </div>
                  <Button variant="outline" className="rounded-sm bg-transparent">
                    ファイルを選択
                  </Button>
                </div>
                {/* フォルダ選択 */}
                <div className="space-y-2">
                  <Label htmlFor="folder">フォルダ</Label>
                  <Input id="folder" type="text" placeholder="デザイン, 書類, etc..." className="rounded-sm" />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </PageHeader>

      {/* フォルダ/タブ */}
      <Tabs defaultValue={folders[0]} className="space-y-6">
        <TabsList className="bg-secondary/50 rounded-sm p-1">
          {folders.map((folder) => (
            <TabsTrigger key={folder} value={folder} className="rounded-sm">
              <Folder className="w-4 h-4 mr-2" />
              {folder}
              <Badge variant="secondary" className="ml-2 rounded-sm">
                {filesByFolder[folder].length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {folders.map((folder) => (
          <TabsContent key={folder} value={folder} className="space-y-4">
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filesByFolder[folder].map((file) => (
                  <Card
                    key={file.id}
                    className="border-border rounded-2xl cursor-pointer hover:shadow-lg transition-all hover:scale-105 overflow-hidden"
                    onClick={() => setSelectedFile(file)}
                  >
                    {file.type === "image" && file.url ? (
                      <div className="aspect-video bg-secondary/30 relative overflow-hidden">
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-secondary/30 flex items-center justify-center">
                        <div className="text-primary">{getFileIcon(file.type)}</div>
                      </div>
                    )}
                    <CardContent className="p-4 space-y-2">
                      <p className="font-medium text-foreground text-sm truncate">{file.name}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{file.size}</span>
                        <span>{file.uploadedBy}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filesByFolder[folder].map((file) => (
                  <Card
                    key={file.id}
                    className="border-border rounded-2xl cursor-pointer hover:shadow-md transition-all"
                    onClick={() => setSelectedFile(file)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-primary flex-shrink-0">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {file.size} • Uploaded by {file.uploadedBy} on{" "}
                              {new Date(file.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* File Detail Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="rounded-3xl max-w-3xl">
          {selectedFile && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedFile.name}</DialogTitle>
                <DialogDescription>
                  Uploaded by {selectedFile.uploadedBy} on {new Date(selectedFile.uploadedAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {selectedFile.type === "image" && selectedFile.url && (
                  <div className="rounded-2xl overflow-hidden bg-secondary/30">
                    <img src={selectedFile.url || "/placeholder.svg"} alt={selectedFile.name} className="w-full" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">File Size</p>
                    <p className="font-medium text-foreground">{selectedFile.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Folder</p>
                    <p className="font-medium text-foreground">{selectedFile.folder}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground capitalize">{selectedFile.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uploaded</p>
                    <p className="font-medium text-foreground">
                      {new Date(selectedFile.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 rounded-xl">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="rounded-xl bg-transparent">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
