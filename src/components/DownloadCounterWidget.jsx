import React, { useEffect, useState } from "react";

// קומפוננטת Spinner לטעינה
const Spinner = () => <div className="spinner" />;

const DownloadCounterWidget = () => {
  const [count, setCount] = useState(null);
  const API_URL =
    "https://script.google.com/macros/s/AKfycbz7kfmrD-dz6GqQ_cgvG8ddiPwcmmwfddjQt5o3yeFw3951Ns4cnAMnAr1DnFm3Oo4hgw/exec?fileName=card";

 useEffect(() => {
  const fetchCount = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count || 0);
      })
      .catch((err) => {
        console.error("שגיאה בטעינת המונה:", err);
      });
  };

  fetchCount(); // טעינה ראשונית

  window.addEventListener("downloadCompleted", fetchCount); // האזנה לעדכון

  return () => {
    window.removeEventListener("downloadCompleted", fetchCount); // ניקוי מאזין כשיוצא
  };
}, []);


  return (
    <>
      <style>{`
        .download-widget {
          position: fixed;
          top: 20px;
          left: 80px;
          padding: 8px 14px;
          border: 1.5px solid #c27d83;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(6px);
          color: #000;
          font-size: 14px;
          font-weight: 500;
          z-index: 1000;
          direction: rtl;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: "Segoe UI", sans-serif;
        }

        .spinner {
          border: 2px solid #fff;
          border-top: 2px solid #c27d83;
          border-radius: 50%;
          width: 14px;
          height: 14px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="download-widget">
        <span style={{ fontSize: "18px" }}>🫶🏻</span>
        <span>
          נוצרו עד כה:{" "}
          <strong>
            {count !== null ? `${count.toLocaleString()} קבצים` : <Spinner />}
          </strong>
        </span>
      </div>
    </>
  );
};

export default DownloadCounterWidget;
