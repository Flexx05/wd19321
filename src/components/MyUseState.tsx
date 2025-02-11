import { useState } from "react";

function MyUseState() {
  const [counter, setCounter] = useState<number>(0);
  const handleIncrease = () => {
    setCounter(counter + 1);
  };
  const handleDecrease = () => {
    setCounter(counter - 1);
  };
  const handleReset = () => {
    setCounter(0);
  };
  return (
    <>
      <h1>Use State</h1>
      <h2>{counter}</h2>
      <button onClick={handleIncrease}>Tăng</button>
      <button onClick={handleDecrease}>Giảm</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default MyUseState;
