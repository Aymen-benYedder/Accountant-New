import { JumboCard } from "@jumbo/components/JumboCard";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import Button from "@mui/material/Button";

const CustomHtmlMessage = () => {
  const Swal = useSwalWrapper();
  const sweetAlerts = () => {
    Swal.fire({
      title: "<strong>HTML <u>example</u></strong>",
      icon: "info",
      html: 'You can use <b>bold text</b>, <a href="//sweetalert2.github.io">links</a> and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Great!",
      confirmButtonAriaLabel: "great!",
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "cancel",
    });
  };
  return (
    <JumboCard
      title={"Custom HTML Message"}
      contentWrapper
      contentSx={{ backgroundColor: "background.paper", pt: 0 }}
    >
      <Button variant={"outlined"} onClick={sweetAlerts}>
        Click me
      </Button>
    </JumboCard>
  );
};

export { CustomHtmlMessage };
