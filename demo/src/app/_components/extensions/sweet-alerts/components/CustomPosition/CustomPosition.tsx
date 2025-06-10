import { JumboCard } from "@jumbo/components/JumboCard";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import Button from "@mui/material/Button";

const CustomPosition = () => {
  const Swal = useSwalWrapper();
  const sweetAlerts = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      timer: 1500,
    });
  };
  return (
    <JumboCard
      title={"Custom Position"}
      contentWrapper
      contentSx={{ backgroundColor: "background.paper", pt: 0 }}
    >
      <Button variant={"outlined"} onClick={sweetAlerts}>
        Click me
      </Button>
    </JumboCard>
  );
};

export { CustomPosition };
