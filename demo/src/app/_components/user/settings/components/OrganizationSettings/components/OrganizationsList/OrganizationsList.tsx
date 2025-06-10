import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { JumboCard } from "@jumbo/components";
import { organinzationsData } from "../../data";
import { OrganizationItem } from "./OrganizationItem";
const OrganizationsList = () => {
  return (
    <JumboCard>
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
              <TableCell>Organization</TableCell>
              <TableCell width={120}>Access</TableCell>
              <TableCell width={120}>Last Active</TableCell>
              <TableCell width={100}>Status</TableCell>
              <TableCell width={90}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organinzationsData.map((item, index) => (
              <OrganizationItem item={item} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </JumboCard>
  );
};
export { OrganizationsList };
