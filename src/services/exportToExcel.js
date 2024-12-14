import React from "react";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const ExportToExcel = ({ data, filename }) => {
  const handleExport = () => {
    // Create a new workbook and add a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate the Excel file and trigger the download
    XLSX.writeFile(wb, filename);
  };

  return (
    <Button
      variant="text"
      sx={{ gap: 1, textTransform: "none", color: "#1d3f6b" }}
      onClick={handleExport}
    >
      <FileDownloadOutlinedIcon /> Export (.xlsx)
    </Button>
  );
};

export default ExportToExcel;
