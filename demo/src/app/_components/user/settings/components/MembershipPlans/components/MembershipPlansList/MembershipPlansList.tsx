import { JumboCard } from "@jumbo/components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { membersData } from "../../data";
import { MembershipPlanItem } from "./MembershipPlanItem";

const MembershipPlansList = () => {
  return (
    <JumboCard>
      <TableContainer>
        <Table sx={{ minWidth: 580 }}>
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
              <TableCell>Service</TableCell>
              <TableCell width={100} align="right">
                Cost
              </TableCell>
              <TableCell width={150} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {membersData.map((item, index) => (
              <MembershipPlanItem item={item} key={index} />
            ))}
            <TableRow
              sx={{
                "td:first-child": {
                  pl: 3,
                },
                "td:last-child": {
                  pl: 3,
                },
              }}
            >
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {"$68.43"}
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </JumboCard>
  );
};

export { MembershipPlansList };
