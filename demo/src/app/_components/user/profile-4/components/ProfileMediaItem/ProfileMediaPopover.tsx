import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div } from "@jumbo/shared";
import { Avatar, Box, TextField, Typography } from "@mui/material";

import { ProfileMediaProps } from "../../data";
import { SocialMediaDetail } from "./SocialMediaDetail";

const ProfileMediaPopover = ({ profile }: { profile: ProfileMediaProps }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <img
        src={profile?.mediaImage}
        alt={profile?.title}
        style={{ marginBottom: 10, width: "400px", height: "300px" }}
      />
      <SocialMediaDetail profile={profile} sx={{ mb: 3 }} />

      <Div sx={{ display: "flex" }}>
        <Avatar
          sx={{ mr: 2 }}
          alt="Remy Sharp"
          src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "40x40")}
        />
        <Div>
          <Typography variant={"h6"} mb={0.25}>
            Kenery Thomson
          </Typography>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            fontSize={"12px"}
            mb={2}
          >
            09 Nov, 2024
          </Typography>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            fontSize={"12px"}
            mb={2}
          >
            Wow! Excellent, these images are so beautiful.
          </Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", minWidth: 0 }}>
        <Avatar
          sx={{ mr: 2 }}
          alt="Brian Walsh"
          src={getAssetPath(`${ASSET_AVATARS}/avatar9.jpg`, "40x40")}
        />
        <Div sx={{ flex: 1 }}>
          <TextField
            id="comment"
            multiline
            fullWidth
            rows={2}
            variant={"outlined"}
            sx={{
              "& .MuiOutlinedInput-root": {
                py: 1,
                "& > fieldset": {
                  borderRadius: 0,
                },
              },
            }}
          />
        </Div>
      </Div>
    </Box>
  );
};

export { ProfileMediaPopover };
