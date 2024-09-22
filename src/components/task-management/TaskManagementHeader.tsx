import {ChangeEvent} from "react";
import {
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField
} from "@mui/material";
import {Search} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../state/store";
import {getMyTasks, setSearchContent} from "../../state/actions/taskManagement/task.slice";
import {selectMyTaskState} from "../../state/actions/taskManagement/task.selector";
import DateRangeController from "../../assets/global/DateRange/DateRandePicker";
import {TPriorityAsPayload, TStatusAsPayload} from "../../state/actions/taskManagement/task.interface";

const TaskManagementHeader = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        myTask: {page, perPage},
        filter: {searchContent, endDate, startDate, priority, status}
    } = useSelector(selectMyTaskState);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setSearchContent({
            searchContent: value
        }));
        dispatch(getMyTasks({
            page: page,
            perPage: perPage,
            searchContent: value,
            startDate: endDate,
            endDate: startDate,
            status: status,
            priority: priority,
        }));
    }

    const datePickerCallback = (data: { _fromDate: string, _toDate: string }) => {
        dispatch(getMyTasks({
            page: page,
            perPage: perPage,
            searchContent: searchContent,
            startDate: data?._fromDate,
            endDate: data?._toDate,
            status: status,
            priority: priority,
        }));
    };
    const handleChangeStatus = (e: SelectChangeEvent<"ALL" | "PENDING" | "PROGRESS" | "COMPLETED">) => {
        const value = e.target.value;
        dispatch(getMyTasks({
            page: page,
            perPage: perPage,
            searchContent: searchContent,
            startDate: startDate,
            endDate: endDate,
            status: value as TStatusAsPayload,
            priority: priority,
        }));
    }

    const handleChangePriority = (e: SelectChangeEvent<'LOW' | 'MEDIUM' | 'HIGH' | 'ALL'>) => {
        const value = e.target.value;
        dispatch(getMyTasks({
            page: page,
            perPage: perPage,
            searchContent: searchContent,
            startDate: startDate,
            endDate: endDate,
            status: status as TStatusAsPayload,
            priority: value as TPriorityAsPayload,
        }));
    }

    return (
        <Box>
            <Stack py={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Stack direction={'row'} spacing={1}>
                    <TextField
                        size={'small'}
                        placeholder={'Search...'}
                        fullWidth
                        disabled
                        sx={{display: 'none'}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <Search sx={{fontSize: '18px'}}/>
                                </InputAdornment>
                            ),
                        }}
                        value={searchContent}
                        onChange={handleSearch}
                    />
                    <FormControl fullWidth sx={{width: '160px'}}>
                        <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
                        <Select
                            size={'small'}
                            value={status}
                            fullWidth
                            label="Select Status"
                            onChange={handleChangeStatus}
                        >
                            <MenuItem value={'ALL'}>All</MenuItem>
                            <MenuItem value={'PENDING'}>Pending</MenuItem>
                            <MenuItem value={'PROGRESS'}>Progress</MenuItem>
                            <MenuItem value={'COMPLETED'}>Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{width: '160px'}}>
                        <InputLabel id="demo-simple-select-label">Select Priority</InputLabel>
                        <Select
                            size={'small'}
                            fullWidth
                            value={priority}
                            label={'Select Priority'}
                            onChange={handleChangePriority}
                        >
                            <MenuItem value={'ALL'}>All</MenuItem>
                            <MenuItem value={'LOW'}>Low</MenuItem>
                            <MenuItem value={'MEDIUM'}>Medium</MenuItem>
                            <MenuItem value={'HIGH'}>High</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Box p={3}>
                    <Box width={'20%'}>
                        <DateRangeController datePickerCallback={datePickerCallback}/>
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}
export default TaskManagementHeader;