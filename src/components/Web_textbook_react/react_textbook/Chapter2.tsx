import { useState } from "react";

export default function CounterExercise1() {
    const [arr, setArr] = useState([]);
    return (
        <>
            <ul>
                {arr.map((ele, index) => (
                    <li key={index}>{ele}</li>
                ))}
            </ul>
            <button onClick={() => {
                    const time = new Date().toLocaleTimeString();
                    setArr([...arr, time]);
            }}>
                按我新增時間</button>
        </>
    );
}