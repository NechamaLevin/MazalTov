import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundImage :"url('/reka16.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* כותרת עם אנימציה של ציפה מלמעלה */}
      <motion.h1
        style={{
          color: "white",
          fontSize: "3rem",
          textShadow: "0 0 15px black",
          marginBottom: "30px",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        תפילה לחופה בקלות וללא עלות
      </motion.h1>

      {/* כפתור עם אנימציה של פעימה וזוהר */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/main")}
          style={{
            fontSize: "1.5rem",
            padding: "15px 40px",
            backgroundColor: "#c27d83",
            border: "2px solid white",
            color: "white",
            textShadow: "0 0 8px white",
            transition: "0.3s",
            marginTop: "20px", // מזיז את הכפתור קצת למעלה
          }}
          onMouseOver={(e) => (e.target.style.boxShadow = "0 0 15px white")}
          onMouseOut={(e) => (e.target.style.boxShadow = "none")}
        >
להורדת תפילה מותאמת אישית        </Button>
      </motion.div>
    </div>
  );
}

export default HomePage;
