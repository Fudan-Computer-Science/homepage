import React, { ReactElement, useMemo, useState } from "react";

// Interactive card reveal with adjustable amount
export default function BinarySearchInteractive(): ReactElement {
  const [amount, setAmount] = useState<number>(10);
  const base = useMemo(() => Array.from({ length: amount }, (_, i) => i * 3 + 1), [amount]);

  const [arr, setArr] = useState<number[]>(base);
  const [revealed, setRevealed] = useState<boolean[]>(Array(arr.length).fill(false));
  const [target, setTarget] = useState<number>(base[Math.floor(amount / 2)]); // 固定 target，可改成隨機
  const [attempts, setAttempts] = useState<number>(0);
  const [found, setFound] = useState<boolean>(false);

  function resetState(newArr?: number[]) {
    const a = newArr ?? arr;
    setArr(a);
    setRevealed(Array(a.length).fill(false));
    setAttempts(0);
    setFound(false);
  }

  function randomize() {
    const out: number[] = [];
    let cur = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < amount; i++) {
      cur += Math.floor(Math.random() * 4) + 1;
      out.push(cur);
    }
    const targetIndex = Math.floor(Math.random() * 100) % amount;
    setTarget(out[targetIndex]);
    resetState(out);
  }

  function handleClick(i: number) {
    if (found || revealed[i]) return;
    setRevealed((prev) => {
      const copy = [...prev];
      copy[i] = true;
      return copy;
    });
    setAttempts((prev) => prev + 1);
    if (arr[i] === target) setFound(true);
  }

  function renderCards() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {arr.map((v, i) => {
          const isRevealed = revealed[i];
          const isTarget = v === target && found;
          const style: React.CSSProperties = {
            flex: '1 0 8%',
            minWidth: '50px',
            height: '70px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            border: '2px solid',
            borderColor: isTarget ? 'green' : isRevealed ? 'orange' : 'gray',
            backgroundColor: isRevealed ? '#fff3cd' : '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#000000',
          };

          return (
            <div key={i} style={style} onClick={() => handleClick(i)}>
              <div>{isRevealed ? v : '?'}</div>
              <div style={{ fontSize: '10px', marginTop: '4px', color: '#555' }}>index [{i}]</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto', padding: '16px' }}>
      <h3>目標 : {target}</h3>
      <div style={{ marginBottom: '16px' }}>
      </div>
      {renderCards()}
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <label>數量: {amount}</label>
        <input
          type="range"
          min={5}
          max={20}
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <button onClick={randomize}>重製</button>
      </div>
      {found && <div style={{ marginTop: '8px' }}>找到目標 {target}！共使用 {attempts} 次翻牌。</div>}
    </div>
  );
}