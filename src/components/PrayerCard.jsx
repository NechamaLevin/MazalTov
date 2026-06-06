// PrayerCard.jsx
import React, { useCallback, useRef, useState } from "react";
import { Card, CardContent, Box, IconButton, Typography } from "@mui/material";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

const PrayerCard = React.forwardRef(
  (
    {
      background,
      textStyle,
      firstName,
      lastName,
      customBgFit,
      onCustomBgFitChange,
    },
    ref
  ) => {
    const isCustom = Boolean(customBgFit && onCustomBgFitChange);
    const bgRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    // גרירה להזזת התמונה
    const handleBgPointerDown = useCallback(
      (e) => {
        if (!isCustom || !onCustomBgFitChange || !bgRef.current) return;
        if (e.button !== 0) return;
        e.preventDefault();
        setIsDragging(true);
        const el = bgRef.current;
        const rect = el.getBoundingClientRect();
        const start = {
          mx: e.clientX,
          my: e.clientY,
          x: customBgFit.x,
          y: customBgFit.y,
        };

        const onMove = (ev) => {
          const dx = ev.clientX - start.mx;
          const dy = ev.clientY - start.my;
          const nx = clamp(start.x + (dx / rect.width) * 100, 0, 100);
          const ny = clamp(start.y + (dy / rect.height) * 100, 0, 100);
          onCustomBgFitChange({ x: nx, y: ny });
        };

        const onUp = () => {
          setIsDragging(false);
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
          window.removeEventListener("pointercancel", onUp);
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);
      },
      [isCustom, onCustomBgFitChange, customBgFit]
    );

    // גלילת עכבר לזום
    const handleWheel = useCallback(
      (e) => {
        if (!isCustom || !onCustomBgFitChange) return;
        e.preventDefault();
        const delta = e.deltaY > 0 ? -10 : 10;
        const newZoom = clamp(customBgFit.zoom + delta, 50, 400);
        onCustomBgFitChange({ zoom: newZoom });
      },
      [isCustom, onCustomBgFitChange, customBgFit]
    );

    // כפתורי זום
    const handleZoomIn = () => {
      if (!isCustom || !onCustomBgFitChange) return;
      onCustomBgFitChange({ zoom: clamp(customBgFit.zoom + 15, 50, 400) });
    };
    const handleZoomOut = () => {
      if (!isCustom || !onCustomBgFitChange) return;
      onCustomBgFitChange({ zoom: clamp(customBgFit.zoom - 15, 50, 400) });
    };

    const bgSize = isCustom ? `auto ${customBgFit.zoom}%` : "cover";
    const bgPos = isCustom
      ? `${customBgFit.x}% ${customBgFit.y}%`
      : "center";

    return (
  <Card
    ref={ref}
    onWheel={handleWheel}
    sx={{
      width: { xs: "100%", md: "7.4cm" },
      height: { xs: "auto", md: "21cm" },
      padding: "2rem",
      boxShadow: 3,
      textAlign: "right",
      position: "relative",
      color: "black",
      alignSelf: "flex-start",
      overflow: "hidden",
      background: "transparent",
      border: isCustom ? "2.5px dashed #c27d83" : "none",
      animation: isCustom ? "pulseBorder 2s ease-in-out" : "none",
      "@keyframes pulseBorder": {
        "0%": { borderColor: "#c27d83" },
        "50%": { borderColor: "#e8a5ab" },
        "100%": { borderColor: "#c27d83" },
      },
    }}
  >
    <Box
      ref={bgRef}
      onPointerDown={handleBgPointerDown}
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${background})`,
        backgroundSize: bgSize,
        backgroundPosition: bgPos,
        backgroundRepeat: "no-repeat",
        cursor: isCustom ? (isDragging ? "grabbing" : "grab") : "default",
        touchAction: isCustom ? "none" : "auto",
      }}
    />

    {/* סרגל כלים עליון */}
    {isCustom && (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          py: 0.5,
          px: 1,
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.92)",
          borderBottom: "1px solid rgba(194,125,131,0.3)",
          backdropFilter: "blur(4px)",
        }}
      >
        <IconButton
          size="small"
          onClick={handleZoomOut}
          sx={{
            backgroundColor: "rgba(194,125,131,0.15)",
            color: "#983f4b",
            width: 28,
            height: 28,
            fontSize: "1.1rem",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "rgba(194,125,131,0.3)" },
          }}
        >
          −
        </IconButton>
        <Typography variant="caption" sx={{ color: "#983f4b", fontWeight: "bold", fontSize: "0.7rem", mx: 0.5 }}>
          {customBgFit.zoom}%
        </Typography>
        <IconButton
          size="small"
          onClick={handleZoomIn}
          sx={{
            backgroundColor: "rgba(194,125,131,0.15)",
            color: "#983f4b",
            width: 28,
            height: 28,
            fontSize: "1.1rem",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "rgba(194,125,131,0.3)" },
          }}
        >
          +
        </IconButton>

        <Box sx={{ width: "1px", height: 20, backgroundColor: "rgba(194,125,131,0.3)", mx: 0.5 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <OpenWithIcon sx={{ fontSize: 14, color: "#983f4b" }} />
          <Typography variant="caption" sx={{ color: "#666", fontSize: "0.6rem" }}>
            גרור להזזה
          </Typography>
        </Box>

        <Box sx={{ width: "1px", height: 20, backgroundColor: "rgba(194,125,131,0.3)", mx: 0.5 }} />

        <IconButton
          size="small"
          onClick={() => onCustomBgFitChange({ zoom: 150, x: 50, y: 50 })}
          sx={{
            color: "#983f4b",
            width: 28,
            height: 28,
            "&:hover": { backgroundColor: "rgba(194,125,131,0.15)" },
          }}
          title="איפוס למרכז"
        >
          <RestartAltIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    )}

    <Box
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background:
          "linear-gradient(rgba(250, 250, 250, 0.61), rgba(255, 255, 255, 0.5))",
      }}
    />
    <CardContent data-pdf-content="true" sx={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
      <div
        style={{
          marginBottom: "2rem",
          ...textStyle,
          textAlign: "center",
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
            רִבּוֹנוֹ שֶׁל עוֹלָם בְּשָׁעָה בָּהּ עוֹמְדִים <br />
              <b> הֶחָתָן {firstName}</b>, <br />
              <b> וְהַכַּלָּה {lastName}</b> <br />
              תַּחַת הַחֻפָּה לִבְנוֹת בַּיִת נֶאֱמָן בְּיִשְׂרָאֵל, אָנָּא
              בְּרַחֲמֶיךָ הָרַבִּים זַכֵּם לְהָקִים בַּיִת כָּשֵׁר וְנֶאֱמָן
              וְיִהְיֶה בֵּיתָם בִּנְיַן עֲדֵי עַד עַל אַדְנֵי הַתּוֹרָה
              וְהַיִּרְאָה, וְתַשְׁרֶה שְׁכִינָתְךָ בְּבֵיתָם מִתּוֹךְ אַהֲבָה
              וְאַחְוָה, הֲבָנָה שָׁלוֹם וְרֵעוּת. תֵּן לָהֶם חַיִּים אֲרֻכִּים
              וְטוֹבִים שֶׁל שִׂמְחָה אֲמִתִּית וּפְנִימִית מִתּוֹךְ יִשּׁוּב
              הַדַּעַת וְשַׁלְוָה וּבְרִיאוּת אֵיתָנָה, בַּרְכֶם בְּכָל מִינֵי
              בְּרָכָה וְתַשְׁפִּיעַ עֲלֵיהֶם מִשֶּׁפַע אוֹצָרְךָ הַטּוֹב,
              וְהַצְלִיחֵם בְּרוּחָנִיּוּת וּבְגַּשְׁמִיּוּת בְּכָל מִילֵי
              דְּמֵיטָב, פַּרְנָסָה בְּכָבוֹד וּבְרֶוַח, וּתְזַכֵּם בְּמָּקוֹם
              יִשּׁוּב נֹחַ וּמֻצְלָח, לְקַיֵּם כָּל דִּבְרֵי תּוֹרָתֵנוּ
              הַקְּדוֹשָׁה מִתּוֹךְ יִרְאַת שָׁמַיִם טְהוֹרָה, אַהֲבָה
              וְשִׂמְחָה תְּמִידִית.
              <br />
              <br></br>
              <b>וּבְכֵן יְהִי רָצוֹן מִלְּפָנֶיךָ,</b> מֶלֶךְ רָם וְנִשָּׂא
              שֶׁתְּבָרְכֵם בְּבִרְכַּת שָׁמַיִם וּתְזַכֵּם לְהִפָּקֵד בְּזֶרַע
              קֹדֶשׁ שֶׁל קְיָמָא לְהַעֲמִיד דּוֹרֵי דּוֹרוֹת שֶׁל בָּנִים
              וּבָנוֹת צַדִּיקִים וִישָׁרִים, כֻּלָּם שׁוֹמְרֵי תּוֹרָה
              וּמְקַיְּמֵי מִצְווֹת מִתּוֹךְ יִרְאַת שָׁמַיִם טְהוֹרָה
              וּבְרִיאוּת אֵיתָנָה, וְיִרְאוּ הֵם רֹב נַחַת וְאֹשֶׁר, וּפְרֹשׂ
              סֻכַּת שְׁלוֹמְךָ עַל כָּל יוֹצְאֵי חַלָצֵיהֶם וְעַל כָּל
              הַמְּחֻתָּנִים שֶׁיִּחְיוּ, וְנִזְכֶּה כֻּלָּנוּ יַחַד לְהַקְבִּיל
              פְּנֵי מְשִׁיחַ צִדְקֵנוּ, לִרְאוֹת בְּבִנְיַן בֵּית
              מִקְדָּשֵׁנוּ וְתִפְאַרְתֵּנוּ בִּכְלַל עַמְּךָ בֵּית יִשְׂרָאֵל
              בִּמְהֵרָה בְּיָמֵינוּ, אָמֵן.
            </p>
    </CardContent>
  </Card>
    );
  }
);

PrayerCard.displayName = "PrayerCard";

export default PrayerCard;
