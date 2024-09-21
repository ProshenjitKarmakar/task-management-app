import {InputAdornment, Stack, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../state/store";
import {getMyTasks, setDates, setSearchContent} from "../../state/actions/taskManagement/task.slice";
import {selectMyTaskState} from "../../state/actions/taskManagement/task.selector";
import DateRangeController from "../../assets/global/DateRange/DateRandePicker";

const TaskManagementHeader = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        myTask: {page, perPage},
        filter: {searchContent, endDate, startDate}
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
            fromDate: endDate,
            toDate: startDate
        }));
    }

    const datePickerCallback = (data: { _fromDate: string, _toDate: string }) => {
        dispatch(setDates({
            fromDate: data?._fromDate,
            toDate: data?._toDate
        }));

        dispatch(getMyTasks({
            page: page,
            perPage: perPage,
            searchContent: searchContent,
            fromDate: data?._fromDate,
            toDate: data?._toDate,
        }));
    };

    return (
        <Box>
            <Stack py={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <TextField
                    size={'small'}
                    placeholder={'Search...'}
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