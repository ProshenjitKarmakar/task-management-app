import { styled } from '@mui/material';
import MuiTable, { TableProps } from '@mui/material/Table';

interface Props extends TableProps {
    variant: 'bordered' | 'normal';
}

const Table: React.FC<Props> = styled(MuiTable)<Props>(({ variant }) => {
    if (variant === 'bordered') {
        return {
            '& .MuiTableCell-root': {
                border: `1px solid #1D29391A`,
            },
        };
    }
    return {};
});

export default Table;
