import { JumboDdMenu } from "@jumbo/components";
import { TableCell, TableRow } from "@mui/material";
import { StatementProps } from "../../data";

const StatementItem = ({ item }: { item: StatementProps }) => {
  return (
    <TableRow
      sx={{
        "td:first-child": {
          pl: 3,
        },
        "td:last-child": {
          pr: 3,
        },
      }}
    >
      <TableCell>{item.invoiceNo}</TableCell>
      <TableCell>{item.amount}</TableCell>
      <TableCell>{item.transactionDate}</TableCell>
      <TableCell>{item.paymentMethod}</TableCell>
      <TableCell>{item.billingPeriod}</TableCell>
      <TableCell align="right">
        <JumboDdMenu
          menuItems={[
            { title: "View", slug: "view" },
            { title: "Edit", slug: "edit" },
            { title: "Delete", slug: "delete" },
          ]}
        />
      </TableCell>
    </TableRow>
  );
};

export { StatementItem };
