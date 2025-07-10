import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

const FolderItem = ({ icon, name, selected, slug }: any) => {
  const navigate = useNavigate();
  const handleFolderItem = () => {
    navigate(`/apps/mail/${slug}`);
  };
  return (
    <MenuItem disableRipple sx={{ p: 0, mb: 2 }} selected={selected}>
      <Link underline={"none"} onClick={handleFolderItem}>
        {icon && <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>}
        <ListItemText>{name}</ListItemText>
      </Link>
    </MenuItem>
  );
};
export { FolderItem };
