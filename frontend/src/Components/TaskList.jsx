import TaskItem from "./TaskItem";

function TaskList({ tasks, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} {...props} isEditing={props.editingTaskId === task.id} />
      ))}
    </div>
  );
}

export default TaskList;