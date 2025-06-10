import React from "react";
import { List, Snackbar } from "@mui/material";
import { JumboScrollbar } from "@jumbo/components";
import { NewRequestItem } from "../NewRequestItem";
import { MenuItemsProps, RequestDataProps, reducer } from "../../data";

const init = (data: RequestDataProps[]) => {
  return [...data];
};
type NewRequestsListProps = {
  refresh: boolean;
  requests: RequestDataProps[];
  onRefreshCallback?: (opt: boolean) => void;
};
const NewRequestsList = ({
  refresh,
  requests,
  onRefreshCallback,
}: NewRequestsListProps) => {
  const [newRequests, dispatch] = React.useReducer(reducer, requests, init);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  React.useEffect(() => {
    if (refresh && typeof onRefreshCallback === "function") {
      dispatch({ type: "RELOAD", payload: requests });
      onRefreshCallback(false);
    }
  }, [refresh, onRefreshCallback, requests]);

  const onAction = (action: MenuItemsProps, item: RequestDataProps) => {
    dispatch({ type: action.value, payload: item });
    switch (action.value) {
      case "ACCEPTED":
        setToastMessage("Request accepted");
        break;
      case "DENIED":
        setToastMessage("Request denied");
        break;
      case "IGNORED":
        setToastMessage("Request ignored");
        break;
      default:
    }
    setShowToast(true);
  };

  return (
    <JumboScrollbar
      autoHeight
      autoHeightMin={304}
      autoHide
      autoHideDuration={200}
      autoHideTimeout={500}
    >
      <Snackbar
        onClose={() => setShowToast(false)}
        open={showToast}
        message={toastMessage}
        autoHideDuration={1000}
      />
      <List disablePadding>
        {newRequests.map((item:RequestDataProps, index:number) => (
          <NewRequestItem item={item} key={index} onAction={onAction} />
        ))}
      </List>
    </JumboScrollbar>
  );
};
/* Todo prop define */
export { NewRequestsList };
