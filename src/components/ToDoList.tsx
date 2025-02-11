import { useState } from "react";

function ToDoList() {
  const [text, setText] = useState<string>("");
  const [jobs, setJobs] = useState<string[]>(["Ăn", "Ngủ", "Code"]);

  const handleAdd = () => {
    setJobs((prevJobs: string[]) => [...prevJobs, text]);
    setText("");
  };

  const handleDel = (indexDel: number) => {
    setJobs((prevJobs: string[]) =>
      prevJobs.filter((item: string, index: number) => index !== indexDel)
    );
  };

  return (
    <>
      <h1>To do list</h1>
      <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {jobs.map((job: string, index: number) => {
          return (
            <li key={index}>
              {job}{" "}
              <button
                onClick={() => {
                  handleDel(index);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default ToDoList;
