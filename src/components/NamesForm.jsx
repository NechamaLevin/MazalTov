// NamesForm.jsx
import React from "react";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const theme = createTheme({ direction: "rtl" });
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const textFieldStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    color: "#983f4b",
    "& fieldset": { borderColor: "#983f4b" },
    "&:hover fieldset": { borderColor: "#983f4b" },
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
};

const NamesForm = ({ firstName, lastName, onFirstNameChange, onLastNameChange }) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <TextField
            translate="no"
            label="שם החתן"
            variant="outlined"
            value={firstName}
            onChange={onFirstNameChange}
            fullWidth
            sx={textFieldStyle}
          />
          <TextField
            translate="no"
            label="שם הכלה"
            variant="outlined"
            value={lastName}
            onChange={onLastNameChange}
            fullWidth
            sx={textFieldStyle}
          />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default NamesForm;
