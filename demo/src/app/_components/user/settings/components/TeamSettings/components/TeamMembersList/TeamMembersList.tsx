import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { teamMembers } from "../../data";
import { TeamMemberItem } from "./TeamMemberItem";

const TeamMembersList = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }}>
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
            <TableCell>Team Member</TableCell>
            <TableCell width={150}>Access</TableCell>
            <TableCell width={150}>Last Active</TableCell>
            <TableCell width={100}>Status</TableCell>
            <TableCell width={80} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamMembers.map((item, index) => (
            <TeamMemberItem item={item} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { TeamMembersList };
