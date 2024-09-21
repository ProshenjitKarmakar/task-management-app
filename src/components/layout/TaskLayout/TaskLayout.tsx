import React from 'react';
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import PrivateLayout from '../PrivateLayout';

const TaskLayout = (): any => {
    console.log("=====TaskLayout===");

    return (
        <PrivateLayout>
            <Box sx={{bgcolor: 'lightgray'}}>
                <Outlet/>
            </Box>
        </PrivateLayout>
    )
}
export default TaskLayout;
