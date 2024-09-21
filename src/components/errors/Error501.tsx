import React from 'react';
import {Box, Button, Link, Typography} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import errorIcon from './../../assets/svg/Error401.svg';

const Error501 = () => {
    return (
        <Box
            bgcolor={'other.bgPaperElevation'}
            height={'calc(100vh - 48px)'}
            sx={{textAlign: 'center'}}
        >
            <img src={errorIcon} alt=""/>
            <Box>
                <Typography variant="h3">Error 501: Unauthorized</Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                    Please try again or contact us if it isn’t fixed
                </Typography>

                <Link component={RouterLink} to="/login" underline="none">
                    <Button variant="contained" disableElevation>
                        Go back to home
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Error501;
