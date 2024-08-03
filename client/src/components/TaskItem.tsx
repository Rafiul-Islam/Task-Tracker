import Task from "../types/Task.ts";
import useTasks from "../hooks/useTasks.ts";
import {useNavigate} from "react-router-dom";

interface Props {
  task: Task
}

const TaskItem = ({task}: Props) => {
  const navigate = useNavigate();
  const {_id: taskId, title, isCompleted, description} = task;
  const {deleteTask} = useTasks();
  const handleDelete = () => {
    deleteTask.mutate(taskId || "");
  }
  
  return (
      <div style={{border: '2px solid gray', marginBottom: '10px', padding: "15px"}}>
        <p>{taskId}</p>
        <p>{title}</p>
        <p>{description}</p>
        <p>{isCompleted ? 'Completed' : "Not Completed"}</p>
        <button style={{margin: "0 3px", cursor: 'pointer'}} onClick={() => navigate(`/task/${taskId}`)}>Update</button>
        <button style={{margin: "0 3px", cursor: 'pointer'}} onClick={handleDelete}>Delete</button>
      </div>
  );
};

export default TaskItem;
