import Box from "@mui/material/Box";
import {
    Divider, Paper,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, Typography
} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import Table from "../../assets/global/Table/Table";
import BasicWithHeaderModal from "../../assets/global/Modal/BasicWithHeaderModal";
import TaskModal from "./modal/TaskModal";
import {IMyTask} from "../../state/actions/taskManagement/task.interface";
import TaskListTableRow from "./list-table/TaskListTableRow";
import TaskManagementHeader from "./TaskManagementHeader";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../state/store";
import {deleteMyTasks, getMyTasks, setMyTaskData} from "../../state/actions/taskManagement/task.slice";
import TaskManagementTitle from "./TaskManagementTitle";
import DeleteModalContent from "../../assets/global/Modal/DeleteModalContent";
import {selectMyTaskState} from "../../state/actions/taskManagement/task.selector";
import NotFound from './../../assets/svg/NotFound.svg';
import Skeleton from "@mui/material/Skeleton";

const TaskManagement = () => {
    const {
        filter: {searchContent, startDate, endDate, status, priority},
        myTask: {isLoading, page, perPage, total, content}
    } = useSelector(selectMyTaskState);
    const dispatch = useDispatch<AppDispatch>();
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState({
        open: false,
        id: 0
    });

    useEffect(() => {
        dispatch(getMyTasks({
            page: page,
            perPage: perPage,
            searchContent: searchContent,
            startDate: startDate,
            endDate: endDate,
            status: status,
            priority: priority
        }));
    }, []);

    const handleOpenDeleteModal = (id: number) => {
        setDeleteModal({
            open: true,
            id: id
        });
    }

    const handleCloseDeleteModal = () => {
        setDeleteModal({
            open: false,
            id: 0
        });
    }

    const handleConfirmDeleteTask = () => {
        if (deleteModal.id !== 0) {
            dispatch(deleteMyTasks({
                id: deleteModal.id
            }));

            setDeleteModal({
                open: false,
                id: 0
            })
        } else {

        }

    }

    const handleClose = () => {
        setEditModal(false)
    }
    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(getMyTasks({
            page: newPage + 1,
            perPage: perPage,
            searchContent: searchContent,
            startDate: endDate,
            endDate: startDate,
            status: status,
            priority: priority
        }));
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(getMyTasks({
            page: page,
            perPage: Number(event.target.value),
            searchContent: searchContent,
            startDate: startDate,
            endDate: endDate,
            priority: priority,
            status: status
        }));
    };
    const handleEdit = (data: IMyTask) => {
        setEditModal(true);
        setTimeout(() => {
            dispatch(setMyTaskData(data));
        }, 100);
    }

    return (
        <Stack sx={{bgcolor: 'whitesmoke', overflowY: 'scroll'}} p={5} height={'90vh'}>
            <TaskManagementTitle/>
            <Divider light sx={{my: 2}} color={'blueviolet'}/>
            <TaskManagementHeader/>
            <Divider light/>
            <Box component={Paper}>
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
                                isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Stack direction={'column'} spacing={1}>
                                                <Skeleton height={70} width={'100%'} variant={'rectangular'}/>
                                                <Skeleton height={70} width={'100%'} variant={'rectangular'}/>
                                                <Skeleton height={70} width={'100%'} variant={'rectangular'}/>
                                                <Skeleton height={70} width={'100%'} variant={'rectangular'}/>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ) : content?.length > 0 ? content?.map((item) => (
                                    <TaskListTableRow
                                        key={item?.id}
                                        tableData={item}
                                        handleDelete={handleOpenDeleteModal}
                                        handleEdit={handleEdit}
                                    />
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Box textAlign={'center'}>
                                                <img src={NotFound} alt={'Not Found'}/>
                                                <Typography color={'#3264a8'} variant={'h6'} mt={4}>
                                                    No Tasks Found!
                                                </Typography>
                                            </Box>

                                        </TableCell>
                                    </TableRow>

                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider sx={{py: 2}}/>

                <TablePagination
                    component='div'
                    count={total}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    rowsPerPage={perPage}
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

            <BasicWithHeaderModal
                modalTitle={'Delete Task'}
                open={deleteModal.open}
                width={500}
                onClose={handleCloseDeleteModal}
                header={true}
                disableOutSideClick={false}
                headerBorder={true}
            >
                <DeleteModalContent handleModalClose={handleCloseDeleteModal} onSingleDelete={handleConfirmDeleteTask}/>
            </BasicWithHeaderModal>
        </Stack>
    )
}
export default TaskManagement