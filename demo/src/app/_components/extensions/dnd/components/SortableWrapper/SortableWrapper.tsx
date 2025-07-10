import { useState } from "react";

import { JumboDdMenu } from "@jumbo/components";
import { Avatar, TableCell, Typography } from "@mui/material";
import { contactsList, menuItems } from "../../data";
import { SortableList } from "../SortableList";

export default function SortableWrapper() {
  const [items, setItems] = useState(contactsList);

  return (
    <SortableList
      items={items}
      onChange={setItems}
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <TableCell width={"3%"} sx={{ pl: 3 }}>
            <SortableList.DragHandle />
          </TableCell>
          <TableCell width={"3%"}>
            {item.thumb === null || item.thumb === "" ? (
              <Avatar sx={{ height: 44, width: 44 }}>
                {item.name.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                sx={{ height: 44, width: 44 }}
                alt={item.name}
                src={item.thumb}
              />
            )}
          </TableCell>
          <TableCell width={"15%"}>
            <Typography variant={"h6"} mb={0}>
              {item.name}
            </Typography>
          </TableCell>
          <TableCell width={"20%"}>
            <Typography variant={"h6"} mb={0}>
              {item.email}
            </Typography>
          </TableCell>
          <TableCell width={"15%"}>
            <Typography variant={"h6"} mb={0}>
              {item.phone}
            </Typography>
          </TableCell>
          <TableCell width={"15%"}>
            <Typography variant={"h6"} mb={0}>
              {item.designation}
            </Typography>
          </TableCell>
          <TableCell width={"4%"}>
            <JumboDdMenu menuItems={menuItems} />
          </TableCell>
        </SortableList.Item>
      )}
    />
  );
}
