"use client";
import { useRef, useState } from "react";
import { nanoid } from "nanoid";

const Todo = () => {
    const [tasks, setTasks] = useState<{ title: string; id: string }[]>([]);
  const referenceInput = useRef<HTMLInputElement>(null);

  const handleAddTask = () => {
    if (referenceInput.current) {
      const inputValue = referenceInput.current.value.trim();
      if (inputValue) {
        setTasks([{ title: inputValue, id: nanoid() }, ...tasks]);
        referenceInput.current.value = ""; // Clear input field after adding task
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const deleteTask = (taskId: string) => {
    const newArray = tasks.filter((elem) => elem.id !== taskId);
    setTasks(newArray);
  };

  const currentDate = new Date().toLocaleDateString();


  return (
    <div className="bg-[#071952] w-full h-screen">
      <div>
        <h1 className="pt-3 text-[2.5rem] text-center font-bold text-[#97FEED]">
          Todo List
        </h1>
        <br />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center w-full max-w-[95%] md:max-w-[90%] m-auto">
        <input
          ref={referenceInput}
          type="text"
          placeholder="Add a Task.."
          onKeyDown={handleKeyDown}
          className="w-[100%] md:w-[50%] border-2 border-[#0B666A] text-[#071952] font-semibold bg-white p-2 rounded ml-0 md:ml-2"
        />
        <div className="flex justify-center md:w-[10%]">
          <button onClick={handleAddTask} className="w-[40%] md:w-[100%] px-3 py-2 rounded bg-[#0B666A] text-[#97FEED]">Add Task</button>
        </div>
      </div>
      <div>
        {tasks.map((elem) => (
          <div
            key={elem.id}
            className="flex flex-col m-3 md:m-4 border border-[#0B666A] px-3 py-2 rounded bg-[#50c6c2] font-semibold text-[#071952] text-[1rem] md:text-[1.5rem]"
          >
            <div className="flex justify-between items-center">
              <div>{elem.title}</div>
              <button
                onClick={() => deleteTask(elem.id)}
                className="bg-[#ac1b20] hover:bg-[#f34f55] px-2 py-1 md:px-4 md:py-2 rounded md:rounded-xl text-[#97FEED] text-[0.7rem] md:text-[1.2rem] h-7 md:h-12"
              >
                Delete
              </button>
            </div>
            <div className="text-[0.5rem] md:text-[0.8rem] text-center">{currentDate}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo
