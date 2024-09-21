import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../state/store";
import Box from "@mui/material/Box";
import {Button, Divider, Stack} from "@mui/material";
import LoadingButton from "../../../assets/global/button/loadingButton/LoadingButton";
import {selectMyTaskState} from "../../../state/actions/taskManagement/task.selector";
import {IAddMyTask, IMyTask} from "../../../state/actions/taskManagement/task.interface";
import {
    addMyTask,
    resetAddMyTasks,
    resetTaskData,
    updateMyTasks
} from "../../../state/actions/taskManagement/task.slice";
import TaskForm from "./TaskForm";
import {useEffect} from "react";

interface IProps {
    type: 'ADD' | 'EDIT',
    onClose: () => void
}

const TaskModal = ({type = 'ADD', onClose}: IProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        addTask: {isLoading: addIsLoading, isSuccess: addSuccess},
        updateTask: {isLoading: updateIsLoading, isSuccess: updateSuccess},
        data: {title, id, description, dueDate, status, priority},
    } = useSelector(selectMyTaskState);
    const {handleSubmit, setValue, control} = useForm<IAddMyTask>();

    useEffect(() => {
        if (type === 'EDIT') {
            setValue('title', title);
            setValue('description', description);
        }
    }, [title, description]);

    useEffect(() => {
        if (addSuccess || updateSuccess) {
            dispatch(resetAddMyTasks());
            onClose();
        }
    }, [addSuccess, updateSuccess]);

    useEffect(() => {
        return () => {
            dispatch(resetTaskData());
        }
    }, []);

    const onSubmit: SubmitHandler<IAddMyTask> = (data) => {
        if (type == 'ADD') {
            dispatch(addMyTask({
                title: title,
                description: description,
                priority: priority,
                status: status,
                dueDate: dueDate
            }));
        } else {
            dispatch(updateMyTasks({
                id: id,
                title: title,
                description: description,
                priority: priority,
                status: status,
                dueDate: dueDate
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
                    loadingText={addIsLoading ? 'Creating...' : 'Updating...'}
                    disabled={addIsLoading || updateIsLoading}
                    isLoading={addIsLoading || updateIsLoading}
                    variant="contained"
                >
                    {type === 'ADD' ? 'Add Task' : 'Update Task'}
                </LoadingButton>
            </Stack>
        </Box>
    )

}
export default TaskModal;