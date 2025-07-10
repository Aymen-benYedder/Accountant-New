import { Div } from "@jumbo/shared";

// Temporarily disabled jvectormap to fix build errors
const VisitorsOnMap = () => {
  return (
    <Div
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "200px",
        overflow: "hidden",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.secondary',
        bgcolor: 'background.paper',
        borderRadius: 1,
        p: 2,
        textAlign: 'center',
      }}>
      Map component temporarily disabled
    </Div>
  );
};

export { VisitorsOnMap };
