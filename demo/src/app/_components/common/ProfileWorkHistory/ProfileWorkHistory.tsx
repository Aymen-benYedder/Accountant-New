import { JumboDdMenu } from "@jumbo/components";
import { Div, Link, Span } from "@jumbo/shared";
import {
  Avatar,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { RiPencilLine } from "react-icons/ri";
import { ExperienceProps } from "../data";

const ProfileWorkHistory = ({
  data,
  action = false,
}: {
  data: ExperienceProps[];
  action?: boolean;
}) => {
  return (
    <>
      <List
        sx={{
          pt: 0,
          ".MuiListItemSecondaryAction-root": {
            top: 5,
            transform: "translateY(0)",
          },
          ".MuiListItem-root": action
            ? {
                pr: 14,
              }
            : {},
        }}
      >
        {data?.map((item, index) => (
          <ListItem
            key={index}
            sx={{ paddingLeft: 0 }}
            secondaryAction={
              action && (
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <IconButton
                    size="small"
                    color="primary"
                    sx={{ border: 1, flexShrink: 0 }}
                  >
                    <RiPencilLine />
                  </IconButton>
                  <JumboDdMenu />
                </Stack>
              )
            }
            alignItems="flex-start"
          >
            <ListItemAvatar sx={{ minWidth: 88 }}>
              <Avatar
                src={item.companyLogo}
                sx={{
                  width: 72,
                  height: 72,
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 4,
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h5" mt={0.5} mb={0.5}>
                  {item.role}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    component={"span"}
                    sx={{ color: "text.secondary" }}
                  >
                    <Typography
                      variant="body2"
                      component={"span"}
                      display={"block"}
                    >
                      {item.company}
                    </Typography>
                    <Span>{item.location}</Span>
                  </Typography>
                  <Chip
                    component={"span"}
                    size="small"
                    label={item.period}
                    sx={{
                      borderRadius: 1,
                      mt: 1,
                      display: { xs: "inline-flex", sm: "none" },
                    }}
                  />
                </>
              }
              sx={{ width: { sm: "45%" }, flex: { sm: "initial" } }}
            />
            <Div
              sx={{
                display: { xs: "none", sm: "block" },
                mt: 1,
                flex: 1,
                textAlign: !action ? "right" : "",
              }}
            >
              <Chip size="small" label={item.period} sx={{ borderRadius: 1 }} />
            </Div>
          </ListItem>
        ))}
      </List>

      <Div sx={{ textAlign: "center" }}>
        <Link href="#/all-experiences" underline="none">
          Show All Experiences
        </Link>
      </Div>
    </>
  );
};

export { ProfileWorkHistory };
