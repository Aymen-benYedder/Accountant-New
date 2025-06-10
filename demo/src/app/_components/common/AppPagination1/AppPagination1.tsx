import { Box, Button, Pagination } from "@mui/material";
import React from "react";

const AppPagination1 = ({
  data,
  limit = 2,
}: {
  data: any[];
  limit?: number;
}) => {
  const [page, setPage] = React.useState(1); // Current active page
  let count = Math.ceil(data?.length / limit);

  const handleChange = ({}, pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Button
        variant="outlined"
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        sx={{
          mr: 2,
          borderRadius: 5,
          textTransform: "none",
          letterSpacing: 0,
          fontSize: 13,
        }}
      >
        Previous
      </Button>

      {/* Pagination */}
      <Pagination
        count={count} // Total pages
        page={page}
        onChange={handleChange}
        color="primary" // Change color of the active page
        shape="rounded"
        hideNextButton
        hidePrevButton
      />

      <Button
        variant="outlined"
        disabled={page === count}
        onClick={() => setPage((prev) => Math.min(prev + 1, 25))}
        sx={{
          ml: 2,
          borderRadius: 5,
          textTransform: "none",
          letterSpacing: 0,
          fontSize: 13,
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export { AppPagination1 };
