import { JumboCard } from "@jumbo/components/JumboCard";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { SweetAlertIcon } from "sweetalert2";

const AlertsType = () => {
  const Swal = useSwalWrapper();
  const sweetAlerts = (variant: SweetAlertIcon) => {
    Swal.fire({
      icon: variant,
      title: variant,
      text: "You clicked the button!",
    });
  };
  return (
    <JumboCard
      title={"Alert Types"}
      contentWrapper
      contentSx={{ backgroundColor: "background.paper", pt: 0 }}
    >
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        sx={{ "& .MuiButton-root": { mb: 1, mr: 2 } }}
      >
        <Button
          color={"success"}
          variant={"outlined"}
          onClick={() => sweetAlerts("success")}
        >
          Success
        </Button>

        <Button
          color={"error"}
          variant={"outlined"}
          onClick={() => sweetAlerts("error")}
        >
          Error
        </Button>

        <Button
          color={"warning"}
          variant={"outlined"}
          onClick={() => sweetAlerts("warning")}
        >
          Warning
        </Button>

        <Button
          color={"info"}
          variant={"outlined"}
          onClick={() => sweetAlerts("info")}
        >
          Information
        </Button>

        <Button
          color={"error"}
          variant={"outlined"}
          onClick={() => sweetAlerts("question")}
        >
          Question
        </Button>
      </Stack>
    </JumboCard>
  );
};

export { AlertsType };
