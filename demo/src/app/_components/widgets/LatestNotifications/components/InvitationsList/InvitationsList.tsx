import { FeedInvitation } from "@app/_components/feedItems";
import List from "@mui/material/List";
import React from "react";
import { ListHeader } from "../ListHeader";
import { Link } from "@jumbo/shared";

type InvitationsListProps = {
  notifications: any[];
  count: number | string;
  noHeader?: boolean;
};

const InvitationsList = ({
  notifications,
  count,
  noHeader = false,
}: InvitationsListProps) => {
  return (
    <React.Fragment>
      {!noHeader && (
        <ListHeader
          title="INVITATIONS"
          count={count}
          action={<Link>SEE ALL</Link>}
        />
      )}
      <List disablePadding>
        {notifications.map((item) => {
          return <FeedInvitation key={`invitation-${item.id}`} feed={item} />;
        })}
      </List>
    </React.Fragment>
  );
};

export { InvitationsList };
