import { Button } from "@mui/material";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// Component to be printed
const ComponentToPrint = React.forwardRef(({ Comp }, ref) => (
  <div ref={ref}>
    <Comp />
  </div>
));

export default function ExportToPdf({ Comp }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Report",
  });

  return (
    <div>
      <div style={{ display: "none" }}>
        <ComponentToPrint Comp={Comp} ref={componentRef} />
      </div>
      <Button
        onClick={handlePrint}
        sx={{
          color: "#1d3f6b",
          textTransform: "none",
          textDecoration: "underline",
        }}
      >
        Export to PDF
      </Button>
    </div>
  );
}
