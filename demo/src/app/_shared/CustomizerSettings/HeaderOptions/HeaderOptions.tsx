import { useJumboLayout } from "@jumbo/components/JumboLayout/hooks";
import { Div } from "@jumbo/shared";
import { FormControlLabel, Switch } from "@mui/material";
import { CustomizerCard } from "../CustomizerCard";

export const HeaderOptions = () => {
  const { headerOptions, setHeaderOptions } = useJumboLayout();

  const handleHeaderPosition = (event: any) => {
    setHeaderOptions({ fixed: event.target.checked });
  };

  return (
    <CustomizerCard title={"Header Options"}>
      <Div>
        <FormControlLabel
          control={
            <Switch
              checked={headerOptions.fixed}
              onChange={handleHeaderPosition}
              name="header-fixed"
            />
          }
          label="Header Fixed"
        />
      </Div>
    </CustomizerCard>
  );
};
