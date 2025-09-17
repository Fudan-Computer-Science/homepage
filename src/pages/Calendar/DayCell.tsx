import React from "react"
import BrowserOnly from "@docusaurus/BrowserOnly";
export type EventItem = {
  title: string
  url?: string
  color?: string,
  date: any
}

type DayCellProps = {
  day: number
  events: EventItem[]
  onClick?: () => void
}

function RawDayCell({ day, events, onClick }: DayCellProps) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        minHeight: 100,
        minWidth: 100,
        padding: 8,
        display: "flex",
        flexDirection: "column",
        cursor: events.length ? "pointer" : undefined,
        transition: "transform 0.1s, box-shadow 0.2s",
      }}
      onMouseEnter={e => {
        const target = e.currentTarget
        target.style.transform = "translateY(-2px)"
        target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"
      }}
      onMouseLeave={e => {
        const target = e.currentTarget
        target.style.transform = "translateY(0)"
        target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <div style={{ fontWeight: "600", marginBottom: 4 }}>{day}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {events.map((e, i) => (
          <div
            key={i}
            style={{
              fontSize: 12,
              color: "#fff",
              background: e.color || "#2196f3",
              padding: "2px 6px",
              borderRadius: 6,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={e.title}
          >
            {e.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DayCell() {
  return (
    <BrowserOnly fallback={<div>Loading calendar...</div>}>
        {() => <RawDayCell />}
      </BrowserOnly>
  )
}
