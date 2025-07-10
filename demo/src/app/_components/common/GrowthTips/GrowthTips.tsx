import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { RiLeafLine, RiMailSendLine } from "react-icons/ri";

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  fontSize: 24,
  height: 48,
  width: 48,
  borderRadius: 12,
  minWidth: 42,
  marginRight: 16,
  padding: theme.spacing(1),
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.success.main,
  border: `solid 1px ${theme.palette.divider}`,
}));

interface GrowthProps {
  title: string;
  icon: any;
}
const growthDatas: GrowthProps[] = [
  {
    title:
      "Putting detail about your experience helps you present your profile stronger",
    icon: <RiLeafLine />,
  },
  {
    title:
      "Reach out to your friends to increase the possibility to be viewed by others.",
    icon: <RiMailSendLine />,
  },
];
const GrowthTips = () => {
  return (
    <List disablePadding>
      {growthDatas?.map((item, index) => (
        <ListItem disableGutters alignItems="flex-start" key={index}>
          <StyledListItemIcon>{item?.icon}</StyledListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" mt={0.5}>
                {item?.title}
              </Typography>
            }
          />
        </ListItem>
      ))}
      <Divider component={"li"} sx={{ my: 1 }} />
    </List>
  );
};

export { GrowthTips };
