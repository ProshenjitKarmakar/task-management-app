import {IMyTask} from "../../../state/actions/taskManagement/task.interface";
import {Stack, TableCell, TableRow} from "@mui/material";
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
            <TableCell> {tableData?.title ?? ''} </TableCell>
            <TableCell>{tableData?.description ?? ''}</TableCell>
            <TableCell>{dayjs(tableData?.dueDate).format('DD MMM YYYY') ?? ''}</TableCell>
            <TableCell>{tableData?.priority ?? ''}</TableCell>
            <TableCell>{tableData?.status ?? ''}</TableCell>
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