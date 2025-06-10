import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { statementsData } from "../../data";
import { StatementItem } from "./StatementItem";

const StatementsList = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 850 }}>
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
            <TableCell width={150}>Invoice No</TableCell>
            <TableCell width={150}>Amount (USD)</TableCell>
            <TableCell width={190}>Transaction Date</TableCell>
            <TableCell width={180}>Payment Method</TableCell>
            <TableCell width={160}>Billing Period</TableCell>
            <TableCell width={100} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statementsData.map((item, index) => (
            <StatementItem item={item} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { StatementsList };
