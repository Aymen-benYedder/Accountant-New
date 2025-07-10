import { JumboCard } from "@jumbo/components/JumboCard";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import Button from "@mui/material/Button";

const DialogThreeButton = () => {
  const Swal = useSwalWrapper();
  const sweetAlerts = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <JumboCard
      title={"A dialog with 3 buttons"}
      contentWrapper
      contentSx={{ backgroundColor: "background.paper", pt: 0 }}
    >
      <Button variant={"outlined"} onClick={sweetAlerts}>
        Click me
      </Button>
    </JumboCard>
  );
};

export { DialogThreeButton };
