import { useState } from "react";

export default function CounterExercise1() {
    const [n, setN] = useState(0);
    const displayText = n < 0 || n > 9 ? "這數字好奇怪，我不會數" : n;

    function ChangeNButton({ ChangeAmount, text }) {
        return (
            <button onClick={() => setN(n + ChangeAmount)} style={{ marginRight: "0.5rem" }}>
                {text}
            </button>
        );
    }

    return (
        <div style={{ padding: "1rem", border: "1px solid #ccc" }}>
            <p style={{ fontSize: "1.2rem" }}>{displayText}</p>
            <ChangeNButton ChangeAmount={-1} text="減一" />
            <ChangeNButton ChangeAmount={1} text="加一" />
        </div>
    );
}