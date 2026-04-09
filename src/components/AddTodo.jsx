import js from "@eslint/js";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddTodo = () => {
  let [adds, setAdds] = useState([]);
  let [text, setText] = useState("");
  const [editingid, setEditingid] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    let stored = localStorage.getItem("adds");
    if (stored) {
      let adds = JSON.parse(stored);
      setAdds(adds);
    }
  }, []);

  // const saveToLoS = () => {
  //   localStorage.setItem(JSON.stringify(adds));
  // };

  const addItems = () => {
    if (text.trim() !== "") {
      if (editingid) {
        const updatesAdd = adds.map((item) =>
          item.id === editingid ? { ...item, text: text, date: date } : item,
        );
        setAdds(updatesAdd);
        localStorage.setItem("adds", JSON.stringify(updatesAdd));
        setEditingid(null);
      } else {
        const newAdd = [
          ...adds,
          { id: uuidv4(), text, date, isCompleted: false },
        ];

        setAdds(newAdd);
        localStorage.setItem("adds", JSON.stringify(newAdd));
      }
      setText("");
      setDate("");
    }
  };

  const deleteItems = (id) => {
    const val1 = adds.filter((add) => add.id !== id);
    setAdds(val1);
    localStorage.setItem("adds", JSON.stringify(val1));
  };

  const editItems = (id) => {
    let a = adds.find((add) => add.id === id);
    if (a) {
      setText(a.text);
      setDate(a.date || "");
      setEditingid(id);
    }
  };

  const toggleComplete = (id) => {
    const val = adds.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
    );
    setAdds(val);
    localStorage.setItem("adds", JSON.stringify(val));
  };

  return (
    <div
      className="bg-gradient  from-slate-700 to-slate-900 
                 max-w-lg mx-auto mt-16 
                rounded-2xl shadow-2xl 
                p-6 text-white"
    >
      <h2 className=" font-bold text-2xl  text-white text-center mb-8">
        Your Own Todo
      </h2>
      <div
        className="flex  justify-between items-center 
                bg-slate-800 px-4 py-2 
                rounded-lg mt-3 "
      >
        <div className=" mx-2 ">
          <input
            className="w-full px-4 py-2 rounded-lg border border-b-lime-600 
             text-black focus:outline-none 
             focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter Todo Here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="col-4">
          <input
            className="todo-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mx-2">
          <button
            onClick={addItems}
            type="button"
            className="bg-blue-700 hover:bg-blue-500 
             px-4 py-2 rounded
             transition duration-300"
          >
            {editingid ? "update" : "Add"}
          </button>
        </div>
      </div>
      <ul>
        {adds.map((item) => (
          <li key={item.id}>
            <div
              className="flex justify-between items-start 
                bg-slate-800 px-4 py-3 
                rounded-xl mt-4 
                gap-3"
            >
              <div className="flex flex-1 gap-3   ">
                <input
                  onChange={() => {
                    toggleComplete(item.id);
                  }}
                  checked={item.isCompleted}
                  type="checkbox"
                />

                <p
                  className={`break-word       whitespace-normal 
               ${item.isCompleted ? "line-through text-gray-400" : ""}`}
                >
                  {item.text}
                </p>
                {item.date && (
                  <p className="text-sm text-gray-400 mt-1">
                    📅 {new Date(item.date).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="l">
                <div className="flex gap-2  shrink-0 ">
                  <lord-icon
                    onClick={() => deleteItems(item.id)}
                    src="https://cdn.lordicon.com/sxhqklqh.json"
                    trigger="hover"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>

                  <lord-icon
                    onClick={() => editItems(item.id)}
                    src="https://cdn.lordicon.com/fikcyfpp.json"
                    trigger="hover"
                    colors="primary:#e4e4e4,secondary:#08a88a"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTodo;
