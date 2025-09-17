import React, { useRef, useEffect, useState } from "react"
import { EventItem } from "./types"

type Props = {
  date: Date
  events: EventItem[]
}

export default function GanttTimelineVertical({ date, events }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(0)

  // 監控容器高度
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) setContainerHeight(containerRef.current.clientHeight)
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  // 計算事件的百分比位置
  const getTopPercent = (time: string) => {
    const startMs = new Date(time).getTime()
    const dayStartMs = new Date(date).setHours(0, 0, 0, 0)
    const diffHours = (startMs - dayStartMs) / 1000 / 60 / 60
    return (diffHours / 24) * 100
  }

  const getHeightPercent = (start: string, end: string) => {
    const startMs = new Date(start).getTime()
    const endMs = new Date(end).getTime()
    const diffHours = (endMs - startMs) / 1000 / 60 / 60
    return (diffHours / 24) * 100
  }

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <h3>{date.toLocaleDateString()} 的活動</h3>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          border: "1px solid #ccc",
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
          width: "100%",
        }}
      >
        {/* 時間刻度 */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 40 }}>
          {Array.from({ length: 24 }, (_, i) => (
            <div
              key={i}
              style={{
                height: `${100 / 24}%`,
                borderBottom: "1px solid #eee",
                fontSize: 12,
                textAlign: "right",
                paddingRight: 4,
                boxSizing: "border-box",
              }}
            >
              {i}:00
            </div>
          ))}
        </div>

        {/* 活動條 */}
        <div style={{ marginLeft: 45, position: "relative", height: "100%" }}>
          {events.map((e, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: 0,
                top: `${getTopPercent(e.start)}%`,
                height: `${getHeightPercent(e.start, e.end)}%`,
                width: "100%",
                background: e.color || "#2196f3",
                borderRadius: 4,
                color: "#fff",
                fontSize: 12,
                padding: "0 4px",
                boxSizing: "border-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                cursor: e.url ? "pointer" : "default",
              }}
              title={e.title}
              onClick={() => e.url && window.open(e.url, "_blank")}
            >
              {e.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
