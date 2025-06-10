import { invoicesData } from "@app/_components/invoices/invoice-1/data";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { InvoiceItem } from "./InvoiceItem";

const InvoicesList = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 760 }}>
        <TableHead>
          <TableRow
            sx={{
              "th:first-child": {
                pl: 3,
              },
              "th:last-child": {
                pr: 3,
              },
            }}
          >
            <TableCell width={200}>Invoice No</TableCell>
            <TableCell width={200}>Amount</TableCell>
            <TableCell width={200}>Billing Date</TableCell>
            <TableCell width={200}>Due Date</TableCell>
            <TableCell width={120}>Status</TableCell>
            <TableCell width={140}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoicesData.map((item, index) => (
            <InvoiceItem item={item} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { InvoicesList };
