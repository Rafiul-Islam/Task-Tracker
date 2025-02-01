import useTasks from "../../hooks/useTasks.ts";
import Loader from "../../components/Loader.tsx";
import TaskItem from "../../components/TaskItem.tsx";
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
                <button className='btn btn-success' type="button" onClick={() => navigate("/task/add")}>
                    Add Task
                </button>
            </div>
            <h4>All Tasks</h4>
            {data?.length === 0 && <p className='text-danger'>No tasks found</p>}
            <div className='row'>
                {data?.map((task) => (
                    <div key={task._id} className='col-md-6 col-xl-3'>
                        <TaskItem task={task}/>
                    </div>
                ))}
            </div>

        </>
    );
};

export default TaskList;
