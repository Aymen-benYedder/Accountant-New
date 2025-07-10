import { JumboCard } from "@jumbo/components/JumboCard";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import Button from "@mui/material/Button";

const TitleWithText = () => {
  const Swal = useSwalWrapper();
  const sweetAlerts = () => {
    Swal.fire({
      title: "Good job!",
      text: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    });
  };
  return (
    <JumboCard
      title={"Title with text"}
      contentWrapper
      contentSx={{ backgroundColor: "background.paper", pt: 0 }}
    >
      <Button variant={"outlined"} onClick={sweetAlerts}>
        Click me
      </Button>
    </JumboCard>
  );
};

export { TitleWithText };
