import { GrowthTips } from "@app/_components/common";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Verified } from "@mui/icons-material";
import { Chip, Stack, Typography } from "@mui/material";
import { Education } from "../Education";
import { SocialAccountProfile } from "../SocialAccountProfile";

const Profile3Sidebar = () => {
  return (
    <Stack component={"div"}>
      <JumboCard
        title={
          <Typography
            variant="h5"
            color={"text.secondary"}
            textTransform={"uppercase"}
            letterSpacing={2}
            fontSize={12}
            mb={0.5}
          >
            Verification
          </Typography>
        }
        contentWrapper
        sx={{ boxShadow: "none", background: "transparent" }}
        contentSx={{ pt: 0 }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          borderBottom={1}
          borderColor={"divider"}
          pb={3}
        >
          <Div sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1" component={"span"}>
              ID Verified
            </Typography>
            <Verified
              color="primary"
              sx={{ fontSize: 18, color: "success.main" }}
            />
          </Div>
          <Chip size="small" label={"21 Oct 2023"} />
        </Stack>
      </JumboCard>
      <Education />
      <SocialAccountProfile />
      <JumboCard
        title={
          <Typography
            variant="h5"
            color={"text.secondary"}
            textTransform={"uppercase"}
            letterSpacing={2}
            fontSize={12}
            mb={0.5}
          >
            Growth Tips
          </Typography>
        }
        subheader={
          <Typography variant="body2" color={"text.secondary"} fontSize={12}>
            Follow our experts
          </Typography>
        }
        contentWrapper
        sx={{ boxShadow: "none", background: "transparent" }}
        contentSx={{ pt: 0 }}
      >
        <GrowthTips />
      </JumboCard>
    </Stack>
  );
};
export { Profile3Sidebar };
