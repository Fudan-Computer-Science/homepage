import React, { useEffect } from "react";
import "./tioj.css";
export default function TIOJCell({ user, problem, scores, updateScore }) {
  const score = scores[user]?.[problem.id];

  const getClassName = (score, max) => {
    if (score === max) return "full";
    if (score > 0) return "partial";
    return "zero";
  };

  useEffect(() => {
    if (score !== undefined) return;

    const fetchScore = async () => {
      let page = 1, maxScore = 0, hasNext = true;

      while (hasNext) {
        const url = `https://tioj.sprout.tw/problems/${problem.id}/submissions?filter_username=${user}&page=${page}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

        try {
          const resp = await fetch(proxyUrl);
          const data = await resp.json();
          const html = data.contents;
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const rows = doc.querySelectorAll("table tr");
          if (rows.length <= 1) break;
          console.log(`TIOJ ${user} P${problem.id} Page ${page} rows:`, rows.length);
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll("td");
            const s = parseFloat(cells[8]?.textContent?.trim());
            console.log(`TIOJ ${user} P${problem.id} Page ${page} Row ${i}:`, s);
            if (!isNaN(s)) maxScore = Math.max(maxScore, s);
          }

          const nextLink = doc.querySelector("a[rel='next']");
          hasNext = !!nextLink;
          page++;
        } catch (err) {
          console.error("TIOJ抓分失敗:", err);
          break;
        }
      }

      updateScore(user, problem.id, maxScore);
    };

    fetchScore();
  }, [score, problem, user, updateScore]);

  return (
    <td className={typeof score === "number" ? getClassName(score, problem.maxScore) : ""}>
      {score !== undefined ? score : "查詢中..."}
    </td>
  );
}
