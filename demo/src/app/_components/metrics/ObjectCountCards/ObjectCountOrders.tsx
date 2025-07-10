import { CardIconText } from "@jumbo/shared/components/CardIconText";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Typography } from "@mui/material";

interface ObjectCountOrdersProps {
  vertical?: boolean;
  subTitle: React.ReactNode;
}
const ObjectCountOrders = ({ subTitle }: ObjectCountOrdersProps) => {
  return (
    <CardIconText
      icon={<ShoppingCartRoundedIcon fontSize="large" />}
      title={
        <Typography variant={"h4"} color={"primary.main"}>
          2,380
        </Typography>
      }
      subTitle={
        <Typography variant={"h6"} color={"text.secondary"}>
          {subTitle}
        </Typography>
      }
      color={"primary.main"}
      disableHoverEffect={true}
      hideArrow={true}
      variant={"outlined"}
    />
  );
};
export { ObjectCountOrders };
