import React, { useState, useRef } from "react";
import TextEditorToolbar from './textEditor.jsx'
import { Button, Card, CardContent, TextField, Box,Typography } from "@mui/material";
import html2pdf from "html2pdf.js";


import emailjs from "@emailjs/browser";


const backgrounds = ["333.jpg", "444.jpg", "555.jpg", "666.jpg", "111.png", "222.jpg", "777.jpg.jpg"];

const LetterGenerator = () => {
  const [textStyle, setTextStyle] = useState({ textAlign: "right", color: "#000000" ,  fontFamily: "Rubik", // ערך ברירת מחדל
  });
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
        sendEmail();

      });
    });
  };




  return (
    <Box
    sx={{
      bgcolor:"rgba(0, 41, 97, 0.78)",
      display: "flex",
      flexDirection: "column", // שינוי למבנה עמודות כדי שהכותרת תהיה מעל הכל
      alignItems: "center",
      gap: "20px",
      p: 3,
      height: "100vh",
      overflow: "auto",
    }}
  >
    {/* כותרת */}
    <Typography variant="h4" sx={{  borderBottom: "2px solid #ccc", pb: 1,color: "white", mb: 2, textAlign: "center" }}>
תפילה לחופה    </Typography>
    <Box
      sx={{
        bgcolor:"rgba(0, 41, 97, 0.78)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        gap: "20px",
        p: 3,
        height: "100vh",
        direction: "rtl", // כיוון מימין לשמאל
      overflow: "auto",
      
      }}
    >
      <Box
  sx={{
    gridRow: "1 / 4", // משתרע על כל הגריד אנכית
    gridColumn: "1 / 2", // ממוקם בין שתי העמודות
    borderRight: "3px solid white", // קו מפריד לבן
    height: "100%", // גובה מלא של הגריד
    alignSelf: "stretch", // מאפשר לקו להימתח
  }}
/>                 
      {/* כרטיס התפילה */}
      <Card
        ref={letterRef}
        sx={{
          gridRow: "1 / 3", // תופסת שני שורות (מההתחלה עד לפני הרקעים)
          gridColumn: "1/ 2", // בעמודה הראשונה (ימין)
          width: "7.4cm",
          height: "21cm", // גובה מלא
          padding: "2rem",
          boxShadow: 3,
          textAlign: "right",
          background: `linear-gradient(rgba(255, 255, 255, 0.61), rgba(255, 255, 255, 0.5)), url(${selectedBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          color: "black",
          alignSelf: "center", // ממרכז את הכרטיס אנכית בתוך הגריד
          justifySelf: "center", // ממרכז את הכרטיס אופקית בתוך הגרי
          
        }}
      >

        <CardContent>
          <p
            style={
              {
                ...textStyle, // הוספת כל העיצובים שנבחרו

                fontSize: "16px",
                lineHeight: "1.20",
                letterSpacing: "0.9",

              }}
          ><br></br><br></br><u>תפילה לחופה</u><br></br><br></br>
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
            <br></br>
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
      <Card sx={{
        gridRow: "1 / 2", // נמצא בשורה הראשונה (מול התפילה)
        gridColumn: "2 / 2", // נמצא בעמודה השנייה (באמצע)
        width: "50%", // חצי מסך
        maxWidth: "500px",
        padding: "1.5rem",
        boxShadow: 3,
        justifySelf: "center",
        bgcolor:"rgba(0, 41, 97, 0.78)",
      }}>
        <CardContent>
          <h2 style={{ color: "white", textAlign: "center" }}>הכניסו את שמות החתן והכלה</h2>
          <TextField
            label="שם החתן"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            sx={{
              border: "2px solid white",
              input: { color: "white" },
              mt: 2,
            }}

          />
          <TextField
            label="שם הכלה"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            sx={{
              border: "2px solid white",
              input: { color: "white" },
              mt: 2,
            }}
          />


        </CardContent>
        
      </Card>
      <Box
  sx={{
    width: "80%",  // מתאים את הרוחב לתצוגה
    height: "60px",  // גובה קבוע כדי לא לתפוס יותר מדי מקום
    display: "flex",
    alignItems: "center",  // שמירת האלמנטים במרכז אנכית
    justifyContent: "center",
    backgroundColor: "#eee",
    borderRadius: "8px",
    margin: "0 auto",  // מרכז את ה-Toolbar בעמוד
  }}
>
  <TextEditorToolbar onStyleChange={(newStyle) => setTextStyle({ ...textStyle, ...newStyle })} />
</Box>

      <Box
        sx={{
          gridRow: "3 / 3",
          gridColumn: "2 / 3",
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          justifyContent: "center",
          gap: "10px",
          mt: 1, // שמרתי על הפרדה קטנה מהרקעים
        }}
      >
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
              border: selectedBackground === bg ? "4px solid white" : "2px solid white",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          />
        ))}
      </Box>

      <Button
        color="primary"
        onClick={handleDownloadPDF}
        sx={{
          gridRow: "3 / 4", // שינוי למיקום קרוב יותר לרקעים
          gridColumn: "2 / 3",
          mt: 0, // ביטול המרווח המיותר
          alignSelf: "center", // שמור אותו במרכז

        }}
      >
        הורד ל-PDF
      </Button>

    </Box>
    </Box>

  );
};

export default LetterGenerator;
