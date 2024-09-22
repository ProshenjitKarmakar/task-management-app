import React from 'react';
import {Box, Button, Stack} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import PrivateLayout from '../PrivateLayout';
import LogoutIcon from "@mui/icons-material/Logout";
import {clearCookie} from "../../../helpers/Cookie";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../state/store";
import {resetDashboardCounts, resetMyLists} from "../../../state/actions/taskManagement/task.slice";
import showToaster from "../../../helpers/utility/showToaster";

const TaskLayout = (): any => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleLogout = () => {
        clearCookie(process.env.REACT_APP_ACCESS_TOKEN as string);
        dispatch(resetMyLists());
        dispatch(resetDashboardCounts());
        showToaster.success('Successfully Logout!');
        navigate('/login');
    }

    return (
        <PrivateLayout>
            <Box sx={{bgcolor: 'lightgray'}}>
                <Stack alignItems={'end'} pr={3}>
                    <Button startIcon={<LogoutIcon/>} onClick={handleLogout}>
                        Logout
                    </Button>
                </Stack>
                <Outlet/>
            </Box>
        </PrivateLayout>
    )
}
export default TaskLayout;
