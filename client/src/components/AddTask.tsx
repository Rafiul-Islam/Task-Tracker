import * as z from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useTasks from "../hooks/useTasks.ts";

const schema = z.object({
  title: z
      .string()
      .min(1, {message: "Title is required"})
      .min(5, {message: "Title must be at least 5 characters"})
      .max(100, {message: "Title must be within 100 characters"}),
  description: z
      .string()
      .default(""),
  isCompleted: z
      .string()
});

type FormData = z.infer<typeof schema>;

const AddTask = () => {
  const {addTask} = useTasks()
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = (data: FieldValues) => {
    const {title, description, isCompleted} = data;
    addTask.mutate({
      title,
      description,
      isCompleted: isCompleted === 'true'
    })
  }
  
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
            <input type="radio" value="false" checked {...register('isCompleted')}/>
            <label htmlFor="css">No</label><br/>
            <input type="radio" value="true" {...register('isCompleted')}/>
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
