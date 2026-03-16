// src/components/common/ScreenReaderAnnouncer.jsx
import React from "react";

const ScreenReaderAnnouncer = () => {
  return (
    <>
      <div
        id="sr-announcer"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      />
      <div
        id="sr-announcer-assertive"
        className="sr-only"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      />
    </>
  );
};

export default ScreenReaderAnnouncer;
