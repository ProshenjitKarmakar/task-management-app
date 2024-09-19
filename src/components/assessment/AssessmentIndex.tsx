import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { attemptDispatch } from "../../state/actions/assessment/assessment.slice";
import { updateMyTasks } from "../../state/actions/taskManagement/task.slice";

const AssessmentIndex = () => {
    const dispatch = useDispatch<AppDispatch>();
    const handleDispatch = () => {
        dispatch(updateMyTasks({
            id: 1,
            description: '',
            dueDate: '',
            status: 'COMPLETED',
            priority: 'HIGH',
            title: ''
        }));
    }

    return (
        <Box textAlign={'center'} mt={3}>
            <Typography>Hello there !</Typography>

            <Button onClick={handleDispatch}>
                Dispatch Assesment
            </Button>
        </Box>
    )
}
export default AssessmentIndex;