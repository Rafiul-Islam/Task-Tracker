import createService from "../services/httpServices.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Task from "../types/Task.ts";

const taskServices = createService<Task>("/api/tasks");

const useTasks = () => {
  const queryClient = useQueryClient();
  
  const getAllTasks = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: taskServices.getAll
  });
  
  const deleteTask = useMutation<void, Error, string>({
    mutationFn: (taskId: string) => taskServices.delete(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  });
  
  return { getAllTasks, deleteTask };
};

export default useTasks;
