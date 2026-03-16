import { useState, useEffect } from "react";
import TaskList from "../Components/TaskList";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Form State
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  // Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Edit State
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPriority, setEditedPriority] = useState("Low");
  const [editedDueDate, setEditedDueDate] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === "") return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newTaskTitle,
          description: newTaskDescription,
          priority: newTaskPriority,
          due_date: newTaskDueDate
        })
      });
      const data = await response.json();
      if (response.ok) {
        setTasks([data, ...tasks]);
        setNewTaskTitle("");
        setNewTaskDescription("");
        setNewTaskPriority("Low");
        setNewTaskDueDate("");
        setIsAddingTask(false);
      }
    } catch (error) {
      console.error("Failed to create task");
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const token = localStorage.getItem("token");
      const updatedStatus = task.status === "Done" ? "Pending" : "Done";
      const response = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...task, status: updatedStatus })
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(tasks.map((t) => (t.id === task.id ? data : t)));
      }
    } catch (error) {
      console.error("Failed to toggle status");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task");
    }
  };

  const handleEditClick = (task) => {
    if (!task) {
      setEditingTaskId(null);
      return;
    }
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
    setEditedPriority(task.priority);
    setEditedDueDate(task.due_date || "");
  };

  const handleSaveEdit = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          priority: editedPriority,
          due_date: editedDueDate
        })
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(tasks.map((task) => (task.id === taskId ? data : task)));
        setEditingTaskId(null);
      }
    } catch (error) {
      console.error("Failed to update task");
    }
  };

  const filteredTasks = tasks
    .filter((t) => (statusFilter === "All" ? true : t.status === statusFilter))
    .filter((t) => (priorityFilter === "All" ? true : t.priority === priorityFilter));

  return (
    <div style={styles.dashboardWrapper}>
      <main style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Taskora</h1>
            <p style={styles.subtitle}>Your productivity hub</p>
          </div>

          {!isAddingTask && (
            <div style={styles.actions}>
              <select style={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </select>

              <select style={styles.select} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                <option value="All">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <button style={styles.addButton} onClick={() => setIsAddingTask(true)}>+ New Task</button>
            </div>
          )}
        </header>

        {isAddingTask ? (
          <section style={styles.formCard}>
            <h2 style={styles.formTitle}>Add New Task</h2>
            <div style={styles.formGrid}>
              <input style={styles.input} type="text" placeholder="Task title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
              <select style={styles.input} value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <textarea style={{ ...styles.input, gridColumn: "1 / -1", minHeight: "80px" }} placeholder="Description (optional)" value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} />
              <input style={styles.input} type="date" value={newTaskDueDate} onChange={(e) => setNewTaskDueDate(e.target.value)} />
            </div>
            <div style={styles.formActions}>
              <button style={styles.saveButton} onClick={handleAddTask}>Save Task</button>
              <button style={styles.cancelButton} onClick={() => setIsAddingTask(false)}>Cancel</button>
            </div>
          </section>
        ) : filteredTasks.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No tasks found. Time to relax or create a new one!</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteTask}
            onEdit={handleEditClick}
            onSave={handleSaveEdit}
            editingTaskId={editingTaskId}
            editedTitle={editedTitle}
            editedDescription={editedDescription}
            editedPriority={editedPriority}
            setEditedTitle={setEditedTitle}
            setEditedDescription={setEditedDescription}
            setEditedPriority={setEditedPriority}
            editedDueDate={editedDueDate}
            setEditedDueDate={setEditedDueDate}
          />
        )}
      </main>
    </div>
  );
}

const styles = {
  dashboardWrapper: { minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "'Inter', sans-serif", padding: "40px 20px" },
  container: { maxWidth: "900px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" },
  title: { fontSize: "32px", fontWeight: "800", margin: 0, letterSpacing: "-1px" },
  subtitle: { color: "#94a3b8", margin: "4px 0 0 0" },
  actions: { display: "flex", gap: "12px" },
  select: { backgroundColor: "#1e293b", color: "#f8fafc", border: "1px solid #334155", padding: "10px", borderRadius: "8px", fontSize: "14px" },
  addButton: { backgroundColor: "#38bdf8", color: "#0f172a", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" },
  formCard: { backgroundColor: "#1e293b", padding: "32px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" },
  formTitle: { marginTop: 0, marginBottom: "20px", fontSize: "20px" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  input: { padding: "12px", borderRadius: "8px", backgroundColor: "#0f172a", border: "1px solid #334155", color: "#f8fafc", outline: "none" },
  formActions: { display: "flex", gap: "12px", marginTop: "20px" },
  saveButton: { backgroundColor: "#38bdf8", color: "#0f172a", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" },
  cancelButton: { background: "none", border: "1px solid #334155", color: "#94a3b8", padding: "12px 24px", borderRadius: "8px", cursor: "pointer" },
  emptyState: { textAlign: "center", padding: "60px", color: "#94a3b8", border: "2px dashed #334155", borderRadius: "16px" }
};

export default DashboardPage;