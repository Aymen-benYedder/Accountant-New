import { JumboCard, JumboDdMenu } from "@jumbo/components";
import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { RiPencilLine } from "react-icons/ri";

const ProfileSkills = ({ data }: { data: any }) => {
  return (
    <Stack spacing={2} mb={1}>
      {data?.map((item: any, index: number) => (
        <JumboCard
          key={index}
          contentWrapper
          title={
            <Typography variant="h5" mb={0}>
              {item.title}
            </Typography>
          }
          subheader={`${item?.desc}, ${item.date}`}
          action={
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <IconButton
                size="small"
                color="primary"
                sx={{ flexShrink: 0, border: 1 }}
              >
                <RiPencilLine />
              </IconButton>
              <JumboDdMenu />
            </Stack>
          }
          contentSx={{ pt: 0 }}
          sx={{
            boxShadow: "none",
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="body2"
            mb={2}
            letterSpacing={2}
            textTransform={"uppercase"}
            fontSize={12}
          >
            Skills
          </Typography>
          {item?.skills?.map((skill: string, index: number) => (
            <Chip label={skill} key={index} sx={{ mr: 1, mb: 1 }} />
          ))}
        </JumboCard>
      ))}
    </Stack>
  );
};

export { ProfileSkills };
