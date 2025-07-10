import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { products } from "./data";
export function GoogleNest({ title }: { title: React.ReactNode }) {
  const [currentSlide, setCurrentSlide] = React.useState<{
    currentSlide: number;
  }>({ currentSlide: 0 });

  const updateCurrentSlide = (index: number) => {
    if (currentSlide.currentSlide !== index) {
      setCurrentSlide({ currentSlide: index });
    }
  };

  return (
    <JumboCard sx={{ textAlign: "center" }} contentWrapper>
      <Typography variant={"h3"}>{title}</Typography>
      <Typography variant={"body1"} mb={2}>
        Get a powerful speaker and voice assistant. Some description about the
        card.
      </Typography>
      <Div sx={{ maxWidth: 280, mx: "auto" }}>
        <Carousel
          showArrows={false}
          showStatus={false}
          onChange={updateCurrentSlide}
          selectedItem={currentSlide.currentSlide}
          showThumbs={false}
          verticalSwipe={"natural"}
        >
          {products.map((item, index) => (
            <img
              src={item}
              alt={""}
              width={280}
              height={230}
              key={index}
              style={{ borderRadius: 12 }}
            />
          ))}
        </Carousel>
      </Div>
      <Div sx={{ mt: 4 }}>
        <Typography variant={"h5"} mb={2}>
          $2699.00
        </Typography>
        <Button startIcon={<ShoppingCartOutlined />} variant={"contained"}>
          Buy Now
        </Button>
      </Div>
    </JumboCard>
  );
}
