import React, { useState, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import html2pdf from "html2pdf.js";
import TextEditorToolbar from "./textEditor.jsx";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LoveUsButton from "./Fidback.jsx";
import { createTheme } from "@mui/material/styles";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import RichEditor from "./Email.jsx";

const backgrounds = [
  "333.jpg",
  "444.jpg",
  "555.jpg",
  "666.jpg",
  "111.png",
  "222.jpg",
  "777.jpg.jpg",
  "4444.jpg",
  "5555.jpg",
  "6666.jpg",
  "7777.jpg",
  "3333.jpg",
];

const LetterGenerator = () => {
  const [textStyle, setTextStyle] = useState({
    textAlign: "right",
    color: "#000000",
    fontFamily: "Rubik",
  });
  const theme = createTheme({
    direction: "rtl",
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
    color: "#0D1E46",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("3333.jpg");
  const [openDialog, setOpenDialog] = useState(false);
  const letterRef = useRef(null);

  const [currentBackgroundPage, setCurrentBackgroundPage] = useState(0);
  const backgroundsPerPage = 6;

  const displayedBackgrounds = backgrounds.slice(
    currentBackgroundPage * backgroundsPerPage,
    (currentBackgroundPage + 1) * backgroundsPerPage
  );

  const totalPages = Math.ceil(backgrounds.length / backgroundsPerPage);

  const [isPulsing, setIsPulsing] = useState(false);

  React.useEffect(() => {
    setIsPulsing(true);
    const timer = setTimeout(() => setIsPulsing(false), 2000);

    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 2000);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

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
    <Box
      sx={{
        backgroundImage: "url('/reka15.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        //bgcolor: "#b1a096",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "5%",
          //transform: "translateX(-50%)",
          //animation: "bounce 2s infinite",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": {
              transform: "translateY(0) translateX(-50%)",
            },
            "40%": {
              transform: "translateY(-20px) translateX(-50%)",
            },
            "60%": {
              transform: "translateY(-10px) translateX(-50%)",
            },
          },
        }}
      >
      </Box>

      <Typography
        variant="h4"
        sx={{
          borderBottom: "3px solid #ccc",
          pb: 1,
          color: "#983f4b",
          mb: 2,
          textAlign: "center",
          fontSize: "3rem",
          textShadow: "0 0 15px broun",
        }}
      >
        תפילה לחופה
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "20px",
          width: "100%",
          maxWidth: "1200px",
          height: "auto",
          direction: "rtl",
          overflow: "auto",
        }}
      >
        <Card
          ref={letterRef}
          sx={{
            width: { xs: "100%", md: "7.4cm" },
            height: { xs: "auto", md: "21cm" },
            padding: "2rem",
            boxShadow: 3,
            textAlign: "right",
            background: `linear-gradient(rgba(250, 250, 250, 0.61), rgba(255, 255, 255, 0.5)), url(${selectedBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            color: "black",
            alignSelf: "flex-start",
          }}
        >
          <CardContent>
            <div
              style={{
                textAlign: "center",
                marginBottom: "2rem",
                fontFamily: "David Libre",
                fontSize: "24px",
                color: "#2c3e50",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                padding: "10px",
                borderBottom: "2px solid rgb(2, 2, 2)",
                borderTop: "2px solid rgb(0, 0, 0)",
                background: "rgba(255,255,255,0.7)",
                borderRadius: "8px",
              }}
            >
              תפילה לחופה
            </div>
            <p
              style={{
                ...textStyle,
                fontSize: "16px",
                lineHeight: "1.20",
                letterSpacing: "0.9",
              }}
            >
              רבונו של עולם בשעה בה עומדים <br />
              <b> החתן {firstName}</b>, <br />
              <b> והכלה {lastName}</b> <br />
              תחת החופה לבנות בית נאמן בישראל, אנא ברחמיך הרבים זכם להקים בית
              כשר ונאמן ויהיה ביתם בנין עדי עד על אדני התורה והיראה, ותשרה
              שכינתך בביתם מתוך אהבה ואחוה, הבנה שלום ורעות. תן להם חיים ארוכים
              וטובים של שמחה אמיתית ופנימית מתוך יישוב הדעת ושלווה ובריאות
              איתנה, ברכם בכל מיני ברכה ותשפיע עליהם משפע אוצרך הטוב, והצליחם
              ברוחניות ובגשמיות בכל מיני דמיטב, פרנסה בכבוד וברווח, ותזכם במקום
              יישוב נח ומוצלח, לקיים כל דברי תורתינו הקדושה מתוך יראת שמים
              טהורה, אהבה ושמחה תמידית.
              <br />
              <br></br>
              <b>ובכן יהי רצון מלפניך,</b> מלך רם ונישא שתברכם בברכת שמיים ותזכם
              להיפקד בזרע קודש של קיימא להעמיד דורי דורות של בנים ובנות צדיקים
              וישרים, כולם שומרי תורה ומקיימי מצוות מתוך יראת שמים טהורה ובריאות
              איתנה, ויראו הם רוב נחת ואושר, ופרוש סוכת שלומך על כל יוצאי חלציהם
              ועל כל המחותנים שיחיו, ונזכה כולנו יחד להקביל פני משיח צדקינו,
              לראות בבנין בית מקדשנו ותפארתנו בכלל עמך בית ישראל במהרה בימינו,
              אמן.
            </p>
          </CardContent>
        </Card>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Card
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.61)",
              padding: "1.5rem",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  color: "#983f4b",
                  textAlign: "center",
                  mb: 3,
                  fontWeight: "bold",
                }}
              >
                הכניסו את שמות החתן והכלה
              </Typography>

              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
                    <TextField
                      label="שם החתן"
                      variant="outlined"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      fullWidth
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          color: "#983f4b",
                          "& fieldset": {
                            borderColor: "#983f4b",
                          },
                          "&:hover fieldset": {
                            borderColor: "#983f4b",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#983f4b",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#983f4b",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#983f4b",
                        },
                      }}
                    />
                  </div>
                </ThemeProvider>
              </CacheProvider>

              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
                    <TextField
                      label="שם הכלה"
                      variant="outlined"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      fullWidth
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          color: "#983f4b",
                          "& fieldset": {
                            borderColor: "#983f4b",
                          },
                          "&:hover fieldset": {
                            borderColor: "#983f4b",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#983f4b",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#983f4b",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#983f4b",
                        },
                      }}
                    />
                  </div>
                </ThemeProvider>
              </CacheProvider>

              <Button
                variant="contained"
                color="primary"
                onClick={handleDownloadPDF}
                sx={{
                  width: "100%",
                  py: 2,
                  fontSize: "1.2rem",
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  background: isPulsing
                    ? "linear-gradient(50deg,rgba(192,204,160,255),#983f4b,rgba(192,204,160,255))"
                    : "#c27d83",
                  backgroundSize: "200% auto",
                  animation: isPulsing ? "shine 2s linear infinite" : "none",
                  boxShadow: isPulsing
                    ? "0 0 20px #b1a096)"
                    : "0 4px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                  "@keyframes shine": {
                    "0%": { backgroundPosition: "0% center" },
                    "100%": { backgroundPosition: "200% center" },
                  },
                }}
              >
                <Download sx={{ fontSize: "1.5rem" }} />
                הורד ל-PDF
              </Button>
            </CardContent>
          </Card>

          <Card
            sx={{
              padding: "1rem",
              boxShadow: 3,
              bgcolor: "rgba(255, 255, 255, 0.61)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  color: "#983f4b",
                  textAlign: "center",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                עיצוב טקסט
              </Typography>

              <TextEditorToolbar
                onStyleChange={(newStyle) =>
                  setTextStyle({ ...textStyle, ...newStyle })
                }
                currentStyle={textStyle}
              />
            </CardContent>
          </Card>

          <Card
            sx={{
              padding: "1rem",
              boxShadow: 3,
              bgcolor: "rgba(255, 255, 255, 0.61)#b1a096",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  color: "#983f4b",
                  textAlign: "center",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                בחירת רקע
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {displayedBackgrounds.map((bg) => (
                    <Box
                      key={bg}
                      onClick={() => setSelectedBackground(bg)}
                      sx={{
                        width: "100px",
                        height: "120px",
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border:
                          selectedBackground === bg
                            ? "4px solid white"
                            : "2px solid rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        borderRadius: "5px",
                        transition: "all 0.2s",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    />
                  ))}
                </Box>

                {totalPages > 1 && (
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setCurrentBackgroundPage((prev) =>
                          Math.max(0, prev - 1)
                        )
                      }
                      disabled={currentBackgroundPage === 0}
                      sx={{ color: "#c27d83", borderColor: "white" }}
                    >
                      הקודם
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setCurrentBackgroundPage((prev) =>
                          Math.min(totalPages - 1, prev + 1)
                        )
                      }
                      disabled={currentBackgroundPage === totalPages - 1}
                      sx={{ color: "#c27d83", borderColor: "white" }}
                    >
                      הבא
                    </Button>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          width: "100vw",
          backgroundColor: "rgba(152, 63, 75, 0.7)",
          boxSizing: "border-box",
          color: "#ffffff",
          marginBottom: 0,
          py: 4,
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          ELISHEVA & NECHAMI TECHNOLOGY
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <EmailIcon fontSize="small" />
          <Typography variant="body2"><Button
  variant="text"
  color="whiht'"
  onClick={() => setOpenDialog(true)}
>
לחצו ליצירת קשר במייל</Button></Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 0.5 }}
        >
          <PhoneIcon fontSize="small" />
          <Typography variant="body2">054-850-1802 | 055-676-2801</Typography>
        </Stack>
      </Box>
  <LoveUsButton onClick={() => setOpenDialog(true)} />

      {/* הדיאלוג עצמו */}
      <RichEditor open={openDialog} onClose={() => setOpenDialog(false)} />    </Box>
  );
};

export default LetterGenerator;
