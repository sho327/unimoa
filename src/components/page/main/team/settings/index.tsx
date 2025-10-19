"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Trash2 } from "lucide-react"

// Mock team data
const mockTeams: Record<string, { name: string; emoji: string; description: string }> = {
  "1": { name: "Design Team", emoji: "🎨", description: "Creating beautiful user experiences" },
  "2": { name: "Development", emoji: "💻", description: "Building amazing products" },
  "3": { name: "Marketing", emoji: "📢", description: "Spreading the word" },
}

export default function SettingsPage() {
  const params = useParams()
  const teamId = params.teamId as string
  const team = mockTeams[teamId] || { name: "Team", emoji: "✨", description: "" }

  const [teamName, setTeamName] = useState(team.name)
  const [teamEmoji, setTeamEmoji] = useState(team.emoji)
  const [teamDescription, setTeamDescription] = useState(team.description)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock save - in production, this would update the database
    console.log("[v0] Saving team settings:", { teamName, teamEmoji, teamDescription })
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Team Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your team's information and preferences</p>
      </div>

      {/* Team Information */}
      <Card className="border-border rounded-3xl">
        <CardHeader>
          <CardTitle>Team Information</CardTitle>
          <CardDescription>Update your team's basic details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="emoji">Team Emoji</Label>
              <Input
                id="emoji"
                type="text"
                value={teamEmoji}
                onChange={(e) => setTeamEmoji(e.target.value)}
                maxLength={2}
                className="rounded-xl text-2xl text-center max-w-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                placeholder="What does your team do?"
                className="rounded-xl min-h-[100px]"
              />
            </div>
            <Button type="submit" className="rounded-xl">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions for this team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl border border-destructive/30">
              <div>
                <p className="font-semibold text-foreground">Delete Team</p>
                <p className="text-sm text-muted-foreground">Permanently delete this team and all its data</p>
              </div>
              <Button variant="destructive" className="rounded-xl">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
