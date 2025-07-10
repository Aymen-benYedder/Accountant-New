import { IconButton, OutlinedInput, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import { Div, Link } from "@jumbo/shared";
import { getAssetPath } from "@app/_utilities/helpers";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
const NotFoundErrorPage = () => {
  return (
    <Div
      sx={{
        flex: 1,
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: (theme) => theme.spacing(4),
      }}
    >
      <Div sx={{ display: "inline-flex", mb: 3 }}>
        <img
          src={getAssetPath(
            `${ASSET_IMAGES}/apps/undraw_page_not_found.svg`,
            "380x206"
          )}
          alt="404"
          width={380}
        />
      </Div>
      <Typography
        align={"center"}
        component={"h2"}
        variant={"h1"}
        color={"text.secondary"}
        mb={3}
      >
        Oops, an error has occurred. Page not found!
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ maxWidth: 360, mb: 2 }}>
        <OutlinedInput
          id="outlined-search"
          type="search"
          placeholder="Search..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Search" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          sx={{ bgcolor: (theme) => theme.palette.background.paper }}
        />
      </FormControl>
      <Link to="/">
        <Button variant="contained">Go to home</Button>
      </Link>
    </Div>
  );
};
export default NotFoundErrorPage;
