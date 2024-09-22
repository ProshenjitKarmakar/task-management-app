import {CircularProgress, Stack} from '@mui/material';
import React from 'react';

const LoadingFallBack: React.ReactNode = (
    <Stack alignItems={'center'} justifyContent={'center'} spacing={2} sx={{height: '80vh'}}>
        <CircularProgress color='inherit'/>
    </Stack>
);

export default LoadingFallBack;
