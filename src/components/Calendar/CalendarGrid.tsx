import React, { useState, useEffect } from "react"
import DayCell from "./DayCell"
import GanttTimeline from "./GanttTimeline"
import { EventItem } from "./types"

type CalendarSource = { id: string; color: string }

type Props = { apiKey: string; calendars: CalendarSource[] }

export default function CalendarGrid({ apiKey, calendars }: Props) {
  const [events, setEvents] = useState<EventItem[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [days, setDays] = useState<(number | null)[]>([])
  const [expandedDay, setExpandedDay] = useState<number | null>(null)
  const [expandedRect, setExpandedRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    const fetchAll = async () => {
      const allEvents: EventItem[] = []
      const now = new Date().toISOString()
      await Promise.all(
        calendars.map(async cal => {
          const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cal.id)}/events?key=${apiKey}&timeMin=${now}&singleEvents=true&orderBy=startTime`
          const res = await fetch(url)
          const data = await res.json()
          if (data.items) {
            data.items.forEach((e: any) => {
              allEvents.push({
                date: e.start.date || e.start.dateTime?.slice(0, 10),
                title: e.summary || "無標題",
                url: e.htmlLink,
                color: cal.color,
                calendarId: cal.id,
                start: e.start.dateTime || e.start.date,
                end: e.end.dateTime || e.end.date,
              })
            })
          }
        })
      )
      setEvents(allEvents)
    }
    fetchAll()
  }, [apiKey, calendars])

  useEffect(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startWeekday = firstDay.getDay()
    const totalDays = lastDay.getDate()

    const grid: (number | null)[] = []
    for (let i = 0; i < startWeekday; i++) grid.push(null)
    for (let i = 1; i <= totalDays; i++) grid.push(i)
    setDays(grid)
  }, [currentDate])

  const getEventsForDate = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter(e => e.date === dateStr)
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div style={{ maxWidth: 800, margin: "auto", fontFamily: "Arial, sans-serif", position: "relative" }}>
      {/* 月份選擇 */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>Prev</button>
        <h3>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</h3>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>Next</button>
      </div>

      {/* 日曆格子 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
        {weekdays.map(day => <div key={day} style={{ fontWeight: 600, textAlign: "center" }}>{day}</div>)}

        {days.map((day, idx) => {
          if (!day) return <div key={idx}></div>
          const dayEvents = getEventsForDate(currentDate.getFullYear(), currentDate.getMonth(), day)
          return (
            <DayCell
              key={idx}
              day={day}
              events={dayEvents}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                setExpandedRect(rect)
                setExpandedDay(day)
              }}
            />
          )
        })}
      </div>

      {/* --- Modal 彈出甘特圖 --- */}
      {expandedDay && (
        <div
          onClick={() => setExpandedDay(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={e => e.stopPropagation()} // 點擊內部不關閉
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              maxWidth: "90%",
              maxHeight: "90%",
              width: "800px",
              height: "600px",
              overflow: "auto",
            }}
          >
            <GanttTimeline
              date={currentDate}
              events={getEventsForDate(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
              )}
            />
          </div>
        </div>
      )}

    </div>
  )
}
