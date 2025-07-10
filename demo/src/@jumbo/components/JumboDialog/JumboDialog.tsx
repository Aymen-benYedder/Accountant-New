import React from "react";
import { useJumboDialog } from "./hooks/useJumboDialog";
import { DialogDefault } from "./components/DialogDefault";
import { DialogConfirm } from "./components/DialogConfirm";

const dialogVariants: { [key: string]: React.ComponentType<any> } = {
  default: DialogDefault,
  confirm: DialogConfirm,
};

const JumboDialog = () => {
  const { variant, showDialog, hideDialog, ...restDialogProps } =
    useJumboDialog();
  const DialogVariant = variant
    ? dialogVariants[variant]
    : dialogVariants.default;

  return <DialogVariant {...restDialogProps} />;
};

export { JumboDialog };
