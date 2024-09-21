import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../state/store";
import Box from "@mui/material/Box";
import {Button, Divider, Stack} from "@mui/material";
import LoadingButton from "../../../assets/global/button/loadingButton/LoadingButton";
import {selectMyTaskState} from "../../../state/actions/taskManagement/task.selector";
import {IAddMyTask, IMyTask} from "../../../state/actions/taskManagement/task.interface";
import {addMyTask, resetTaskData, updateMyTasks} from "../../../state/actions/taskManagement/task.slice";
import TaskForm from "./TaskForm";
import {useEffect} from "react";

interface IProps {
    type: 'ADD' | 'EDIT',
    onClose: () => void
}

const TaskModal = ({type = 'ADD', onClose}: IProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        addTask: {isLoading, isSuccess},
        data,
    } = useSelector(selectMyTaskState);
    const {handleSubmit, setValue, control} = useForm<IAddMyTask>();

    useEffect(() => {
        if (type === 'EDIT') {
            setValue('title', data?.title);
            setValue('description', data?.description);
        }
    }, [data]);

    useEffect(() => {
        return () => {
            dispatch(resetTaskData());
        }
    }, []);

    const onSubmit: SubmitHandler<IAddMyTask> = (data) => {
        if (type == 'ADD') {
            dispatch(addMyTask({
                title: data?.title,
                description: data?.description,
                priority: 'LOW',
                status: 'PENDING',
                dueDate: ''
            }));
        } else {
            dispatch(updateMyTasks({
                id: 1,
                title: data?.title,
                description: data?.description,
                priority: 'LOW',
                status: 'PENDING',
                dueDate: ''
            }));
        }
    };

    return (
        <Box p={3} component='form' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <TaskForm setValue={setValue} control={control}/>
            <Divider sx={{py: 2}}/>
            <Stack pt={2} direction={'row'} spacing={2} justifyContent={'flex-end'}>
                <Button variant={'outlined'} onClick={onClose}>
                    Cancel
                </Button>
                <LoadingButton
                    size={'small'}
                    loadingText={'Login...'}
                    disabled={isLoading}
                    isLoading={isLoading}
                    variant="contained"
                >
                    {type === 'ADD' ? 'Add Task' : 'Update Task'}
                </LoadingButton>
            </Stack>
        </Box>
    )

}
export default TaskModal;