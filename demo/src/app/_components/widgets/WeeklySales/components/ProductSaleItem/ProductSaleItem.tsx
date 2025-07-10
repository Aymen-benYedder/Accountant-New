import styled from '@emotion/styled';
import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks';
import { Span } from '@jumbo/shared';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TableCell, TableRow, Theme } from '@mui/material';
import { WeeklyProductType } from '../../data';

const StyledTableRow = styled(TableRow)(({ theme }: { theme: Theme }) => ({
  '& .MuiTableCell-root': {
    borderBottom: 'none',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },

  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

type ProductSaleItemProps = {
  item: WeeklyProductType;
};

const ProductSaleItem = ({ item }: ProductSaleItemProps) => {
  const { theme } = useJumboTheme();
  return (
    <StyledTableRow key={item.name} theme={theme}>
      <TableCell sx={{ pl: (theme) => theme.spacing(3) }}>
        {item.name}
      </TableCell>
      <TableCell align='right'>{item.sales_data.sold_qty}</TableCell>
      <TableCell align='left'>
        <Span sx={{ whiteSpace: 'nowrap' }}>
          {item.sales_data.sales_inflation}%
          {item.sales_data.sales_inflation > 0 ? (
            <TrendingUpIcon
              sx={{ ml: 1, verticalAlign: 'middle' }}
              fontSize={'small'}
              color='success'
            />
          ) : (
            <TrendingDownIcon
              sx={{ ml: 1, verticalAlign: 'middle' }}
              fontSize={'small'}
              color='error'
            />
          )}
        </Span>
      </TableCell>
      <TableCell align='right' sx={{ pr: (theme) => theme.spacing(3) }}>
        ${item.sales_data.income}
      </TableCell>
    </StyledTableRow>
  );
};

export { ProductSaleItem };
