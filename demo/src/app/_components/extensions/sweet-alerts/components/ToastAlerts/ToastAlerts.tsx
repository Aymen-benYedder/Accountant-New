import { JumboCard } from "@jumbo/components/JumboCard";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { SweetAlertIcon } from "sweetalert2";

const ToastAlerts = () => {
  const Swal = useSwalWrapper();
  const theme = useTheme();
  const sweetAlerts = (variant: SweetAlertIcon) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: variant,
      title: "You clicked the button!",
      background: theme.palette.background.paper,
    });
  };
  return (
    <JumboCard
      title={"Toast alerts"}
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

export { ToastAlerts };
