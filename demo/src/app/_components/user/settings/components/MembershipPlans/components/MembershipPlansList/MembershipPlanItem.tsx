import { JumboDdMenu } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { TableCell, TableRow, Typography } from "@mui/material";
import { MembershipPlanProps } from "../../data";
const MembershipPlanItem = ({ item }: { item: MembershipPlanProps }) => {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "td:first-child": {
          pl: 3,
        },
        "td:last-child": {
          pl: 3,
        },
      }}
    >
      <TableCell>
        <Div>
          <Typography variant="body1">{item.name}</Typography>
          <Typography variant="body2" color={"text.secondary"}>
            {item.content}
          </Typography>
        </Div>
      </TableCell>
      <TableCell align="right">{item.cost}</TableCell>

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
export { MembershipPlanItem };
