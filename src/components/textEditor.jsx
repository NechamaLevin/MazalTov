import { useState } from "react";
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatBold, FormatItalic, FormatUnderlined, FormatColorText, FormatAlignJustify } from "@mui/icons-material";
import { IconButton, ToggleButtonGroup, ToggleButton, Box, MenuItem, Select } from "@mui/material";

import "@fontsource/assistant";
import "@fontsource/rubik";
import "@fontsource/heebo";
import "@fontsource/varela-round";
import "@fontsource/noto-sans-hebrew";
import "@fontsource/alef";
import "@fontsource/david-libre";
import "@fontsource/frank-ruhl-libre";
import "@fontsource/secular-one";
import "@fontsource/miriam-libre";
import "@fontsource/ibm-plex-sans-hebrew";
const TextEditorToolbar = ({ onStyleChange }) => {
  const [alignment, setAlignment] = useState("right");
  const [fontColor, setFontColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Rubik");
  const fonts = ["Arial", "David", "Narkisim", "Rubik", "Assistant", "Varela Round", "Assistant",
    "Rubik",
    "Heebo",
    "Varela Round",
    "Noto Sans Hebrew",
    "Alef",
    "David Libre",
    "Frank Ruhl Libre",
    "Secular One",
    "Miriam Libre",
    "IBM Plex Sans Hebrew"];

  // שינוי יישור
  const handleAlignment = (event, newAlignment) => {
    debugger
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onStyleChange({ textAlign: newAlignment });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", background: "#eee", padding: "10px", borderRadius: "8px" }}>

      {/* 🔹 יישור טקסט */}
      <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} sx={{ mr: 2 }}>
        <ToggleButton value="left"><FormatAlignLeft /></ToggleButton>
        <ToggleButton value="center"><FormatAlignCenter /></ToggleButton>
        <ToggleButton value="right"><FormatAlignRight /></ToggleButton>
        <ToggleButton value="justify"><FormatAlignJustify /></ToggleButton> {/* כפתור יישור לשני הצדדים */}

      </ToggleButtonGroup>

      {/* 🔹 צבע טקסט */}
      <IconButton component="label">
        <FormatColorText />
        <input
          type="color"
          value={fontColor}
          onChange={(e) => {
            setFontColor(e.target.value);
            onStyleChange({ color: e.target.value });
          }}
          style={{ position: "absolute", opacity: 0, width: 0 }}
        />
      </IconButton>

      {/* 🔹 עיצוב פונט - מודגש, נטוי, קו תחתון */}
      <IconButton onClick={() => onStyleChange({ fontWeight: "bold" })}><FormatBold /></IconButton>
      <IconButton onClick={() => onStyleChange({ fontStyle: "italic" })}><FormatItalic /></IconButton>
      <IconButton onClick={() => onStyleChange({ textDecoration: "underline" })}><FormatUnderlined /></IconButton>
      <Select
        value={selectedFont}
        onChange={(e) => {
          setSelectedFont(e.target.value);
          onStyleChange({ fontFamily: e.target.value }); // שולח את הפונט למרכיב הראשי
        }}
        fullWidth
        sx={{ backgroundColor: "#c27d83", color: "white", border: "2px solid white", mt: 2 }}
      >
        {fonts.map((font) => (
          <MenuItem key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default TextEditorToolbar;
