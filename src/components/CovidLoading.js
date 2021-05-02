import React from "react";

const CovidLoading = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading Map...</span>
      </div>
    </div>
  );
};

export default CovidLoading;
