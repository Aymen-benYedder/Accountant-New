import { FeaturedCard3 } from "@app/_components/cards/FeaturedCard3";
import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { JumboDdMenu } from "@jumbo/components/JumboDdMenu";
import { Avatar, Typography } from "@mui/material";

function UserProfileCard() {
  return (
    <FeaturedCard3
      action={
        <JumboDdMenu menuItems={[{ title: "Profile" }, { title: "Friends" }]} />
      }
      avatar={
        <Avatar
          sx={{ width: 90, height: 90, boxShadow: 2, m: "0 auto 20px" }}
          src={getAssetPath(`${ASSET_AVATARS}/avatar8.jpg`, "90x90")}
        />
      }
      title={"Gramy Sobbers"}
      subheader={"Graphic Designer"}
      headerSx={{ pt: 0 }}
    >
      <Typography variant="body1">
        Cenas in erat accusman, hendrerit vel, pulvinar adio. Quisque eu conva
        tend make
      </Typography>
    </FeaturedCard3>
  );
}

export { UserProfileCard };
