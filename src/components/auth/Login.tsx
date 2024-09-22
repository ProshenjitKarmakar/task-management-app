/* eslint-disable react-hooks/exhaustive-deps */
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../state/store";
import {Box, Stack, Typography} from "@mui/material";
import {IUserInfo} from "../../state/actions/user/user.interface";
import {attemptLogin, resetLoginState} from "../../state/actions/user/user.slice";
import LoadingButton from "../../assets/global/button/loadingButton/LoadingButton";
import {selectUserState} from "../../state/actions/user/user.selector";
import {ChangeEvent, useEffect, useState} from "react";
import {clearCookie, getCookie, setCookie} from "../../helpers/Cookie";
import hasAuthenticatedUser from "../../helpers/utility/hasAuthenticateUser";
import LoginForm from "./LoginForm";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {isLoading, isSuccess} = useSelector(selectUserState);
    const [rememberMe, setRememberMe] = useState(true);
    const {handleSubmit, setValue, control, reset} = useForm<IUserInfo>();


    useEffect(() => {
        if (hasAuthenticatedUser()) {
            navigate('/private/dashboard');
        }
        const storedEmail = getCookie('email');
        const storedPassword = getCookie('password');
        if (storedEmail && storedPassword) {
            setValue('email', storedEmail);
            setValue('password', storedPassword);
            setRememberMe(true);
        }
    }, []);

    useEffect(() => {
        if (isSuccess) {
            if (hasAuthenticatedUser()) {
                dispatch(resetLoginState());
                reset();
                navigate('/private/dashboard');
            }
        }
    }, [isSuccess, dispatch]);

    const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        if (checked) {
            setRememberMe(true);
        } else {
            setRememberMe(false);
        }
    }
    const onSubmit: SubmitHandler<IUserInfo> = (data) => {
        if (rememberMe) {
            setCookie('email', data?.email, '365 day');
            setCookie('password', data?.password, '365 day');
            dispatch(attemptLogin({
                email: data?.email.toLowerCase(),
                password: data?.password
            }));
        } else {
            clearCookie('email');
            clearCookie('password');
            dispatch(attemptLogin({
                email: data?.email.toLowerCase(),
                password: data?.password
            }));
        }
    };

    return (
        <>
            <Stack bgcolor={'floralwhite'} width={'100%'} height={'100vh'} justifyContent={'center'}
                   alignItems={'center'}>
                <Stack bgcolor={'whitesmoke'} spacing={2} p={5} width={'400px'}
                       sx={{border: '2px solid #000', borderRadius: '15px'}}>
                    <Box textAlign={'center'} width={'100%'}>
                        <Typography variant={'h5'} color={'text.primary'}>
                            Welcome To Login Page
                        </Typography>
                        <Typography variant={'body2'} color={'text.secondary'}>
                            Please sign in to your account
                        </Typography>
                    </Box>
                    <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <LoginForm
                                control={control}
                                rememberMe={rememberMe}
                                handleChecked={handleChecked}
                            />
                            <LoadingButton
                                size={'small'}
                                loadingText={'Login...'}
                                disabled={isLoading}
                                isLoading={isLoading}
                                variant="contained"
                            >
                                Log in
                            </LoadingButton>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </>
    )
}

export default Login;
