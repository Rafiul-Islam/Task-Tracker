import useTasks from "../hooks/useTasks.ts";
import Loader from "./Loader.tsx";
import TaskItem from "./TaskItem.tsx";
import {useNavigate} from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const {getAllTasks} = useTasks();
  const {data, isLoading, error} = getAllTasks;
  
  if (isLoading) return <Loader/>
  if (error) throw Error();
  return (
      <>
        <div style={{textAlign: "right", marginBottom: "10px"}}>
          <button onClick={() => navigate("/task/add")}>Add Task</button>
        </div>
        <h2>All Tasks</h2>
        {data?.length === 0 && "No tasks found."}
        {data?.map((task) => <TaskItem key={task._id} task={task}/>)}
      </>
  );
};

export default TaskList;
