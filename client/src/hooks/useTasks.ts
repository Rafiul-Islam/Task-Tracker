import createService from "../services/httpServices.ts";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import Task from "../types/Task.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const taskServices = createService<Task>("/api/tasks");

const useTasks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const getAllTasks = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: taskServices.getAll
  });
  
  const addTask = useMutation<Task, Error, Task>({
    mutationFn: (task: Task) => taskServices.create(task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
      toast.success("Task created successfully");
      navigate("/tasks");
    },
    onError: () => {
      toast.error("Failed to create task");
    }
  });
  
  const deleteTask = useMutation<void, Error, string>({
    mutationFn: (taskId: string) => taskServices.delete(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
      toast.success("Task deleted");
    },
    onError: () => {
      toast.error("Failed to delete the task");
    }
  });
  
  return {getAllTasks, addTask, deleteTask};
};

export default useTasks;
