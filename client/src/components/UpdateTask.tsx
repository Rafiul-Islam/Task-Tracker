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
                        <input
                            className='w-auto'
                            type="radio"
                            value="false"
                            {...register('isCompleted')}
                        />
                        <label className='d-inline' htmlFor="css">No</label>
                    </div>
                    <div className='d-flex align-items-center gap-1'>
                        <input
                            className='w-auto'
                            type="radio"
                            value="true"
                            {...register('isCompleted')}
                        />
                        <label className='d-inline'>Yes</label>
                    </div>
                    <small className='text-danger'>{errors.isCompleted?.message && errors.isCompleted.message}</small>
                </div>
                <button className='btn btn-success' type='submit'>Update</button>
            </form>
        </div>
    );
};

export default AddTask;
