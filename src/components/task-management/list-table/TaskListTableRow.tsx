import {IMyTask} from "../../../state/actions/taskManagement/task.interface";
import {Chip, Stack, TableCell, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import {memo} from "react";

interface IProps {
    tableData: IMyTask,
    handleEdit: (data: IMyTask) => void,
    handleDelete: (id: number) => void
}

const TaskListTableRow = ({tableData, handleEdit, handleDelete}: IProps) => {
    return (
        <TableRow>
            <TableCell sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px' // Adjust based on your layout
            }}> {tableData?.title ?? ''} </TableCell>
            <TableCell sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px' // Adjust based on your layout
            }}>{tableData?.description ?? ''}</TableCell>
            <TableCell>{dayjs(tableData?.dueDate).format('DD MMM YYYY') ?? ''}</TableCell>
            <TableCell>
                {
                    (() => {
                        switch (tableData?.priority) {
                            case 'LOW' :
                                return <Chip label="Low" color="warning"/>
                            case 'MEDIUM' :
                                return <Chip label="Medium" color="primary"/>
                            case 'HIGH' :
                                return <Chip label="High" color="success"/>
                        }
                    })()
                }
            </TableCell>
            <TableCell>
                {
                    (() => {
                        switch (tableData?.status) {
                            case 'PENDING' :
                                return <Chip label="Pending" color="warning"/>
                            case 'PROGRESS' :
                                return <Chip label="Progress" color="primary"/>
                            case 'COMPLETED' :
                                return <Chip label="Completed" color="success"/>
                        }
                    })()
                }
            </TableCell>
            <TableCell>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <IconButton size={'small'} onClick={() => handleEdit(tableData)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton size={'small'} color={'error'} onClick={() => handleDelete(tableData?.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </Stack>
            </TableCell>
        </TableRow>
    )
}
export default memo(TaskListTableRow);