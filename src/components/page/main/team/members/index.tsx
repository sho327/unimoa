"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Plus, Mail, MoreVertical } from "lucide-react"
// Layout/Components
import PageHeader from "@/components/layout/page-header"

// Mock members data
const mockMembers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Owner", joinedAt: "Jan 2024" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Admin", joinedAt: "Jan 2024" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "Member", joinedAt: "Feb 2024" },
  { id: 4, name: "David Brown", email: "david@example.com", role: "Member", joinedAt: "Feb 2024" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", role: "Member", joinedAt: "Mar 2024" },
]

export default function MembersPage() {
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock invite - in production, this would send an invitation
    setIsInviteOpen(false)
    setInviteEmail("")
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ページヘッダー */}
      <PageHeader 
        pageTitle="メンバー"
        pageDescription="Manage your team members and invitations"
        isBackButton={false}
      >
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="w-5 h-5 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Invite team member</DialogTitle>
              <DialogDescription>Send an invitation to join your team</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteEmail">Email Address</Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full rounded-xl">
                Send Invitation
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Members List */}
      <Card className="border-border rounded-3xl">
        <CardHeader>
          <CardTitle>Members ({mockMembers.length})</CardTitle>
          <CardDescription>People who have access to this team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={member.role === "Owner" ? "default" : "secondary"} className="rounded-full">
                    {member.role}
                  </Badge>
                  <span className="text-sm text-muted-foreground hidden md:block">Joined {member.joinedAt}</span>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
