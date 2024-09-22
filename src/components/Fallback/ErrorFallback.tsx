import React from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {useErrorBoundary} from 'react-error-boundary';

interface IProps {
    error?: {
        message?: string;
    };
}

const ErrorFallback = ({error}: IProps) => {
    const {resetBoundary} = useErrorBoundary();

    return (
        <Container maxWidth={'md'}>
            <Box sx={{textAlign: 'center'}}>
                <Typography variant={'h3'}>Ops, Something Went Wrong!!</Typography>
                <Typography color={'error.main'}>{error?.message}</Typography>

                <Button
                    variant={'contained'}
                    onClick={() => {
                        resetBoundary();
                        window.location.reload();
                    }}
                    sx={{mr: 2}}
                >
                    Try again
                </Button>
                <Link to={'/'}>
                    <Button variant={'contained'} color={'secondary'} onClick={resetBoundary}>
                        Go Home
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default ErrorFallback;
