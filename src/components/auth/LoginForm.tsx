import {ChangeEvent, useState} from "react";
import {Control, Controller} from "react-hook-form";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {UserPatternValidator} from "../../helpers/validator/user.validator";
import {IUserInfo} from "../../state/actions/user/user.interface";
import {VisibilityOff} from "@mui/icons-material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface IProps {
    control: Control<IUserInfo>
    rememberMe: boolean,
    handleChecked: (e: ChangeEvent<HTMLInputElement>) => void
}

const LoginForm = ({control, rememberMe, handleChecked}: IProps) => {
    const [passwordShow, setPasswordShow] = useState(false);
    return (
        <>
            <Controller
                control={control}
                name='email'
                render={({field: {value, onChange}, fieldState: {invalid, error}}) => (
                    <FormControl fullWidth error={!!(invalid && error?.message)}>
                        <TextField
                            label={'Email'}
                            size={'small'}
                            type={'email'}
                            placeholder={'john@mail.com'}
                            required
                            value={value}
                            onChange={onChange}
                            error={!!(invalid && error?.message)}
                        />
                        <FormHelperText>{invalid && error?.message}</FormHelperText>
                    </FormControl>
                )}
                rules={UserPatternValidator.email}
            />

            <Controller
                control={control}
                name='password'
                render={({field: {value, onChange}, fieldState: {invalid, error}}) => (
                    <FormControl fullWidth error={!!(invalid && error?.message)}>
                        <TextField
                            label={'Password'}
                            size={'small'}
                            type={passwordShow ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        position='end'
                                        onClick={() => setPasswordShow((pre) => !pre)}
                                        sx={{cursor: 'pointer'}}
                                    >
                                        {passwordShow ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                    </InputAdornment>
                                ),
                            }}
                            required
                            value={value}
                            onChange={onChange}
                            error={!!(invalid && error?.message)}
                        />
                        <FormHelperText>{invalid && error?.message}</FormHelperText>
                    </FormControl>
                )}
                rules={UserPatternValidator.password}
            />
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={handleChecked} size={'small'}
                                       color='primary'/>}
                    label={'Remember Me'}/>
                <Typography variant={'body2'} color={'primary.main'}>
                </Typography>
            </Stack>
        </>
    )
}
export default LoginForm