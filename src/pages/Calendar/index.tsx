import React from "react"
import CalendarGrid from "./CalendarGrid"
import BrowserOnly from "@docusaurus/BrowserOnly";
const API_KEY = "AIzaSyCzKHk9nRzKI4ldIrb1xZc8lhQgiewBoc8"

const calendars = [
  { id: "fdcs.cpp@gmail.com", color: "#2196f3", name: "程設班上課" },
  //{ id: "othercalendar@gmail.com", color: "#4caf50", name: "Other Calendar" },
  //{ id: "another@gmail.com", color: "#f44336", name: "Red Calendar" },
]

function IndexPage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <CalendarGrid apiKey={API_KEY} calendars={calendars} />

      {/* 圖例 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "24px",
          flexWrap: "wrap",
        }}
      >
        {calendars.map(cal => (
          <div
            key={cal.id}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: cal.color,
              }}
            ></div>
            <span style={{ fontSize: 14 }}>{cal.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default function App() {
return (<BrowserOnly fallback={<div>Loading calendar...</div>}>
        {() => <IndexPage />}
      </BrowserOnly>);
}