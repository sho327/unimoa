"use client"

import type React from "react"

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
import { Textarea } from "@/components/ui/textarea"
import { Plus, CalendarIcon, Clock, MapPin, Users } from "lucide-react"
// Layout/Modules
import PageHeader from "@/components/layout/page-header"

type Event = {
  id: number
  title: string
  description: string
  date: string
  time: string
  location?: string
  attendees: string[]
  color: string
}

// Mock events data
const mockEvents: Event[] = [
  {
    id: 1,
    title: "Team Standup",
    description: "Daily sync meeting",
    date: "2024-03-15",
    time: "09:00",
    location: "Zoom",
    attendees: ["Alice", "Bob", "Carol"],
    color: "bg-primary",
  },
  {
    id: 2,
    title: "Design Review",
    description: "Review new homepage designs",
    date: "2024-03-16",
    time: "14:00",
    location: "Conference Room A",
    attendees: ["Alice", "David"],
    color: "bg-chart-2",
  },
  {
    id: 3,
    title: "Sprint Planning",
    description: "Plan tasks for next sprint",
    date: "2024-03-18",
    time: "10:00",
    location: "Office",
    attendees: ["Alice", "Bob", "Carol", "David", "Eve"],
    color: "bg-chart-3",
  },
  {
    id: 4,
    title: "Client Presentation",
    description: "Present Q1 progress to client",
    date: "2024-03-20",
    time: "15:00",
    location: "Client Office",
    attendees: ["Alice", "Bob"],
    color: "bg-chart-4",
  },
]

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  })

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    const event: Event = {
      id: events.length + 1,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      attendees: ["You"],
      color: "bg-primary",
    }
    setEvents([...events, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    setIsCreateOpen(false)
    setNewEvent({ title: "", description: "", date: "", time: "", location: "" })
  }

  // Group events by date
  const eventsByDate = events.reduce(
    (acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = []
      }
      acc[event.date].push(event)
      return acc
    },
    {} as Record<string, Event[]>,
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ページヘッダー */}
      <PageHeader
        pageTitle="カレンダー"
        pageDescription="チームの予定を管理します"
        isBackButton={false}
      >
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="w-5 h-5 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Create new event</DialogTitle>
              <DialogDescription>Add an event to your team calendar</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  type="text"
                  placeholder="Team meeting"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDescription">Description</Label>
                <Textarea
                  id="eventDescription"
                  placeholder="What's this event about?"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventTime">Time</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventLocation">Location (optional)</Label>
                <Input
                  id="eventLocation"
                  type="text"
                  placeholder="Office, Zoom, etc."
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full rounded-xl">
                Create Event
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Events Timeline */}
      <div className="space-y-6">
        {Object.entries(eventsByDate).map(([date, dateEvents]) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">{new Date(date).toLocaleDateString()}</h2>
              <Badge variant="secondary" className="rounded-full">
                {dateEvents.length}
              </Badge>
            </div>
            <div className="space-y-3 pl-8">
              {dateEvents.map((event) => (
                <Card
                  key={event.id}
                  className="border-border rounded-2xl cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setSelectedEvent(event)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-1 h-full ${event.color} rounded-full`} />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground text-lg">{event.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees.length} attendees</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="rounded-3xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedEvent.description}</p>
                </div>
                {selectedEvent.location && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </h4>
                    <p className="text-muted-foreground">{selectedEvent.location}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Attendees
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.attendees.map((attendee) => (
                      <Badge key={attendee} variant="secondary" className="rounded-full">
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
