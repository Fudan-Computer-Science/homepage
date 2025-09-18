import React, { useState, useEffect } from "react"
import DayCell from "./DayCell"
import { EventItem } from "./types"
import styles from "./Calendar.module.css";

type CalendarSource = {
  id: string
  color: string
}

type CalendarGridProps = {
  apiKey: string
  calendars: CalendarSource[]
}

export default function CalendarGrid({ apiKey, calendars }: CalendarGridProps) {
  const [events, setEvents] = useState<EventItem[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [days, setDays] = useState<(number | null)[]>([])
  const [loading, setLoading] = useState(false)

  // --- 依年份抓取 ---
  useEffect(() => {
    const fetchYearEvents = async () => {
      setLoading(true) // 開始載入
      const allEvents: EventItem[] = []

      const year = currentDate.getFullYear()
      const timeMin = new Date(year, 0, 1).toISOString()
      const timeMax = new Date(year, 11, 31, 23, 59, 59).toISOString()

      try {
        await Promise.all(
          calendars.map(async cal => {
            const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
              cal.id
            )}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
            const res = await fetch(url)
            const data = await res.json()
            if (data.items) {
              data.items.forEach((e: any) => {
                allEvents.push({
                  date: e.start.date || e.start.dateTime?.slice(0, 10),
                  title: e.summary || "🔒 私有活動",
                  url: e.htmlLink,
                  color: cal.color,
                })
              })
            }
          })
        )
        setEvents(allEvents)
      } catch (err) {
        console.error("載入事件失敗", err)
      } finally {
        setLoading(false) // 無論成功失敗都結束 loading
      }
    }

    fetchYearEvents()
  }, [apiKey, calendars, currentDate.getFullYear()])

  // --- 產生日曆格子 ---
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

  // --- 抓當日的活動 ---
  const getEventsForDate = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter(e => e.date === dateStr)
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div style={{ maxWidth: 800, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" }}>
        <button
          onClick={() =>
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
          }
          style={{
            background: "#f5f5f5",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "6px 12px",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#eaeaea")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
        >
          ◀ Prev
        </button>

        <h3 style={{ margin: 0 }}>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h3>

        <button
          onClick={() =>
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
          }
          style={{
            background: "#f5f5f5",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "6px 12px",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#eaeaea")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
        >
          Next ▶
        </button>
      </div>

      {/* 載入提示 */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 20 }}>⏳ 載入中...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
          {weekdays.map(day => (
            <div key={day} style={{ fontWeight: 600, textAlign: "center" }}>
              {day}
            </div>
          ))}

          {days.map((day, idx) => {
            if (!day) return <div key={idx}></div>
            const dayEvents = getEventsForDate(currentDate.getFullYear(), currentDate.getMonth(), day)
            return (
              <DayCell
                key={idx}
                day={day}
                events={dayEvents}
                onClick={() => {
                  if (dayEvents.length) {
                    const urls = dayEvents.map(e => e.url).filter(Boolean) as string[]
                    if (urls.length === 1) window.open(urls[0], "_blank")
                    else alert(dayEvents.map(e => e.title).join("\n"))
                  }
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
