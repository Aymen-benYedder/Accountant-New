import { getColor } from "@app/_utilities/helpers";
import { JumboDdMenu } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Avatar, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { TeamMemberProps } from "../../data";

const TeamMemberItem = ({ item }: { item: TeamMemberProps }) => {
  return (
    <TableRow>
      <TableCell>
        <Div sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: "40px", height: "40px", borderRadius: 2, mr: 2 }}
          />
          <Div>
            <Typography
              variant="h5"
              mb={0.25}
            >{`${item?.firstName} ${item?.lastName}`}</Typography>
            <Typography variant="body1" color={"text.secondary"}>
              {item.email}
            </Typography>
          </Div>
        </Div>
      </TableCell>
      <TableCell>
        <Chip
          label={item?.access}
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

export { TeamMemberItem };
