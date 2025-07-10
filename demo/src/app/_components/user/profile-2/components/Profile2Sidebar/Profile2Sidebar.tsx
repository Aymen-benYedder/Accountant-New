import { GrowthTips } from "@app/_components/common";
import { JumboCard, JumboDdMenu } from "@jumbo/components";
import { List, Stack } from "@mui/material";
import { userConnectedData } from "../../data";
import { ConnectToUsers } from "../ConnectToUsers";

const Profile2Sidebar = () => {
  return (
    <Stack component={"div"}>
      <JumboCard
        title={"People you may know"}
        subheader={"For your company"}
        contentWrapper
        action={<JumboDdMenu />}
        contentSx={{ pt: 0 }}
        sx={{
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <List disablePadding>
          {userConnectedData.map((user, index) => (
            <ConnectToUsers user={user} key={index} />
          ))}
        </List>
      </JumboCard>
      <JumboCard
        title={"Growth Tips"}
        subheader={"Follow our experts"}
        contentWrapper
        contentSx={{ pt: 0 }}
        sx={{
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <GrowthTips />
      </JumboCard>
    </Stack>
  );
};

export { Profile2Sidebar };
