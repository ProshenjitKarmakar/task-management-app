/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from "react";
import {Button, Divider, Grid, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import ReplyIcon from '@mui/icons-material/Reply';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../state/store";
import {selectMyTaskState} from "../../state/actions/taskManagement/task.selector";
import {dashboardCounts} from "../../state/actions/taskManagement/task.slice";
import Skeleton from "@mui/material/Skeleton";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {dashboardCount: {data, isLoading}} = useSelector(selectMyTaskState);
    const handleGoToManage = () => {
        navigate('/private/tasks');
    }

    useEffect(() => {
        if (Object.keys(data)?.length === 0) {
            dispatch(dashboardCounts())
        }
    }, [])

    return (
        <Stack bgcolor={'floralwhite'} width={'100%'} height={'100vh'} justifyContent={'center'}
               alignItems={'center'}>

            <Stack direction={'column'} bgcolor={'whitesmoke'} spacing={2} p={5} width={'700px'}
                   sx={{border: '2px solid #000', borderRadius: '15px'}}>
                <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant={'h4'} color={'blueviolet'}>
                        Dashboard
                    </Typography>
                    <Button onClick={handleGoToManage} startIcon={<ReplyIcon/>}
                            variant={'contained'}
                            sx={{bgcolor: 'blueviolet'}}>
                        Manage Tasks
                    </Button>
                </Stack>

                <Divider light color={'blueviolet'}/>

                <Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6} key={0}>
                            <Stack bgcolor={'#80bfff'} justifyContent={'center'} alignItems={'center'}
                                   sx={{border: '2px solid #000', borderRadius: '15px', padding: '80px'}}>
                                <Typography variant={'h6'}>
                                    All Tasks
                                </Typography>
                                <Box mt={2} p={2} sx={{borderRadius: '50%', bgcolor: 'white'}}>
                                    <Typography>
                                        {isLoading ? <Skeleton height={50} width={30}
                                                               sx={{borderRadius: '50%'}}/> : data?.all ?? 0}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} key={0}>
                            <Stack bgcolor={'#ffff80'} justifyContent={'center'} alignItems={'center'}
                                   sx={{border: '2px solid #000', borderRadius: '15px', padding: '80px'}}>
                                <Typography variant={'h6'} textAlign={'center'}>
                                    Pending Tasks
                                </Typography>
                                <Box mt={2} p={2} sx={{borderRadius: '50%', bgcolor: 'white'}}>
                                    <Typography>
                                        {isLoading ? <Skeleton height={50} width={30}
                                                               sx={{borderRadius: '50%'}}/> : data?.pending ?? 0}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} key={0}>
                            <Stack bgcolor={'#bbff99'} justifyContent={'center'} alignItems={'center'}
                                   sx={{border: '2px solid #000', borderRadius: '15px', padding: '80px'}}>
                                <Typography variant={'h6'} textAlign={'center'}>
                                    In Progress tasks
                                </Typography>
                                <Box mt={2} p={2} sx={{borderRadius: '50%', bgcolor: 'white'}}>
                                    <Typography>
                                        {isLoading ? <Skeleton height={50} width={30}
                                                               sx={{borderRadius: '50%'}}/> : data?.progress ?? 0}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} key={0}>
                            <Stack bgcolor={'#1aff66'} justifyContent={'center'} alignItems={'center'}
                                   sx={{border: '2px solid #000', borderRadius: '15px', padding: '80px'}}>
                                <Typography variant={'h6'} textAlign={'center'}>
                                    Completed tasks
                                </Typography>
                                <Box mt={2} p={2} sx={{borderRadius: '50%', bgcolor: 'white'}}>
                                    <Typography>
                                        {isLoading ? <Skeleton height={50} width={30}
                                                               sx={{borderRadius: '50%'}}/> : data?.completed ?? 0}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default Dashboard