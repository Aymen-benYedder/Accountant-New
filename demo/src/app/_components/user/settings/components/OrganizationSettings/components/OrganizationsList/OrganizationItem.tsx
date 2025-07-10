import { Avatar, Chip, TableCell, TableRow, Typography } from "@mui/material";

import { getColor } from "@app/_utilities/helpers";
import { JumboDdMenu } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { OrganizationProps } from "../../data";

const OrganizationItem = ({ item }: { item: OrganizationProps }) => {
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
      <TableCell>
        <Div sx={{ display: "flex", minWidth: 0, alignItems: "center" }}>
          <Avatar
            alt="Remy Sharp"
            src={item?.image}
            sx={{ width: "40px", height: "40px", borderRadius: 2, mr: 2 }}
          />
          <Div>
            <Typography variant="h5" mb={0.5}>
              {item.organizationName}
            </Typography>
            <Typography variant="body1" color={"text.secondary"}>
              {item.desc}
            </Typography>
          </Div>
        </Div>
      </TableCell>
      <TableCell>
        <Chip
          label={item.access}
          size="small"
          sx={{ textTransform: "uppercase", fontWeight: 500, borderRadius: 1 }}
        />
      </TableCell>
      <TableCell>{item.lastActive}</TableCell>
      <TableCell>
        <Chip
          label={item?.status}
          color={getColor(item?.status)}
          size="small"
          sx={{ textTransform: "capitalize" }}
        />
      </TableCell>
      <TableCell>
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
export { OrganizationItem };
