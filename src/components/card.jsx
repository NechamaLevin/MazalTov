import React, { useState, useRef } from "react";
import { Button, Card, CardContent, TextField, Grid, Box } from "@mui/material";
import html2pdf from "html2pdf.js";
import "@fontsource/varela-round";
import emailjs from "@emailjs/browser";


const backgrounds = ["111.png", "222.jpg", "333.jpg", "444.jpg", "555.jpg", "666.jpg","111.png", "222.jpg", "333.jpg", "444.jpg", "555.jpg", "666.jpg"];

const LetterGenerator = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("666.jpg");
  const letterRef = useRef(null);
  const sendEmail = () => {
debugger
    const serviceID = "service_6sxz41s"; // הכניסי את ה-Service ID שלך
    const templateID = "template_d016ffd"; // הכניסי את ה-Template ID שלך
    const publicKey = "x7XK3cgIP_oFW03i4"; // הכניסי את ה-Public Key שלך
  
    const templateParams = {
      firstName: firstName,
      lastName: lastName,
    };
  
    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((error) => {
        console.error("FAILED...", error);
      });
  };
  const handleDownloadPDF = () => {
    document.fonts.ready.then(() => {
      if (!letterRef.current) return;
  
      const lightenImage = (imgSrc, callback) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // חשוב כדי למנוע בעיות של CORS
        img.src = imgSrc;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
  
          // ציור התמונה המקורית
          ctx.drawImage(img, 0, 0);
  
          // הוספת שכבת שקיפות לבנה כדי להבהיר
          ctx.globalAlpha = 0.5; // שליטה בעוצמת ההבהרה
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
  
          // קריאה חזרה עם התמונה החדשה
          callback(canvas.toDataURL("image/jpeg"));
        };
      };
  
      // משתמשים בפונקציה רק פעם אחת, לאחר שהתמונה הובהרה
      lightenImage(selectedBackground, (lightImage) => {
        const tempDiv = document.createElement("div");
        tempDiv.style.width = "297mm";
        tempDiv.style.height = "210mm";
        tempDiv.style.display = "flex";
        tempDiv.style.flexDirection = "row";
        tempDiv.style.justifyContent = "space-between";
        tempDiv.style.alignItems = "flex-start";
        tempDiv.style.margin = "0";
        tempDiv.style.padding = "0";
  
        for (let i = 0; i < 4; i++) {
          const column = document.createElement("div");
          column.style.width = "25%";
          column.style.height = "100%";
          column.style.border = "2px solid black";
          column.style.boxSizing = "border-box";
          column.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
          column.style.display = "flex";
          column.style.flexDirection = "column";
          column.style.justifyContent = "center";
          column.style.alignItems = "center";
          column.style.textAlign = "justify";
          column.style.direction = "rtl";
          column.style.margin = "0";
          column.style.padding = "3mm";
          column.style.fontSize = "8px";
          column.style.backgroundImage = `url(${lightImage})`; // שימוש בתמונה הבהירה
          column.style.backgroundSize = "cover";
          column.style.backgroundPosition = "center";
          column.style.backgroundRepeat = "no-repeat";
  
          const clonedContent = document.createElement("div");
          clonedContent.innerHTML = letterRef.current.innerHTML;
          clonedContent.style.overflowWrap = "break-word";
          clonedContent.style.lineHeight = "1.2";
          clonedContent.style.letterSpacing = "0.5px";
          clonedContent.style.wordBreak = "break-word";
          clonedContent.style.textAlign = "justify";
          clonedContent.style.fontSize = "9px";
          clonedContent.style.maxWidth = "100%";
  
          column.appendChild(clonedContent);
          tempDiv.appendChild(column);
        }
  
        const opt = {
          margin: 0,
          filename: "תפילה_לחופה.pdf",
          image: { type: "jpeg", quality: 1.0 },
          html2canvas: {
            scale: 3,
            dpi: 300,
            letterRendering: true,
            backgroundColor: null,
            useCORS: true,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        };
  
        // קריאה ליצירת PDF רק לאחר שהמבנה מוכן
        html2pdf().set(opt).from(tempDiv).save();
      });
    });
  };
  
  


  return (
    <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 5, p: 3, justifyContent: "center", flexWrap: "wrap",padding:"30" }}>
      {/* כרטיס התפילה */}
      <Card
        ref={letterRef}
        sx={{
          width: "260px",
          height: "auto",
          padding: "2rem",
          boxShadow: 3,
          textAlign: "right",
          background: `linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.5)), url(${selectedBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          color: "black",
        }}
      >
        <CardContent>
         <p
            style={{
              fontSize: "16px",
              lineHeight: "1.15",
              letterSpacing: "1.1px",
              textAlign: "right",
              direction: "rtl",
            }}
          >
          רבונו של עולם בשעה בה עומדים <br />
          <b> החתן {firstName}</b>, <br />
          <b> והכלה {lastName}</b> <br />
              תחת החופה לבנות בית נאמן בישראל, אנא ברחמיך הרבים זכם להקים בית כשר ונאמן
              ויהיה ביתם בנין עדי עד על אדני התורה והיראה, ותשרה שכינתך בביתם מתוך אהבה
              ואחוה, הבנה שלום ורעות. תן להם חיים ארוכים וטובים של שמחה אמיתית ופנימית
              מתוך יישוב הדעת ושלווה ובריאות איתנה, ברכם בכל מיני ברכה ותשפיע עליהם משפע
              אוצרך הטוב, והצליחם ברוחניות ובגשמיות בכל מיני דמיטב, פרנסה בכבוד וברווח,
              ותזכם במקום יישוב נח ומוצלח, לקיים כל דברי תורתינו הקדושה מתוך יראת שמים
              טהורה, אהבה ושמחה תמידית.
              <br />
              <b>ובכן יהי רצון מלפניך,</b> מלך רם ונישא שתברכם בברכת שמיים ותזכם להיפקד
              בזרע קודש של קיימא להעמיד דורי דורות של בנים ובנות צדיקים וישרים, כולם
              שומרי תורה ומקיימי מצוות מתוך יראת שמים טהורה ובריאות איתנה, ויראו הם רוב
              נחת ואושר, ופרוש סוכת שלומך על כל יוצאי חלציהם ועל כל המחותנים שיחיו,
              ונזכה כולנו יחד להקביל פני משיח צדקינו, לראות בבנין בית מקדשנו ותפארתנו
              בכלל עמך בית ישראל במהרה בימינו, אמן.
            </p>
        </CardContent>
      </Card>

      {/* כרטיס מילוי פרטים */}
      <Card sx={{ width: "500px", padding: "1.5rem", boxShadow: 3 }}>
        <CardContent>
          <h2>הכניסו את שמות החתן והכלה</h2>
          <TextField
            label="שם החתן"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            sx={{ textAlign: "right", direction: "rtl", mt: 2, }} // אותו שינוי
            

          />
          <TextField
            label="שם הכלה"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            sx={{ textAlign: "left", direction: "rtl", mt: 2 }} // אותו שינוי

          />
          {/* בחירת רקע */}
          <h2> בחרו רקע כרצונכם </h2>

          <Box sx={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 3 עמודות
    gap: "15px", // רווחים בין הריבועים
    mt: 2,
  }}>
            {backgrounds.map((bg) => (
              <Box
                key={bg}
                onClick={() => setSelectedBackground(bg)}
                sx={{
                  width: "100px",
                  height: "120px",
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: selectedBackground === bg ? "3px solid blue" : "2px solid gray",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* כפתור הורדת PDF */}
      <Button variant="contained" color="primary" onClick={handleDownloadPDF} sx={{ mt: 3 }}>
        הורד ל-PDF
      </Button>
    </Box>
  );
};

export default LetterGenerator;
