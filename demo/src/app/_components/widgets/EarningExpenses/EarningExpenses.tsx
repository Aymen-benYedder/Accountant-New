import { ButtonStack } from "@app/_components/_core";
import { Div } from "@jumbo/shared";
import { Button, Card, CardHeader, Typography } from "@mui/material";
import React from "react";
import { EarningExpensesChart } from "./components";

function EarningExpenses() {
  const [activeChart, setActiveChart] = React.useState<"earning" | "expense">(
    "earning"
  );
  return (
    <Card>
      <CardHeader
        avatar={
          <Div>
            <Typography variant={"h3"} fontWeight={"500"} mb={0.5}>
              $2,95,437
            </Typography>
            <Typography variant={"body1"} mb={2}>
              Earning
            </Typography>
          </Div>
        }
        title={
          <Div>
            <Typography variant={"h3"} fontWeight={"500"} mb={0.5}>
              $58,786
            </Typography>
            <Typography variant={"body1"} mb={2}>
              Expenses
            </Typography>
          </Div>
        }
        action={
          <ButtonStack>
            <Button
              variant={activeChart === "earning" ? "contained" : "outlined"}
              size={"small"}
              onClick={() => setActiveChart("earning")}
            >
              Earning
            </Button>
            <Button
              variant={activeChart === "expense" ? "contained" : "outlined"}
              disableElevation
              color={"secondary"}
              size={"small"}
              onClick={() => setActiveChart("expense")}
            >
              Expenses
            </Button>
          </ButtonStack>
        }
        sx={{ py: 3 }}
      />
      <EarningExpensesChart activeChart={activeChart} />
    </Card>
  );
}

export { EarningExpenses };
