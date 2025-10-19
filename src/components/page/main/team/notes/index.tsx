"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Plus, FileText, Clock, User } from "lucide-react"
// Layout/Modules
import PageHeader from "@/components/layout/page-header"

type Note = {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

// Mock notes data
const mockNotes: Note[] = [
  {
    id: 1,
    title: "Q1 Planning Meeting Notes",
    content:
      "Discussed goals for Q1 including new feature launches, team expansion, and marketing initiatives. Key action items: finalize roadmap by end of week, schedule follow-up meetings.",
    author: "Alice",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-10",
    tags: ["planning", "meeting"],
  },
  {
    id: 2,
    title: "Design System Guidelines",
    content:
      "Updated design system with new color palette and component specifications. All team members should reference this for consistency.",
    author: "Bob",
    createdAt: "2024-03-08",
    updatedAt: "2024-03-09",
    tags: ["design", "guidelines"],
  },
  {
    id: 3,
    title: "API Documentation",
    content: "Comprehensive guide to our REST API endpoints, authentication methods, and rate limiting policies.",
    author: "Carol",
    createdAt: "2024-03-05",
    updatedAt: "2024-03-07",
    tags: ["technical", "api"],
  },
]

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: "",
  })

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault()
    const note: Note = {
      id: notes.length + 1,
      title: newNote.title,
      content: newNote.content,
      author: "You",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      tags: newNote.tags.split(",").map((t) => t.trim()),
    }
    setNotes([note, ...notes])
    setIsCreateOpen(false)
    setNewNote({ title: "", content: "", tags: "" })
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ページヘッダー */}
      <PageHeader 
        pageTitle="ノート"
        pageDescription="Shared knowledge base for your team"
        isBackButton={false}
      >
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="w-5 h-5 mr-2" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create new note</DialogTitle>
              <DialogDescription>Add a note to your team's knowledge base</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="noteTitle">Title</Label>
                <Input
                  id="noteTitle"
                  type="text"
                  placeholder="Note title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="noteContent">Content</Label>
                <Textarea
                  id="noteContent"
                  placeholder="Write your note here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  required
                  className="rounded-xl min-h-[200px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="noteTags">Tags (comma separated)</Label>
                <Input
                  id="noteTags"
                  type="text"
                  placeholder="meeting, planning, technical"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full rounded-xl">
                Create Note
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="border-border rounded-sm cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => setSelectedNote(note)}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <FileText className="w-8 h-8 text-primary flex-shrink-0" />
              </div>
              <CardTitle className="text-xl line-clamp-2">{note.title}</CardTitle>
              <CardDescription className="line-clamp-3">{note.content}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{note.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Note Detail Dialog */}
      <Dialog open={!!selectedNote} onOpenChange={() => setSelectedNote(null)}>
        <DialogContent className="rounded-3xl max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedNote && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedNote.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {selectedNote.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated {new Date(selectedNote.updatedAt).toLocaleDateString()}
                  </span>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedNote.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">{selectedNote.content}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
