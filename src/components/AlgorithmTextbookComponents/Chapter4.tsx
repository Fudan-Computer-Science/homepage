import React, { useMemo, useState, JSX } from "react";

type Node = {
  value: number;
  left?: Node;
  right?: Node;
};

// 建平衡 BST（接近滿二叉樹）
function buildBalancedBST(arr: number[]): Node | undefined {
  if (!arr.length) return undefined;
  const mid = Math.floor(arr.length / 2);
  return {
    value: arr[mid],
    left: buildBalancedBST(arr.slice(0, mid)),
    right: buildBalancedBST(arr.slice(mid + 1)),
  };
}

// 計算每個節點座標（x: 0~1, y: 0~1）
function layoutBST(node?: Node, depth = 0, xStart = 0, xEnd = 1): any[] {
  if (!node) return [];
  const x = (xStart + xEnd) / 2;
  const y = depth * 0.15; // 每層垂直間距
  return [
    { node, x, y },
    ...layoutBST(node.left, depth + 1, xStart, x),
    ...layoutBST(node.right, depth + 1, x, xEnd),
  ];
}

export default function BSTInteractiveWithTarget(): JSX.Element {
  const [amount, setAmount] = useState<number>(10);
  const [sliderValue, setSliderValue] = useState<number>(10); // 用來儲存滑桿的選擇值
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [found, setFound] = useState<boolean>(false);
  const [steps, setSteps] = useState<number>(0);
  const [target, setTarget] = useState<number>(0);
  const [arr, setArr] = useState<number[]>([]);


  // 建平衡 BST
  const tree = useMemo(() => buildBalancedBST(arr), [arr]);
  const nodes = useMemo(() => layoutBST(tree), [tree]);

  // 父節點映射
  const parentMap = useMemo(() => {
    const map = new Map<number, number>();
    function dfs(node?: Node) {
      if (!node) return;
      if (node.left) map.set(node.left.value, node.value);
      if (node.right) map.set(node.right.value, node.value);
      dfs(node.left);
      dfs(node.right);
    }
    dfs(tree);
    return map;
  }, [tree]);

  // 隨機選 target
  const chooseTarget = () => {
    const out: number[] = [];
    let cur = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < sliderValue; i++) {
      cur += Math.floor(Math.random() * 4) + 1;
      out.push(cur);
    }
    const targetIndex = Math.floor(Math.random() * 100) % sliderValue;
    setTarget(out[targetIndex]);
    setArr(out);
  };

  // 初始化重設
  const resetGame = () => {
    setVisited(new Set());
    setFound(false);
    setSteps(0);
    chooseTarget();
  };

  // 重新生成樹和目標
  const handleConfirm = () => {
    setAmount(sliderValue); // 更新節點數量
    resetGame(); // 重設遊戲狀態並選擇新目標
  };

  function handleClick(val: number) {
    if (found || !isEnabled(val)) return;
    setVisited(new Set(Array.from(visited).concat(val)));
    setSteps((prev) => prev + 1);
    if (val === target) setFound(true);
  }

  function isEnabled(val: number) {
    if (!tree) return false;
    if (val === tree.value) return true; // root 可點
    const parent = parentMap.get(val);
    return parent !== undefined && visited.has(parent);
  }

  // 樹路徑高亮
  const pathToTarget = useMemo(() => {
    const path: number[] = [];
    function dfs(node?: Node): boolean {
      if (!node) return false;
      if (node.value === target) {
        path.push(node.value);
        return true;
      }
      if (dfs(node.left) || dfs(node.right)) {
        path.push(node.value);
        return true;
      }
      return false;
    }
    dfs(tree);
    return path;
  }, [tree, target]);

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
      <h3>
        (按下確認鍵開始) - 目標為 {target} <br />
        目前共走 {steps} 步 {found && `恭喜找到🎉🎉🎉`}
      </h3>
      <div>
        <label>調整節點數量:</label>
        <input
          type="range"
          min={5}
          max={20}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
        />
        <span>{sliderValue}</span>
        <button onClick={handleConfirm} style={{ marginLeft: "10px" }}>
          確認
        </button>
      </div>
      <div style={{ position: "relative", width: "100%", height: "400px", border: "1px solid #ccc", marginTop: "16px" }}>
        <svg width="100%" height="100%">
          {/* 畫父子連線 */}
          {nodes.map(({ node, x, y }) => {
            if (node.left) {
              const child = nodes.find((n) => n.node.value === node.left!.value)!;
              return (
                <line
                  key={`line-${node.value}-${child.node.value}`}
                  x1={`${x * 100}%`}
                  y1={`${y * 100}%`}
                  x2={`${child.x * 100}%`}
                  y2={`${child.y * 100}%`}
                  stroke={found && pathToTarget.includes(node.value) && pathToTarget.includes(child.node.value) ? "green" : "black"}
                  strokeWidth={found && pathToTarget.includes(node.value) && pathToTarget.includes(child.node.value) ? 3 : 1}
                />
              );
            }
            return null;
          })}
          {nodes.map(({ node, x, y }) => {
            if (node.right) {
              const child = nodes.find((n) => n.node.value === node.right!.value)!;
              return (
                <line
                  key={`line-${node.value}-${child.node.value}`}
                  x1={`${x * 100}%`}
                  y1={`${y * 100}%`}
                  x2={`${child.x * 100}%`}
                  y2={`${child.y * 100}%`}
                  stroke={found && pathToTarget.includes(node.value) && pathToTarget.includes(child.node.value) ? "green" : "black"}
                  strokeWidth={found && pathToTarget.includes(node.value) && pathToTarget.includes(child.node.value) ? 3 : 1}
                />
              );
            }
            return null;
          })}
        </svg>
        {/* 節點 */}
        {nodes.map(({ node, x, y }) => {
          const revealed = visited.has(node.value) || (found && pathToTarget.includes(node.value));
          const enabled = isEnabled(node.value);
          const isTarget = node.value === target && found;
          return (
            <div
              key={node.value}
              onClick={() => handleClick(node.value)}
              style={{
                position: "absolute",
                left: `calc(${x * 100}% - 20px)`,
                top: `calc(${y * 100}% - 20px)`,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: revealed ? "#ffe082" : "#fff",
                border: `2px solid ${isTarget ? 'green' : revealed ? "orange" : enabled ? "blue" : "gray"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: enabled && !found ? "pointer" : "default",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {revealed ? node.value : "?"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
