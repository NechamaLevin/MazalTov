import { useState } from "react";
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatBold, FormatItalic, FormatUnderlined, FormatColorText, FormatAlignJustify } from "@mui/icons-material";
import { IconButton, ToggleButtonGroup, ToggleButton, Box, MenuItem, Select } from "@mui/material";

import "@fontsource/assistant";
import "@fontsource/rubik";
import "@fontsource/alef";
import "@fontsource/david-libre";
import "@fontsource/frank-ruhl-libre";
import "@fontsource/secular-one";
import "@fontsource/miriam-libre";
import "@fontsource/ibm-plex-sans-hebrew";
const TextEditorToolbar = ({ onStyleChange, currentStyle }) => {
  const [alignment, setAlignment] = useState("justify");
  const [fontColor, setFontColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Rubik");
const fonts = [
  { label: "נקי", value: "Arial" },
  { label: "קלאסי", value: "David" },
  { label: "אלגנטי", value: "Narkisim" },
  { label: "מודרני", value: "Rubik" },
  { label: "רגוע", value: "Assistant" },
  { label: "מאופק", value: "Alef" },
  { label: "מסורתי", value: "David Libre" },
  { label: "רשמי", value: "Frank Ruhl Libre" },
  { label: "נועז", value: "Secular One" },
  { label: "חמים", value: "Miriam Libre" },
  { label: "טכנולוגי", value: "IBM Plex Sans Hebrew" },
];



  // שינוי יישור
  const handleAlignment = (event, newAlignment) => {
    debugger
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onStyleChange({ textAlign: newAlignment });
    }
  };
  const toggleStyle = (key, value, defaultOff = "normal") => {
    const current = currentStyle?.[key];
    onStyleChange({ [key]: current === value ? defaultOff : value });
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
      <IconButton onClick={() => toggleStyle("fontWeight", "bold")}><FormatBold /></IconButton>
      <IconButton onClick={() => toggleStyle("fontStyle", "italic")}><FormatItalic /></IconButton>
      <IconButton onClick={() => toggleStyle("textDecoration", "underline", "none")}><FormatUnderlined /></IconButton>
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
  <MenuItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
    {font.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default TextEditorToolbar;
