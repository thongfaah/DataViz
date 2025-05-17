// components/PivotTableCDN.js
import { useEffect, useRef } from 'react';

export default function PivotTableCDN() {
  const pivotRef = useRef(null);

  useEffect(() => {
    const loadScripts = async () => {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://cdn.webdatarocks.com/latest/webdatarocks.min.css";
      document.head.appendChild(css);

      const script = document.createElement("script");
      script.src = "https://cdn.webdatarocks.com/latest/webdatarocks.js";
      script.onload = () => {
        new window.WebDataRocks({
          container: pivotRef.current,
          toolbar: true,
          height: 430,
          report: {
            dataSource: {
              data: [
                { Category: "Fruit", Sales: 100, Qty: 10 },
                { Category: "Vegetable", Sales: 150, Qty: 15 },
              ]
            },
            slice: {
              rows: [{ uniqueName: "Category" }],
              columns: [{ uniqueName: "Measures" }],
              measures: [
                { uniqueName: "Sales", aggregation: "sum" },
                { uniqueName: "Qty", aggregation: "sum" }
              ]
            }
          }
        });
      };
      document.body.appendChild(script);
    };

    loadScripts();
  }, []);

  return (
    <>
      <div ref={pivotRef} style={{ height: "450px" }} />
      <style jsx global>{`
        /* Toolbar background */
        .wdr-ui .wdr-toolbar {
          background-color: #0056b3 !important;
          color: #ffffff !important;
          border: none !important;
        }

        /* Toolbar buttons */
        .wdr-ui .wdr-toolbar .wdr-btn {
          background-color: #007bff !important;
          color: #ffffff !important;
          border: 1px solid #ffffff33 !important;
        }

        /* Grid headers */
        .wdr-ui .wdr-grid .wdr-header-cell {
          background-color: #0069d9 !important;
          color: white !important;
          font-weight: bold !important;
        }

        /* Data cells */
        .wdr-ui .wdr-grid .wdr-data-cell {
          background-color: #e6f0ff !important;
          color: #003366 !important;
        }

        /* Row header background */
        .wdr-ui .wdr-grid .wdr-left-cell {
          background-color: #3399ff !important;
          color: white !important;
        }

        /* Totals background */
        .wdr-ui .wdr-grid .wdr-grand-total {
          background-color: #004085 !important;
          color: #ffffff !important;
        }

        /* Filters dropdown */
        .wdr-ui .wdr-popup-container,
        .wdr-ui .wdr-dialog {
          background-color: #f0f8ff !important;
          color: #003366 !important;
        }

        /* Scrollbars */
        .wdr-ui ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .wdr-ui ::-webkit-scrollbar-thumb {
          background: #007bff;
          border-radius: 4px;
        }

        /* Font tweaks */
        .wdr-ui {
          font-family: 'Segoe UI', sans-serif;
          font-size: 13px;
        }
      `}</style>
    </>
  );
}
