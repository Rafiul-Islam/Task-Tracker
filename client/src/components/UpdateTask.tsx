import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useTasks, {useGetTaskById} from "../hooks/useTasks";
import Loader from "./Loader";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

const schema = z.object({
  title: z
      .string()
      .min(1, {message: "Title is required"})
      .min(5, {message: "Title must be at least 5 characters"})
      .max(100, {message: "Title must be within 100 characters"}),
  description: z.string().default(""),
  isCompleted: z.string(),
});

type FormData = z.infer<typeof schema>;

const AddTask = () => {
  const navigate = useNavigate();
  const {taskId} = useParams();
  const {data, isLoading, error} = useGetTaskById(taskId!);
  const {updateTask} = useTasks();
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      isCompleted: "false"
    }
  });
  
  useEffect(() => {
    if (data) {
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('isCompleted', data.isCompleted.toString());
    }
  }, [data, setValue]);
  
  useEffect(() => {
    if (error) navigate("/tasks");
  }, [error, navigate]);
  
  const onSubmit = (data: FormData) => {
    const {title, description, isCompleted} = data;
    updateTask.mutate({
      taskId: taskId!,
      task: {title, description, isCompleted: isCompleted === "true"}
    });
  };
  
  if (isLoading) return <Loader/>;
  return (
      <>
        <h2>Task Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="text" placeholder="Title" {...register("title")} /> <br/>
            <span>{errors.title?.message && errors.title.message}</span>
          </div>
          <br/>
          <div>
            <textarea placeholder="Description" {...register("description")} /> <br/>
            <span>{errors.description?.message && errors.description.message}</span>
          </div>
          <br/>
          <div>
            <input
                type="radio"
                value="false"
                {...register('isCompleted')}
            />
            <label htmlFor="css">No</label><br/>
            <input
                type="radio"
                value="true"
                {...register('isCompleted')}
            />
            <label>Yes</label><br/>
            <span>{errors.isCompleted?.message && errors.isCompleted.message}</span>
          </div>
          <br/>
          <button type='submit'>Submit</button>
          <br/>
          <br/>
        </form>
      </>
  );
};

export default AddTask;
