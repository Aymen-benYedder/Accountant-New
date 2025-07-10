import { JumboCard, JumboDdMenu } from "@jumbo/components";
import {
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { RiAddLine } from "react-icons/ri";
import { socialsData } from "../../data";

const SocialAccountProfile = () => {
  return (
    <JumboCard
      title={
        <Typography
          variant="h5"
          color={"text.secondary"}
          textTransform={"uppercase"}
          letterSpacing={2}
          fontSize={12}
          mb={0.5}
        >
          Linked Accounts
        </Typography>
      }
      action={
        <IconButton color={"primary"} size="small">
          <RiAddLine />
        </IconButton>
      }
      contentWrapper
      sx={{
        boxShadow: "none",
        background: "transparent",
        ".MuiCardHeader-action": {
          my: -0.5,
        },
      }}
      contentSx={{ pt: 0 }}
    >
      <List
        disablePadding
        sx={{
          ".MuiListItemSecondaryAction-root": {
            transform: "translateY(0)",
            top: 5,
          },
        }}
      >
        {socialsData?.map((item, index) => (
          <ListItem
            disableGutters
            secondaryAction={<JumboDdMenu />}
            key={index}
            sx={{ py: 0.75 }}
          >
            <ListItemText
              primary={
                <Typography
                  component={"div"}
                  display={"flex"}
                  alignItems={"center"}
                  variant="h5"
                  gap={1}
                  mb={0.5}
                >
                  {item?.icon}
                  {item.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    variant="body1"
                    mb={1}
                    component={"span"}
                    display={"block"}
                  >{`${item.followers} followers`}</Typography>
                  <Link href={"/"} underline="none">
                    View Profile
                  </Link>
                </>
              }
            />
          </ListItem>
        ))}
        <Divider component={"li"} sx={{ mt: 2 }} />
      </List>
    </JumboCard>
  );
};

export { SocialAccountProfile };
