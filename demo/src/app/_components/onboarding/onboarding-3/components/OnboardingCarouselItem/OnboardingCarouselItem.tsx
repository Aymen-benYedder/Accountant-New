import { Div } from "@jumbo/shared/components/Div";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Theme,
  darken,
} from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import styled from "@mui/material/styles/styled";
import React, { CSSProperties } from "react";
import {
  RiArrowLeftCircleLine,
  RiArrowRightCircleLine,
  RiCheckboxCircleFill,
  RiImageEditLine,
} from "react-icons/ri";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { onboardingData } from "../../data";

const OnboardingCarouselItem = () => {
  const theme = useTheme();
  const [activeTool, setActiveTool] = React.useState<number>();
  const onboardingArray = (arr: any, itemSize: any) => {
    // if (md) itemSize += 1;
    // if (lg) itemSize += 1;
    const filteredPostArray = [];
    for (let i = 0; i < arr.length; i += itemSize) {
      filteredPostArray.push(arr.slice(i, i + itemSize));
    }
    return filteredPostArray;
  };
  const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));
  const isAboveXl = useMediaQuery("(min-width: 1420px)");
  const onboardingItems = onboardingArray(
    onboardingData,
    isAboveXl ? 3 : isAboveMd ? 2 : 1
  );
  const arrowStyles: CSSProperties = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 16px)",
    width: 32,
    height: 32,
    cursor: "pointer",
    padding: 0,
  };

  const StyledCarousel = styled(Carousel)(({ theme }) => ({
    "& .carousel-slider": {
      paddingInline: theme.spacing(5),
    },
    marginBottom: 24,
  }));

  return (
    <StyledCarousel
      showThumbs={false}
      showArrows={true}
      showStatus={false}
      infiniteLoop={true}
      showIndicators={false}
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && (
          <IconButton
            disableRipple
            onClick={onClickHandler}
            sx={{
              ...arrowStyles,
              right: 0,
              "&:hover": { color: deepOrange["800"] },
            }}
          >
            <RiArrowRightCircleLine fontSize={32} />
          </IconButton>
        )
      }
      renderArrowPrev={(onClickHandler, hasNext) =>
        hasNext && (
          <IconButton
            disableRipple
            onClick={onClickHandler}
            sx={{
              ...arrowStyles,
              left: 0,
              "&:hover": { color: deepOrange["800"] },
            }}
          >
            <RiArrowLeftCircleLine fontSize={32} />
          </IconButton>
        )
      }
    >
      {onboardingItems.map((onboardings, index) => (
        <Div sx={{ display: "flex", minWidth: 0, gap: 3 }} key={index}>
          {onboardings?.map((item: any, index: number) => (
            <Div key={index}>
              <Card
                sx={{
                  textAlign: "left",
                  height: "100%",
                  boxShadow: "none",
                  border: 1,
                  borderColor: "divider",
                  "&.MuiPaper-selected": {
                    background: (theme: Theme) =>
                      darken(theme.palette.primary.main, 0.5),
                    borderColor: (theme: Theme) =>
                      darken(theme.palette.primary.main, 0.5),
                    color: "common.white",
                  },
                }}
                key={index}
                className={activeTool === item?.id ? "MuiPaper-selected" : ""}
              >
                <CardContent>
                  <Div
                    sx={{
                      mb: 2,
                      color:
                        activeTool === item?.id ? "inherit" : deepOrange["300"],
                    }}
                  >
                    <RiImageEditLine fontSize={32} />
                  </Div>
                  <Typography
                    variant="h5"
                    mb={2}
                    lineHeight={1.5}
                    sx={{
                      color: activeTool === item?.id ? "inherit" : "",
                    }}
                  >
                    Pictures Hosting Service And Space
                  </Typography>
                  <Typography
                    variant="body1"
                    mb={2}
                    sx={{
                      color: activeTool === item?.id ? grey["400"] : "",
                    }}
                  >
                    Host your pictures over the cloud and access them from
                    anywhere. It starts with FREE!
                  </Typography>
                  <IconButton
                    onClick={() => setActiveTool(item?.id)}
                    sx={{
                      padding: 0,
                      color: (theme) =>
                        activeTool === item?.id
                          ? `${theme.palette.success.main}`
                          : grey["300"],
                    }}
                  >
                    <RiCheckboxCircleFill fontSize={30} />
                  </IconButton>
                </CardContent>
              </Card>
            </Div>
          ))}
        </Div>
      ))}
    </StyledCarousel>
  );
};

export { OnboardingCarouselItem };
