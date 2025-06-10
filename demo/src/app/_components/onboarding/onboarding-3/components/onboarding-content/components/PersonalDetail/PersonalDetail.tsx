import { OnboardingAction } from "@app/_components/onboarding/common";
import { JumboCard } from "@jumbo/components";
import { Box, Typography } from "@mui/material";
import { OnboardingCarouselItem } from "../../../OnboardingCarouselItem";
const PersonalDetail = () => {
  return (
    <JumboCard
      subheader={
        <Typography variant="body1" fontSize={16}>
          Select tools you want to use
        </Typography>
      }
      contentWrapper
      sx={{
        display: "flex",
        minWidth: 0,
        flexDirection: "column",
        borderRadius: 5,
        boxShadow: "none",
        minHeight: "100%",
      }}
      contentSx={{
        display: "flex",
        minWidth: 0,
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Box display={"flex"} flexDirection={"column"} minWidth={0} flex={1}>
        <OnboardingCarouselItem />
      </Box>
      <OnboardingAction />
    </JumboCard>
  );
};
export { PersonalDetail };
