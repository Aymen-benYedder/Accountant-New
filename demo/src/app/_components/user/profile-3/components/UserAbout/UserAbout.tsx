import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Div, Span } from "@jumbo/shared";
import { IconButton, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { RiPencilLine, RiPlayCircleFill } from "react-icons/ri";

const UserAbout = () => {
  const { theme } = useJumboTheme();
  return (
    <Div
      sx={{
        display: "flex",
        minWidth: 0,
        mb: 4,
        gap: 3,
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      }}
    >
      <Div>
        <Typography mb={2} variant="h3">
          About Charis Handy
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur. Venenatis neque massa amet
          quis platea mi malesuada. . Magna tellus diam sagittis rhoncus enim
          amet amet. Id nulla mi lectus morbi tincidunt. Posuere et id purus
          dictum et mauris massa vitae. Id ornare amet posuere in tempus donec
          odio purus.
        </Typography>
        <Link href="#" underline="none">
          more
        </Link>
        <br />
        <IconButton size="small" sx={{ border: 1, mt: 2 }} color="primary">
          <RiPencilLine />
        </IconButton>
      </Div>
      <Div
        sx={{
          width: 310,
          flexShrink: 0,
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* <video width="320" height="240" controls>
          <source src="movie.mp4" type="video/mp4" />
        </video> */}
        <img
          src={`${ASSET_IMAGES}/profiles/video-placeholder.png`}
          alt=""
          style={{ verticalAlign: "middle" }}
        />
        <Span
          sx={{
            position: "absolute",
            zIndex: 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "common.white",
            cursor: "pointer",
            height: 36,
            width: 36,
          }}
        >
          <RiPlayCircleFill fontSize={36} />
        </Span>
        <Span sx={{ position: "absolute", zIndex: 1, top: 8, right: 8 }}>
          <IconButton
            aria-label="Edit"
            size="small"
            color="primary"
            sx={{
              border: 1,
              bgcolor: (theme) => theme.palette.background.paper,
              "&:hover": {
                bgcolor: (theme) => theme.palette.background.paper,
              },
            }}
          >
            <RiPencilLine fontSize="inherit" />
          </IconButton>
        </Span>
      </Div>
    </Div>
  );
};

export { UserAbout };
