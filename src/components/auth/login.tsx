import { VisibilityOffOutlined } from "@mui/icons-material";
import { Box, Button, Checkbox, Divider, FormControlLabel, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateMyTasks } from '../../state/actions/taskManagement/task.slice';
import { AppDispatch } from "../../state/store";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleTest = () => {
        dispatch(updateMyTasks({
            id: 1,
            description: '',
            dueDate: '',
            status: 'COMPLETED',
            priority: 'HIGH',
            title: ''
        }));
        // dispatch(attemptDispatch());
        // dispatch(getMyTasks({ page: 1, perPage: 10, searchContent: '' }));

    }

    return (
        <>
            <Stack width={'100%'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
                {/* <Typography component={'h1'} p={2}>Test Saga!</Typography>
                <Button onClick={handleTest} variant={'contained'}>DISPATCH</Button> */}

                <Stack spacing={2} p={5} width={'400px'} sx={{ border: '2px solid #000', borderRadius: '15px' }}>
                    <Box textAlign={'center'} width={'100%'}>
                        <Typography variant={'h5'} color={'text.primary'}>
                            Welcome To Login Page
                        </Typography>
                        <Typography variant={'body2'} color={'text.secondary'}>
                            Please sign in to your account
                        </Typography>
                    </Box>
                    <form>
                        <Stack spacing={2}>
                            <TextField size={'small'} label={'Email'} fullWidth required />
                            <div>
                                <TextField
                                    label={'Password'}
                                    fullWidth
                                    size={'small'}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <VisibilityOffOutlined sx={{ fontSize: '18px' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                    <FormControlLabel control={<Checkbox size={'small'} color='primary' />} label={'Remember Me'} />
                                    <Typography variant={'body2'} color={'primary.main'}>
                                    </Typography>
                                </Stack>
                            </div>
                            <Button fullWidth variant="contained">Log in</Button>
                        </Stack>
                    </form>
                </Stack>
            </Stack>
        </>
    )
}

export default Login;
