import { CardActions, List } from "@mui/material";
import Button from "@mui/material/Button";

import { JumboCard } from "@jumbo/components";
import { JumboDdMenu } from "@jumbo/components/JumboDdMenu";
import { Product } from "./components";
import { menuItems, productsData } from "./data";
interface PopularProductsProps {
  title: React.ReactNode;
  subheader: React.ReactNode;
}
const PopularProducts = ({ title, subheader }: PopularProductsProps) => {
  return (
    <JumboCard
      title={title}
      subheader={subheader}
      action={<JumboDdMenu menuItems={menuItems} />}
    >
      <List
        disablePadding
        sx={{
          display: "flex",
          minWidth: 0,
          flexWrap: "wrap",
        }}
      >
        {productsData.map((item, key) => (
          <Product key={key} product={item} />
        ))}
      </List>
      <CardActions>
        <Button variant={"text"} sx={{ mb: 1 }}>
          View all
        </Button>
      </CardActions>
    </JumboCard>
  );
};

export { PopularProducts };
