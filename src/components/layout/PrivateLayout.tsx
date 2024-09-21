import {ReactNode} from 'react';
import {Backdrop, Box, Button, CircularProgress, Stack, Typography} from "@mui/material";
import hasAuthenticatedUser from '../../helpers/utility/hasAuthenticateUser';
import {useNavigate} from 'react-router-dom';

interface IProps {
    children: ReactNode
}

const PrivateLayout = ({children}: IProps): any => {
    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate('/public/login');
    }

    if (hasAuthenticatedUser()) {
        return <>{children}</>
    } else {
        return (
            <Box
                sx={{bgcolor: '#fff', overflowY: 'auto', textAlign: 'center'}}
            >
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={true}
                >
                    <Stack spacing={2} alignItems={"center"}>
                        <Typography>You cant access private routes without login!</Typography>
                        <Button variant='outlined' color='secondary' onClick={handleBackToLogin}>Back to login</Button>
                        <CircularProgress color="inherit"/>
                    </Stack>

                </Backdrop>
            </Box>
        )
    }
}
export default PrivateLayout;
