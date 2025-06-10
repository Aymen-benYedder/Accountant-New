import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getAssetPath } from "@app/_utilities/helpers";
import { JumboCard } from "@jumbo/components";
import {
  CardActions,
  CardContent,
  ImageList,
  ImageListItem,
  Link,
} from "@mui/material";

interface Item {
  img: string;
  title?: string;
}

const itemData: Item[] = [
  {
    img: getAssetPath(
      "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      "180x180"
    ),
  },
  {
    img: getAssetPath(
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      "180x180"
    ),
  },
  {
    img: getAssetPath(
      "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      "180x180"
    ),
  },
  {
    img: getAssetPath(
      "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      "180x180"
    ),
  },
  {
    img: getAssetPath(
      "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      "180x180"
    ),
  },
  {
    img: getAssetPath(
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      "180x180"
    ),
  },
];

const Photos = () => {
  return (
    <JumboCard title={"Photos"}>
      <CardContent sx={{ py: 0 }}>
        <ImageList
          sx={{ width: "100%", m: 0, borderRadius: 2.5 }}
          cols={3}
          rowHeight={"auto"}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=120&h=120&fit=crop&auto=format`}
                srcSet={`${item.img}?w=120&h=120&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title || "Photo"}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </CardContent>
      <CardActions sx={{ py: 2.5 }}>
        <Link href="#" underline="none">
          Go to gallery <ArrowForwardIcon sx={{ verticalAlign: "middle" }} />
        </Link>
      </CardActions>
    </JumboCard>
  );
};

export { Photos };
