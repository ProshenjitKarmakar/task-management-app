import {
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField
} from "@mui/material";
import {UserPatternValidator} from "../../../helpers/validator/user.validator";
import {Control, Controller, UseFormSetValue} from "react-hook-form";
import {IAddMyTask} from "../../../state/actions/taskManagement/task.interface";
import {useDispatch, useSelector} from "react-redux";
import {selectMyTaskState} from "../../../state/actions/taskManagement/task.selector";
import {AppDispatch} from "../../../state/store";
import {setTaskData} from "../../../state/actions/taskManagement/task.slice";
import {DatePicker, LocalizationProvider, MobileDateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {TaskPatternValidator} from "../../../helpers/validator/task.validator";

interface IProps {
    setValue: UseFormSetValue<IAddMyTask>
    control: Control<IAddMyTask>
}

const TaskForm = ({control, setValue}: IProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const {data: {title, description, priority, status, dueDate}} = useSelector(selectMyTaskState);

    const handleState = (fieldName: keyof IAddMyTask, value: string) => {
        setValue(fieldName, value);
        dispatch(setTaskData({
            fieldName: fieldName,
            value: value
        }))
    }

    const handleDatePicker = (value: Dayjs | null) => {
        const date = dayjs(value).format();
        handleState('dueDate', date);
    }

    return (
        <Stack spacing={2}>
            <Controller
                control={control}
                name='title'
                render={({field: {value, onChange}, fieldState: {invalid, error}}) => (
                    <FormControl fullWidth error={!!(invalid && error?.message)}>
                        <TextField
                            label={'Title'}
                            size={'small'}
                            type={'text'}
                            placeholder={'Title'}
                            required
                            value={title}
                            onChange={(e) => {
                                onChange();
                                handleState('title', e.target.value)
                            }}
                            error={!!(invalid && error?.message)}
                        />
                        <FormHelperText>{invalid && error?.message}</FormHelperText>
                    </FormControl>
                )}
                rules={TaskPatternValidator.title}
            />

            <Controller
                control={control}
                name='description'
                render={({field: {value, onChange}, fieldState: {invalid, error}}) => (
                    <FormControl fullWidth error={!!(invalid && error?.message)}>
                        <TextField
                            label={'Description'}
                            size={'small'}
                            multiline
                            rows={3}
                            type={'text'}
                            placeholder={'Description'}
                            required
                            value={description}
                            onChange={(e) => {
                                onChange();
                                handleState('description', e.target.value)
                            }}
                            error={!!(invalid && error?.message)}
                        />
                        <FormHelperText>{invalid && error?.message}</FormHelperText>
                    </FormControl>
                )}
                rules={TaskPatternValidator.description}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl size='small' sx={{mb: 3}} fullWidth>
                    <DatePicker
                        name={'dueDate'}
                        label='Due Date'
                        value={dayjs(dueDate)}
                        onChange={handleDatePicker}
                    />
                </FormControl>
            </LocalizationProvider>

            <FormControl>
                <FormLabel>Select Priority</FormLabel>
                <Divider sx={{px: 1}} light/>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel checked={priority === 'HIGH'} value="HIGH" control={<Radio/>} label="High"
                                      onClick={() => handleState('priority', 'HIGH')}/>
                    <FormControlLabel checked={priority === 'MEDIUM'} value="MEDIUM" control={<Radio/>} label="Medium"
                                      onClick={() => handleState('priority', 'MEDIUM')}/>
                    <FormControlLabel checked={priority === 'LOW'} value="LOW" control={<Radio/>} label="Low"
                                      onClick={() => handleState('priority', 'LOW')}/>
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel>Select Status</FormLabel>
                <Divider sx={{px: 1}} light/>
                <RadioGroup
                    row
                >
                    <FormControlLabel checked={status === 'PENDING'} value="PENDING" control={<Radio/>} label="Pending"
                                      onClick={() => handleState('status', 'PENDING')}/>
                    <FormControlLabel checked={status === 'PROGRESS'} value="PROGRESS" control={<Radio/>}
                                      label="Progress"
                                      onClick={() => handleState('status', 'PROGRESS')}/>
                    <FormControlLabel checked={status === 'COMPLETED'} value="COMPLETED" control={<Radio/>}
                                      label="Completed"
                                      onClick={() => handleState('status', 'COMPLETED')}/>
                </RadioGroup>
            </FormControl>
        </Stack>
    )
}
export default TaskForm;