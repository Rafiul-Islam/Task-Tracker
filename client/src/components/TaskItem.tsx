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
        <div className='card shadow-sm p-3 mb-3'>
            <div className='card-body'>
                <h5 className='card-title fw-bold text-muted'>{title}</h5>
                <div className='my-3'>{description}</div>
                <div>{isCompleted ?
                    <span className="badge text-bg-success">Completed</span> :
                    <span className="badge text-bg-warning">Not Completed</span>}
                </div>
            </div>
            <div className='card-footer px-2 border-0 d-flex'>
                <button className='btn btn-primary w-50' style={{margin: "0 3px", cursor: 'pointer'}} onClick={() => navigate(`/task/${taskId}`)}>
                    Update
                </button>
                <button className='btn btn-danger w-50' style={{margin: "0 3px", cursor: 'pointer'}} onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
