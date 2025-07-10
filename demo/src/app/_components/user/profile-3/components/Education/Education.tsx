import { JumboCard, JumboDdMenu } from "@jumbo/components";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { RiAddLine } from "react-icons/ri";
import { EducationProps, educationsData } from "../../data";

const Education = () => {
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
          Education
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
      //headerSx={{ pb: 0 }}
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
        {educationsData?.map((item: EducationProps, index: number) => (
          <ListItem
            disableGutters
            secondaryAction={<JumboDdMenu />}
            key={index}
            sx={{ py: 0.5 }}
          >
            <ListItemText
              primary={
                <Typography variant="h5" fontSize={15} mb={0.5}>
                  {item.title}
                </Typography>
              }
              secondary={item.description}
            />
          </ListItem>
        ))}
        <Divider component={"li"} sx={{ mt: 2 }} />
      </List>
    </JumboCard>
  );
};

export { Education };
