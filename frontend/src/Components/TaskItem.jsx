import React from "react";

function TaskItem({ 
  task, 
  onToggleStatus, 
  onDelete, 
  onEdit, 
  onSave, 
  isEditing, 
  editedTitle, 
  setEditedTitle,
  editedDescription, 
  setEditedDescription,
  editedPriority, 
  setEditedPriority,
  editedDueDate, 
  setEditedDueDate 
}) {
  const isDone = task.status === "Done";
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "#f87171";
      case "Medium": return "#fbbf24";
      default: return "#38bdf8";
    }
  };

  return (
    <div style={{
      ...styles.card,
      opacity: isDone ? 0.5 : 1,
      borderLeft: `4px solid ${isDone ? "#10b981" : getPriorityColor(task.priority)}`
    }}>
      {isEditing ? (
        <div style={styles.editContainer}>
          <div style={styles.editRow}>
            <input 
              style={styles.input} 
              type="text"
              value={editedTitle} 
              onChange={(e) => setEditedTitle(e.target.value)} 
              placeholder="Task Title"
            />
            <select 
              style={styles.input} 
              value={editedPriority} 
              onChange={(e) => setEditedPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <textarea 
            style={{...styles.input, minHeight: "60px"}} 
            value={editedDescription} 
            onChange={(e) => setEditedDescription(e.target.value)} 
            placeholder="Description"
          />

          <div style={styles.editRow}>
            {/* Added Date Input here for Editing */}
            <input 
              style={styles.input} 
              type="date" 
              value={editedDueDate} 
              onChange={(e) => setEditedDueDate(e.target.value)} 
            />
            <div style={styles.editActions}>
              <button style={styles.saveBtn} onClick={() => onSave(task.id)}>Save</button>
              <button style={styles.cancelBtn} onClick={() => onEdit(null)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={styles.content}>
            <h3 style={{
              ...styles.title, 
              textDecoration: isDone ? "line-through" : "none",
              color: isDone ? "#94a3b8" : "#f8fafc"
            }}>
              {task.title}
            </h3>
            {task.description && <p style={styles.desc}>{task.description}</p>}
            <div style={styles.meta}>
              <span style={styles.tag}>Priority: {task.priority}</span>
              <span style={styles.tag}>Due: {task.due_date ? task.due_date.split("T")[0] : "No Date"}</span>
            </div>
          </div>
          <div style={styles.actions}>
            <button 
              onClick={() => onToggleStatus(task)} 
              style={{...styles.actionBtn, color: isDone ? "#10b981" : "#94a3b8"}}
            >
              {isDone ? "✓ Done" : "Mark Done"}
            </button>
            <button onClick={() => onEdit(task)} style={styles.actionBtn}>Edit</button>
            <button onClick={() => onDelete(task.id)} style={{...styles.actionBtn, color: "#f87171"}}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "all 0.3s ease",
    marginBottom: "16px"
  },
  content: { flex: 1, marginRight: "20px" },
  title: { margin: "0 0 6px 0", fontSize: "18px", fontWeight: "600" },
  desc: { color: "#94a3b8", fontSize: "14px", margin: "0 0 12px 0", lineHeight: "1.4" },
  meta: { display: "flex", gap: "16px", fontSize: "12px", color: "#64748b" },
  tag: { backgroundColor: "rgba(255,255,255,0.03)", padding: "2px 8px", borderRadius: "4px" },
  actions: { display: "flex", gap: "8px" },
  actionBtn: { 
    background: "rgba(255,255,255,0.03)", 
    border: "none", 
    padding: "8px 12px", 
    borderRadius: "8px", 
    cursor: "pointer", 
    fontWeight: "600", 
    fontSize: "13px" 
  },
  editContainer: { display: "flex", flexDirection: "column", gap: "12px", width: "100%" },
  editRow: { display: "flex", gap: "12px", alignItems: "center" },
  input: { 
    backgroundColor: "#0f172a", 
    border: "1px solid #334155", 
    color: "#f8fafc", 
    padding: "10px", 
    borderRadius: "8px", 
    flex: 1,
    outline: "none"
  },
  editActions: { display: "flex", gap: "8px" },
  saveBtn: { backgroundColor: "#38bdf8", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" },
  cancelBtn: { background: "none", border: "1px solid #334155", color: "#94a3b8", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }
};

export default TaskItem;