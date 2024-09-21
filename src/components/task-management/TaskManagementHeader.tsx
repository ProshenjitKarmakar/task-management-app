import {InputAdornment, Stack, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import Box from "@mui/material/Box";

const TaskManagementHeader = () => {
    return (
        <Box>
            <Stack py={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <TextField
                    size={'small'}
                    placeholder={'Search...'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Search sx={{fontSize: '18px'}}/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
        </Box>
    )
}
export default TaskManagementHeader;