import React, { useState } from "react";

const INITIAL_TASKS = [
  { id: 1, title: "Design Landing Page", status: "todo" },
  { id: 2, title: "Setup Authentication", status: "inProgress" },
  { id: 3, title: "Deploy to Vercel", status: "done" },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "inProgress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  const handleDragStart = (id) => setDraggedTaskId(id);

  const handleDrop = (status) => {
    if (!draggedTaskId) return;
    setTasks(tasks.map(t => t.id === draggedTaskId ? { ...t, status } : t));
    setDraggedTaskId(null);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Kanban Board</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        {columns.map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.id)}
            style={{ background: "#f4f5f7", padding: "12px", borderRadius: "6px", minHeight: "250px" }}
          >
            <h3>{col.title}</h3>
            {tasks.filter(t => t.status === col.id).map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task.id)}
                style={{
                  background: "#fff",
                  padding: "10px",
                  margin: "8px 0",
                  borderRadius: "4px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                  cursor: "grab"
                }}
              >
                {task.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}