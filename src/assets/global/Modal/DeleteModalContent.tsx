import React from 'react';
import Box from "@mui/material/Box";
import {Button, Stack, Typography} from "@mui/material";
import trashIcon from "../../svg/trashIcon.svg";

interface IProps {
    handleModalClose: () => void,
    onSingleDelete: () => void
}

const DeleteModalContent = ({handleModalClose, onSingleDelete}: IProps) => {
    return (
        <>
            <Box p={'64px 40px 48px 40px'} textAlign={'center'}>
                <img src={trashIcon} alt="" width={120} height={150}/>

                <Typography variant="h5" mt={3} mb={1}>
                    Are you sure you want to <br/> delete{' '}
                    this item?
                </Typography>
                <Typography variant="body2" color={'text.secondary'}>
                    Once deleted, you can't be restore it.
                </Typography>
            </Box>

            <Stack
                p={'16px'}
                sx={{borderTop: 1, borderColor: 'other.divider'}}
                direction={'row'}
                justifyContent={'flex-end'}
                spacing={1}
            >
                <Button sx={{color: 'text.primary'}} variant="text" onClick={handleModalClose}>
                    Cancel
                </Button>
                <Button color={'error'} variant={'contained'} onClick={onSingleDelete}>
                    Delete
                </Button>
            </Stack>
        </>
    );
}
export default DeleteModalContent;
