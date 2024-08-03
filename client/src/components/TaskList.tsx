import useTasks from "../hooks/useTasks.ts";
import Loader from "./Loader.tsx";
import TaskItem from "./TaskItem.tsx";

const TaskList = () => {
  const {getAllTasks} = useTasks();
  const {data, isLoading, error} = getAllTasks;
  
  if (isLoading) return <Loader/>
  if (error) throw Error();
  return (
      <>
        <h2>All Tasks</h2>
        {data?.length === 0 && "No tasks found."}
        {data?.map((task) => <TaskItem key={task._id} task={task}/>)}
      </>
  );
};

export default TaskList;
