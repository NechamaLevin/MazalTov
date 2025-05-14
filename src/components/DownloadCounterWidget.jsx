import React, { useEffect, useState } from "react";

const DownloadCounterWidget = () => {
  const [count, setCount] = useState(null);
const API_URL="https://script.google.com/macros/s/AKfycbz7kfmrD-dz6GqQ_cgvG8ddiPwcmmwfddjQt5o3yeFw3951Ns4cnAMnAr1DnFm3Oo4hgw/exec?fileName=card"

  useEffect(() => {
    debugger
    fetch(API_URL) // ← כאן תחליף לכתובת שלך
      .then((res) => res.json())
      .then((data) => {
setCount(data.count || 0);
      })
      .catch((err) => {
        console.error("שגיאה בטעינת המונה:", err);
      });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#f0f0f0",
        color: "#333",
        padding: "10px 14px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        fontSize: "14px",
        fontWeight: "bold",
        zIndex: 1000,
        direction: "rtl",
      }}
    >
      כמות התפילות שנוצרו עד כה: {count !== null ? count : "טוען..."}
    </div>
  );
};

export default DownloadCounterWidget;
