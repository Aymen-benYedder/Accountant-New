import { AppPagination1, SearchPopover } from "@app/_components/common";
import {
  InvoiceCard,
  InvoiceFilter,
  invoicesData,
  InvoicesList,
} from "@app/_components/invoices";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { JumboCard } from "@jumbo/components";
import { Div, Span } from "@jumbo/shared";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { RiImageEditLine } from "react-icons/ri";

const InvoicePage1 = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Div sx={{ flex: 1, mr: 2 }}>
          <Typography variant="h2">Invoices</Typography>
          <Typography color={"text.secondary"} variant="body1" mb={2}>
            Add multiple payment methods you have
          </Typography>
        </Div>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            borderRadius: 5,
            fontSize: 15,
            textTransform: "none",
            letterSpacing: 0,
          }}
          disableElevation
        >
          Create Invoice
        </Button>
      </Stack>
      <Grid container spacing={4} mb={4}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <InvoiceCard
                title="$63,250.00"
                description="Total Revenue"
                icon={<RiImageEditLine fontSize={32} />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <InvoiceCard
                title="$57,356.00"
                description="Total Received"
                icon={<RiImageEditLine fontSize={32} />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <InvoiceCard
                title="$6,854.00"
                description="Total Due"
                icon={<RiImageEditLine fontSize={32} />}
              />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 6, lg: 4 }}
              sx={{ display: { lg: "none" } }}
            >
              <InvoiceCard
                title={
                  <Typography variant="h4" fontWeight={500} pt={0.75}>
                    5 Upcoming Invoices
                  </Typography>
                }
                description="This week"
                icon={<RiImageEditLine fontSize={32} />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={4} sx={{ display: { xs: "none", lg: "block" } }}>
          <InvoiceCard
            title={
              <Typography variant="h4" fontWeight={500} pt={0.75}>
                5 Upcoming Invoices
              </Typography>
            }
            description="This week"
            icon={<RiImageEditLine fontSize={32} />}
          />
        </Grid>
      </Grid>
      <JumboCard
        title={<SearchPopover placeholder={"Enter invoice number"} />}
        action={<InvoiceFilter />}
        contentWrapper
        sx={{ mb: 3 }}
        contentSx={{ pt: 0 }}
      >
        <InvoicesList />
      </JumboCard>
      <Stack direction={"row"} justifyContent={"space-between"} sx={{ mx: 2 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Showing <Span sx={{ color: "text.primary" }}>1</Span> of{" "}
          <Span sx={{ color: "text.primary" }}>{invoicesData?.length}</Span>
        </Typography>
        <AppPagination1 data={invoicesData} />
      </Stack>
    </Container>
  );
};
export default InvoicePage1;
