import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import LoveUsButton from "./Fidback";
import RichEditor from "./Email";

function HomePage() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/reka16.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
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
            marginTop: "20px",
          }}
          onMouseOver={(e) => (e.target.style.boxShadow = "0 0 15px white")}
          onMouseOut={(e) => (e.target.style.boxShadow = "none")}
        >
          להורדת תפילה מותאמת אישית
        </Button>
      </motion.div>

      {/* כפתור שפותח את הדיאלוג */}
      <LoveUsButton onClick={() => setOpenDialog(true)} />

      {/* הדיאלוג עצמו */}
      <RichEditor open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}

export default HomePage;
