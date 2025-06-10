import styled from '@emotion/styled';
import { JumboScrollbar } from '@jumbo/components';
import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
} from '@mui/material';
import { WeeklyProductType } from '../../data';
import { ProductSaleItem } from '../ProductSaleItem';

const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
  borderBottom: 'none',
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

type ProductSalesListProps = {
  products: WeeklyProductType[];
};

const ProductSalesList = ({ products }: ProductSalesListProps) => {
  const { theme } = useJumboTheme();
  return (
    <JumboScrollbar
      autoHeight={true}
      autoHeightMin={274}
      hideTracksWhenNotNeeded
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ pl: 3 }} theme={theme}>
              Product
            </StyledTableCell>
            <StyledTableCell align={'right'} theme={theme}>
              Sales
            </StyledTableCell>
            <StyledTableCell theme={theme} />
            <StyledTableCell theme={theme} sx={{ pr: 3 }} align={'right'}>
              Revenue
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <ProductSaleItem item={product} key={index} />
          ))}
        </TableBody>
      </Table>
    </JumboScrollbar>
  );
};

export { ProductSalesList };
