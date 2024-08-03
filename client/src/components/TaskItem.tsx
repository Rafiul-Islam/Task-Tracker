import Task from "../types/Task.ts";
import useTasks from "../hooks/useTasks.ts";

interface Props {
  task: Task
}

const TaskItem = ({task}: Props) => {
  const {_id: taskId, title, isComplete, description} = task;
  const {deleteTask} = useTasks();
  const handleDelete = () => {
    deleteTask.mutate(taskId);
  }
  
  return (
      <div style={{border: '2px solid gray', marginBottom: '10px', padding: "15px"}}>
        <p>{taskId}</p>
        <p>{title}</p>
        <p>{description}</p>
        <p>{isComplete ? 'Completed' : "Not Completed"}</p>
        <button style={{margin: "0 3px", cursor: 'pointer'}}>Update</button>
        <button style={{margin: "0 3px", cursor: 'pointer'}} onClick={handleDelete}>Delete</button>
      </div>
  );
};

export default TaskItem;
