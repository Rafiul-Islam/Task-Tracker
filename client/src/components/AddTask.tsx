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
        .min(1, {message: "Description is required"})
        .max(1000, {message: "Title must be within 1000 characters"}),
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
        <div className='task-form-container mx-auto'>
            <div className='mb-4'>
                <h4>Task Form</h4>
                <small className='text-muted'>Fill in the form below to add a new task</small>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3'>
                    <input type="text" placeholder="Title" {...register("title")} />
                    <small className='text-danger'>{errors.title?.message && errors.title.message}</small>
                </div>
                <div className='mb-3'>
                    <textarea placeholder="Description" {...register("description")} />
                    <small className='text-danger'>{errors.description?.message && errors.description.message}</small>
                </div>
                <div className='mb-3'>
                    <label>Is Completed?</label>
                    <div className='d-flex align-items-center gap-1'>
                        <input className='w-auto' type="radio" value="false" checked {...register('isCompleted')}/>
                        <label className='d-inline'>No</label>
                    </div>
                    <div className='d-flex align-items-center gap-1'>
                        <input className='w-auto' type="radio" value="true" {...register('isCompleted')}/>
                        <label className='d-inline'>Yes</label>
                    </div>
                    <small className='text-danger'>{errors.isCompleted?.message && errors.isCompleted.message}</small>
                </div>
                <button className='btn btn-success' type='submit'>Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
