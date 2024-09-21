import {Button, Stack, Tooltip, Typography} from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {Add} from "@mui/icons-material";
import TaskModal from "./modal/TaskModal";
import BasicWithHeaderModal from "../../assets/global/Modal/BasicWithHeaderModal";
import {useState} from "react";

const TaskManagementTitle = () => {
    const navigate = useNavigate();
    const [addModal, setAddModal] = useState(false);
    const handleClose = () => {
        setAddModal(false)
    }
    const handleOpen = () => {
        setAddModal(true)
    }
    const handleBackToDashboard = () => {
        navigate('/private/dashboard');
    }
    return (
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack direction={'row'} spacing={2}>
                <Tooltip title={'Back to Dashboard'} onClick={handleBackToDashboard}>
                    <IconButton sx={{color: 'blueviolet'}}>
                        <ReplyIcon/>
                    </IconButton>
                </Tooltip>
                <Typography variant={'h4'} color={'blueviolet'}>Manage Your Tasks</Typography>
            </Stack>
            <Button sx={{bgcolor: 'blueviolet'}} size={'medium'} startIcon={<Add/>} variant={'contained'}
                    onClick={handleOpen}>
                Create New Task
            </Button>


            <BasicWithHeaderModal
                modalTitle={'Add Tasks'}
                open={addModal}
                width={500}
                onClose={handleClose}
                header={true}
                disableOutSideClick={false}
                headerBorder={true}
            >
                <TaskModal type={'ADD'} onClose={handleClose}/>
            </BasicWithHeaderModal>
        </Stack>

    )

}
export default TaskManagementTitle;