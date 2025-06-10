import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { LabelForm } from "../LabelForm";
import { JumboDdMenu } from "@jumbo/components";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { MenuItemProps } from "@jumbo/types";
import { LabelProps } from "@app/_components/apps/_types";

const labelMenuItems = [
  { icon: <EditIcon />, title: "Edit", action: "edit" },
  { icon: <DeleteIcon />, title: "Delete", action: "delete" },
];

const LabelItem = ({ label }: { label: LabelProps }) => {
  const navigate = useNavigate();
  const { showDialog, hideDialog } = useJumboDialog();
  const Swal = useSwalWrapper();
  const handleMoreAction = React.useCallback(
    (menuItem: MenuItemProps) => {
      switch (menuItem?.action) {
        case "edit":
          showDialog({
            title: "Edit label",
            content: <LabelForm label={label} />,
          });
          break;
        case "delete":
          showDialog({
            variant: "confirm",
            title: "Are you sure?",
            content: "Once you delete a label that cannot be reversed.",
            onYes: () => {
              hideDialog();
              return Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Label is deleted successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
            },
            onNo: () => hideDialog(),
          });
      }
    },
    [label, showDialog]
  );

  return (
    <MenuItem component={"div"} disableRipple sx={{ p: 0, my: 0 }}>
      <ListItemIcon
        sx={{ color: label.color }}
        onClick={() => navigate(`/apps/mail/label/${label.id}`)}
      >
        <LabelIcon fontSize={"small"} />
      </ListItemIcon>
      <ListItemText onClick={() => navigate(`/apps/mail/label/${label.id}`)}>
        {label.name}
      </ListItemText>
      <JumboDdMenu
        icon={<MoreHorizIcon />}
        menuItems={labelMenuItems}
        onClickCallback={handleMoreAction}
      />
    </MenuItem>
  );
};
export { LabelItem };
