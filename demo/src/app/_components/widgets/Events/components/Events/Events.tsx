import { List } from "@mui/material";
import { JumboCard } from "@jumbo/components";
import { events } from "../../data";
import { EventItem } from "../EventItem";

const Events = () => {
  return (
    <JumboCard
      title={"Events"}
      subheader={"What Kiley is up to"}
      headerSx={{
        borderBottom: 1,
        borderBottomColor: "divider",
      }}
      contentWrapper
      contentSx={{ p: 0 }}
    >
      <List disablePadding>
        {events?.map((event, index) => <EventItem event={event} key={index} />)}
      </List>
    </JumboCard>
  );
};

export { Events };
