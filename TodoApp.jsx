import React, { useState, useEffect } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("react_todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("react_todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Todo Manager</h2>
      <form onSubmit={addTodo}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Add a new task..." 
          style={{ padding: "8px", width: "70%" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: "4px" }}>Add</button>
      </form>

      <div style={{ margin: "1rem 0" }}>
        {["all", "active", "completed"].map((f) => (
          <button 
            key={f} 
            onClick={() => setFilter(f)} 
            style={{ fontWeight: filter === f ? "bold" : "normal", marginRight: "8px", textTransform: "capitalize" }}
          >
            {f}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span 
              onClick={() => toggleTodo(todo.id)} 
              style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}