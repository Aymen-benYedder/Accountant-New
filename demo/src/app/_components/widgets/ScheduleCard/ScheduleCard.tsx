import { FeaturedCard3 } from "@app/_components/cards";
import { JumboDdMenu } from "@jumbo/components/JumboDdMenu";
import Avatar from "@mui/material/Avatar";
import { ScheduleList } from "./components";

function ScheduleCard() {
  return (
    <FeaturedCard3
      bgcolor={["#843CF6", "#38B8F2"]}
      textColor="common.white"
      action={
        <JumboDdMenu
          menuItems={[{ title: "Setup a call" }, { title: "Schedule a task" }]}
        />
      }
      avatar={
        <Avatar
          sx={{
            bgcolor: "common.white",
            height: 90,
            width: 90,
            fontSize: 28,
            color: "#475259",
            boxShadow: 2,
            margin: "0 auto 16px",
          }}
        >
          28
        </Avatar>
      }
      title="Monday"
      subheader="December 2023"
      headerSx={{ pt: 0, mt: -0.5 }}
      contentSx={{
        textAlign: "left",
        bgcolor: (theme) => theme.palette.background.paper,
      }}
    >
      <ScheduleList />
    </FeaturedCard3>
  );
}

export { ScheduleCard };
