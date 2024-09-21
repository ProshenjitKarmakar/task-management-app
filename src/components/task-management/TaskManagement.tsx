import Box from "@mui/material/Box";
import {
    Button,
    Divider,
    InputAdornment,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import {Add, Search} from "@mui/icons-material";
import {ChangeEvent, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Table from "../../assets/global/Table/Table";
import BasicWithHeaderModal from "../../assets/global/Modal/BasicWithHeaderModal";
import TaskModal from "./modal/TaskModal";
import {IMyTask} from "../../state/actions/taskManagement/task.interface";
import TaskListTableRow from "./list-table/TaskListTableRow";
import TaskManagementHeader from "./TaskManagementHeader";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state/store";
import {setMyTaskData} from "../../state/actions/taskManagement/task.slice";
import TaskManagementTitle from "./TaskManagementTitle";

const list: IMyTask[] = [
    {
        title: 'Title 1',
        description: 'This is description',
        status: 'PENDING',
        dueDate: '2024-09-25T01:52:13+06:00',
        priority: 'MEDIUM',
        id: 1
    },
    {
        title: 'Title 2',
        description: 'This is description 2',
        status: 'PENDING',
        dueDate: '2024-10-25T01:52:13+06:00',
        priority: 'MEDIUM',
        id: 2
    },
    {
        title: 'Title 3',
        description: 'This is description 3',
        status: 'PENDING',
        dueDate: '2024-09-25T01:52:13+06:00',
        priority: 'MEDIUM',
        id: 3
    },
    {
        title: 'Title 4',
        description: 'This is description 4',
        status: 'PENDING',
        dueDate: '2024-09-25T01:52:13+06:00',
        priority: 'MEDIUM',
        id: 4
    },
    {
        title: 'Title 5',
        description: 'This is description',
        status: 'PENDING',
        dueDate: '2024-09-25T01:52:13+06:00',
        priority: 'MEDIUM',
        id: 5
    },
    {
        title: 'Title 6',
        description: 'This is description 6',
        status: 'PENDING',
        dueDate: '2024-09-25T01:52:13+06:00',
        priority: 'MEDIUM',
        id: 6
    },
]
const TaskManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [editModal, setEditModal] = useState(false);

    const handleClose = () => {
        setEditModal(false)
    }
    const handleOpen = () => {
        setEditModal(true)
    }
    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {

    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    };

    const handleDelete = (id: number) => {

    }
    const handleEdit = (data: IMyTask) => {
        setEditModal(true);
        setTimeout(() => {
            dispatch(setMyTaskData(data));
        }, 100);
    }

    return (
        <Stack sx={{bgcolor: 'whitesmoke'}} p={5} height={'90vh'}>
            <TaskManagementTitle/>
            <Divider light sx={{my: 2}} color={'blueviolet'}/>
            <TaskManagementHeader/>
            <Divider light/>
            <Box>
                <TableContainer sx={{height: '100%', overflowY: 'auto'}}>
                    <Table variant={'bordered'} stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                        <span>Title</span>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                        <span>Description</span>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                        <span>Due Date</span>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                        <span>Priority</span>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                        <span>Status</span>
                                    </Stack>
                                </TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                list?.map((item) => (
                                    <TaskListTableRow
                                        key={item?.id}
                                        tableData={item}
                                        handleDelete={handleDelete}
                                        handleEdit={handleEdit}
                                    />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider sx={{py: 2}}/>

                <TablePagination
                    component='div'
                    count={1}
                    page={1 - 1}
                    onPageChange={handleChangePage}
                    rowsPerPage={10}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>


            <BasicWithHeaderModal
                modalTitle={'Update Task'}
                open={editModal}
                width={500}
                onClose={handleClose}
                header={true}
                disableOutSideClick={false}
                headerBorder={true}
            >
                <TaskModal type={'EDIT'} onClose={handleClose}/>
            </BasicWithHeaderModal>
        </Stack>
    )
}
export default TaskManagement