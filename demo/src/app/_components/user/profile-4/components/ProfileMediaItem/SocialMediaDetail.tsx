import { Span } from "@jumbo/shared";
import { Stack, Typography } from "@mui/material";
import { RiChat1Line, RiEyeFill, RiHeart2Fill } from "react-icons/ri";
import { ProfileMediaProps } from "../../data";

const SocialMediaDetail = ({
  profile,
  sx,
}: {
  profile: ProfileMediaProps;
  sx?: any;
}) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ px: 1, ...sx }}
    >
      <Typography variant="h5" mb={0}>
        {profile.title}
      </Typography>
      <Stack direction={"row"} spacing={2}>
        <Span
          sx={{
            display: "flex",
            minWidth: 0,
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
        >
          <RiChat1Line fontSize={18} />
          {profile.comments}
        </Span>
        <Span
          sx={{
            display: "flex",
            minWidth: 0,
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Span
            sx={{
              display: "inline-flex",
              minWidth: 0,
              color: "primary.main",
              cursor: "pointer",
            }}
          >
            <RiHeart2Fill fontSize={18} />
          </Span>
          {profile.likes}
        </Span>
        <Span
          sx={{
            display: "flex",
            minWidth: 0,
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Span
            sx={{
              display: "inline-flex",
              minWidth: 0,
              color: "primary.main",
              cursor: "pointer",
            }}
          >
            <RiEyeFill fontSize={18} />
          </Span>
          {profile.views}
        </Span>
      </Stack>
    </Stack>
  );
};

export { SocialMediaDetail };
