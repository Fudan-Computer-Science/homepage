import React, { useState } from "react";
import TIOJCell from "@site/src/components/GetJudgeResult/tioj";
import { Problem } from "@site/src/components/GetJudgeResult/types";
const users = ["aaaaweiiii", "orztourist"];
const problems : Problem[] = 
[
  { id: 36, maxScore: 100, judge: "tioj", weight: 1, name: "sprout - 36 . queue 練習" },
  { id: 22, maxScore: 100, judge: "tioj", weight: 2, name: "sprout - 22 . IDK" }
];

function getScore(problem, user, scores, updateScore) 
{
  if(problem.judge === "tioj")
    return <TIOJCell key={`${user}-${problem.id}`} user={user} problem={problem} scores={scores} updateScore={updateScore} />;
  return <td key={`${user}-${problem.id}`}>未知評測系統</td>;
}

export default function ScoreTable() {
  const [scores, setScores] = useState({});

  const updateScore = (user, problemId, score) => {
    setScores(prev => ({
      ...prev,
      [user]: { ...prev[user], [problemId]: score }
    }));
  };

  const exportCsv = () => {
    let csv = "User," + problems.map(p => `P${p.id}`).join(",") + ",Total\n";
    users.forEach(user => {
      const row = problems.map(p => scores[user]?.[p.id] ?? "");
      const total = row.reduce((sum, val, idx) => sum + ((parseFloat(val) || 0) * problems[idx].weight), 0);
      csv += [user, ...row, total].join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "scores.csv";
    a.click();
  };

  // 計算某用戶合計分數
  const getTotal = (user) => {
    return problems.reduce((sum, p) => {
      const val = scores[user]?.[p.id] ?? 0;
      return sum + val * (p.weight || 1);
    }, 0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>多 Judge 最大分數表格</h1>
      <button onClick={exportCsv} style={{ marginBottom: "10px" }}>匯出 CSV</button>
      <table border={1} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>User \ Problem</th>
            {problems.map(p => <th key={p.id}>{p.name}</th>)}
            <th>Total</th> {/* 新增合計欄 */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user}>
              <td>{user}</td>
              {problems.map(p => (
                getScore(p, user, scores, updateScore)
              ))}
              <td>{getTotal(user)}</td> {/* 合計分數 */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
