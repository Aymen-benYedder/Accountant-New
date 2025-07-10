import { getColor } from "@app/_utilities/helpers";
import { JumboDdMenu } from "@jumbo/components";
import { Chip, Stack, TableCell, TableRow } from "@mui/material";
const InvoiceItem = ({ item }: any) => {
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
      <TableCell>{item.invoice_no}</TableCell>
      <TableCell>{item.amount}</TableCell>
      <TableCell>{item.billing_date}</TableCell>
      <TableCell>{item.due_date}</TableCell>
      <TableCell>
        <Chip
          label={item?.status}
          color={getColor(item?.status)}
          size="small"
          sx={{ textTransform: "capitalize" }}
        />
      </TableCell>
      <TableCell>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Chip
            label={item?.other}
            size="small"
            // {...getProps(item?.other)}
            sx={{ textTransform: "capitalize" }}
          />
          <JumboDdMenu
            menuItems={[
              { title: "View", slug: "view" },
              { title: "Edit", slug: "edit" },
              { title: "Delete", slug: "delete" },
            ]}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export { InvoiceItem };
