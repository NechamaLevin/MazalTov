// import React, { useState, useRef } from "react";
// import { Box, Button, Typography, Card, CardContent } from "@mui/material";
// import html2pdf from "html2pdf.js";
// import GraceCardFront from "./GraceCardFront";
// import GraceCardBack from "./GraceCardBack";
// import TextEditorToolbar from "./textEditor.jsx";

// const GraceCardGenerator = () => {
//   const [selectedBackground, setSelectedBackground] = useState("222.jpg");
//   const [textStyle, setTextStyle] = useState({
//     textAlign: "justify",
//     color: "#000000",
//     fontFamily: "Rubik",
//   });
//   const [customText, setCustomText] = useState("שבת שבע ברכות - משפחת כהן");

//   const [backgroundFile, setBackgroundFile] = useState(null);

//   const handleBackgroundUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setSelectedBackground(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const textPart1 = `א. ברכת הזן
// בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַזָּן אֶת הָעוֹלָם כֻּלּוֹ בְּטוּבוֹ, בְּחֵן בְּחֶסֶד וּבְרַחֲמִים, הוּא נֹתֵן לֶחֶם לְכָל בָּשָׂר, כִּי לְעוֹלָם חַסְדּוֹ. וּבְטוּבוֹ הַגָּדוֹל תָּמִיד לֹא חָסַר-לָנוּ וְאַל יֶחְסַר לָנוּ מָזוֹן לְעוֹלָם וָעֶד, בַּעֲבוּר שְׁמוֹ הַגָּדוֹל, כִּי הוּא אֵל זָן וּמְפַרְנֵס לַכֹּל וּמֵטִיב לַכֹּל וּמֵכִין מָזוֹן לְכָל בְּרִיּוֹתָיו אֲשֶׁר בָּרָא. בָּרוּךְ אַתָּה יְיָ הַזָּן אֶת הַכֹּל.

// ב. ברכת הארץ
// נוֹדֶה לְּךָ, יְיָ אֱלֹהֵינוּ, עַל שֶׁהִנְחַלְתָּ לַאֲבוֹתֵינוּ אֶרֶץ חֶמְדָּה טוֹבָה וּרְחָבָה, וְעַל שֶׁהוֹצֵאתָנוּ יְיָ אֱלֹהֵינוּ מֵאֶרֶץ מִצְרַיִם, וּפְדִיתָנוּ מִבֵּית עֲבָדִים, וְעַל בְּרִיתְךָ שֶׁחָתַמְתָּ בִּבְשָׂרֵנוּ, וְעַל תּוֹרָתְךָ שֶׁלִּמַּדְתָּנוּ, וְעַל חֻקֶּיךָ שֶׁהוֹדַעְתָּנוּ, וְעַל חַיִּים חֵן וָחֶסֶד שֶׁחוֹנַנְתָּנוּ, וְעַל אֲכִילַת מָזוֹן שָׁאַתָּה זָן וּמְפַרְנֵס אוֹתָנוּ תָּמִיד, בְּכָל יוֹם וּבְכָל עֵת וּבְכָל שָׁעָה.

// וְעַל הַכֹּל יְיָ אֱלֹהֵינוּ אֲנַחְנוּ מוֹדִים לָךְ וּמְבָרְכִים אוֹתָךְ, יִתְבָּרַךְ שִׁמְךָ בְּפִי כָּל חַי תָּמִיד לְעוֹלָם וָעֶד, כַּכָּתוּב: וְאָכַלְתָּ וְשָׂבַעְתָּ, וּבֵרַכְתָּ אֶת יְיָ אֱלֹהֶיךָ עַל הָאָרֶץ הַטּוֹבָה אֲשֶּׁר נָתַן לָךְ (דברים ח, י). בָּרוּךְ אַתָּה יְיָ, עַל הָאָרֶץ וְעַל הַמָּזוֹן.

// ג. ברכת בונה ירושלים
// רַחֶם נָא יְיָ אֱלֹהֵינוּ עַל יִשְׂרָאֵל עַמֶּךָ, וְעַל יְרוּשָׁלַיִם עִירֶךָ, וְעַל צִיּוֹן מִשְׁכַּן כְּבוֹדֶךָ, וְעַל מַלְכוּת בֵּית דָּוִד מְשִׁיחֶךָ, וְעַל הַבַּיִת הַגָדוֹל וְהַקָדוֹשׁ שֶׁנִּקְרָא שִׁמְךָ עָלָיו. אֱלֹהֵינוּ, אָבִינוּ, רְעֵנוּ, זוּנֵנוּ, פַרְנְסֵנוּ וְכַלְכְּלֵנוּ וְהַרְוִיחֵנוּ, וְהַרְוַח לָנוּ יְיָ אֱלֹהֵינוּ מְהֵרָה מִכָּל צָרוֹתֵינוּ, וְנָא אַל תַּצְרִיכֵנוּ יְיָ אֱלֹהֵינוּ לֹא לִידֵי מַתְּנַת בָּשָׂר וָדָם וְלֹא לִידֵי הַלְוָאָתָם, כִּי אִם לְיָדְךָ הַמְּלֵאָה הַפְּתוּחָה הַקְּדוֹשָׁה וְהָרְחָבָה, שֶׁלֹא נֵבוֹשׁ וְלֹא נִכָּלֵם לְעוֹלָם וָעֶד.

// וּבְנֵה יְרוּשָׁלַיִם עִיר הַקֹּדֶשׁ בִּמְהֵרָה בְיָמֵינוּ. בָּרוּךְ אַתָּה יְיָ, בּוֹנֵה בְרַחֲמָיו יְרוּשָׁלַיִם. אָמֵן.

// ד. ברכת הטוב והמיטיב
// בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הָאֵל, אָבִינוּ, מַלְכֵּנוּ, אַדִירֵנוּ, בּוֹרְאֵנוּ, גֹּאֲלֵנוּ, יוֹצְרֵנוּ, קְדוֹשֵׁנוּ קְדוֹשׁ יַעֲקֹב, רוֹעֵנוּ רוֹעֵה יִשְׂרָאַל, הַמֶּלֶךְ הַטּוֹב וְהַמֵּיטִיב לַכֹּל, שֶׁבְּכָל יוֹם וָיוֹם הוּא הֵיטִיב, הוּא מֵיטִיב, הוּא יֵיטִיב לָנוּ, הוּא גְמָלָנוּ, הוּא גוֹמְלֵנוּ, הוּא יִגְמְלֵנוּ לָעַד, לְחֵן וּלְחֶסֶד וּלְרַחֲמִים וּלְרֶוַח, הַצָּלָה וְהַצְלָחָה, בְּרָכָה וִישׁוּעָה, נֶחָמָה פַּרְנָסָה וְכַלְכָּלָה, וְרַחֲמִים וְחַיִּים וְשָׁלוֹם, וְכָל טוֹב, וּמִכָּל טוּב לְעוֹלָם אַל יְחַסְּרֵנוּ.`;
//   const textPart2 = `תוספות והשלמות
// הָרַחֲמָן הוּא יִמְלוֹךְ עָלֵינוּ לְעוֹלָם וָעֶד.

// הָרַחֲמָן הוּא יִתְבָּרַךְ בַּשָּׁמַיִם וּבָאָרֶץ.

// הָרַחֲמָן הוּא יִשְׁתַּבַּח לְדוֹר דּוֹרִים, וְיִתְפָּאַר בָּנוּ לָעַד וּלְנֵצַח נְצָחִים, וְיִתְהַדַּר בָּנוּ לָעַד וּלְעוֹלְמֵי עוֹלָמִים.

// הָרַחֲמָן הוּא יְפַרְנְסֵנוּ בְּכָבוֹד.

// הָרַחֲמָן הוּא יִשְׁבּוֹר עֻלֵּנוּ מֵעַל צַּוָּארֵנוּ וְהוּא יוֹלִיכֵנוּ קוֹמְמִיוּת לְאַרְצֵנוּ.

// הָרַחֲמָן הוּא יִשְׁלַח לָנוּ בְּרָכָה מְרֻבָּה בַּבַּיִת הַזֶּה, וְעַל שֻׁלְחָן זֶה שֶׁאָכַלְנוּ עָלָיו (שֻׁלְחָנוֹת אֵלּוּ שֶׁאָכַלְנוּ עֲלֵיהֶם).

// הָרַחֲמָן הוּא יִשְׁלַח לָנוּ אֶת אֵלִיָּהוּ הַנָּבִיא זָכוּר לַטּוֹב, וִיבַשֵּׂר לָנוּ בְּשׂוֹרוֹת טוֹבוֹת יְשׁוּעוֹת וְנֶחָמוֹת.

// בבית אביו אומר: הָרַחֲמָן הוּא יְבָרֵךְ אֶת אָבִי מוֹרִי בַּעַל הַבַּיִת הַזֶּה, וְאֶת אִמִּי מוֹרָתִי בַּעֲלַת הַבַּיִת הַזֶּה.

// נשוי אומר: הָרַחֲמָן הוּא יְבָרֵךְ אוֹתִי, (אם אביו ואמו בחיים: וְאֶת אָבִי מוֹרִי, וְאֶת אִמִּי מוֹרָתִי,) וְאֶת אִשְׁתִּי, וְאֶת זַרְעִי, וְאֶת כָּל אֲשֶׁר לִי.

// אשה נשואה אומרת: הָרַחֲמָן הוּא יְבָרֵךְ אוֹתִי, (אם אביה ואמה בחיים: וְאֶת אָבִי מוֹרִי, וְאֶת אִמִּי מוֹרָתִי,) וְאֶת בַּעֲלִי, וְאֶת זַרְעִי, וְאֶת כָּל אֲשֶׁר לִי.

// אורח אומר: הָרַחֲמָן הוּא יְבָרֵךְ אֶת בַּעַל הַבַּיִת הַזֶּה וְאֶת בַּעֲלַת הַבַּיִת הַזֶּה, אוֹתָם וְאֶת בֵּיתָם וְאֶת זַרְעָם וְאֶת כָּל אֲשֶׁר לָהֶם. יְהִי רָצוֹן, שֶׁלֹּא יֵבוֹשׁ בַּעַל הַבַּיִת בָּעוֹלָם הַזֶּה, וְלֹא יִכָּלֵם לָעוֹלָם הַבָּא, וְיִצְלַח מְאֹד בְּכָל נְכָסָיו, וְיִהְיוּ נְכָסָיו וּנְכָסֵינוּ מֻצְלָחִים וּקְרוֹבִים לָעִיר, וְאַל יִשְׁלֹט שָׂטָן לֹא בְּמַעֲשֵׂי יָדָיו וְלֹא בְּמַעֲשֵׂי יָדֵינוּ, וְאַל יִזְדַקֵּק (נוסח הגמרא: יִזְדַקֵּר) לֹא לְפָנָיו וְלֹא לְפָנֵינוּ שׁוּם דְבַר הַרְהוֹר חֵטְא וַעֲבֵרָה וְעָוֹן מֵעַתָּה וְעַד עוֹלָם.

// בסעודה משותפת אומר: הָרַחֲמָן הוּא יְבָרֵךְ אֶת כָּל הַמְּסֻבִּין כַּאן.

// אוֹתָם וְאֶת בֵּיתָם וְאֶת זַרְעָם וְאֶת כָּל אֲשֶׁר לָהֶם, אוֹתָנוּ וְאֶת כָּל אֲשֶׁר לָנוּ, כְּמוֹ שֶׁנִּתְבָּרְכוּ אֲבוֹתֵינוּ אַבְרָהָם יִצְחָק וְיַעֲקֹב בַּכֹּל, מִכֹּל, כֹּל, כֵּן יְבָרֵךְ אוֹתָנוּ כֻּלָּנוּ יַחַד בִּבְרָכָה שְׁלֵמָה. וְנֹאמַר: אָמֵן.

// בַּמָרוֹם יְלַמְּדוּ עֲלֵיהֶם וְעָלֵינוּ זְכוּת שֶׁתְּהֵא לְמִשְׁמֶרֶת שָׁלוֹם. וְנִשָׂא בְרָכָה מֵאֵת יְיָ, וּצְדָקָה מֵאֱלֹהֵי יִשְׁעֵנוּ, וְנִמְצָא חֵן וְשֵׂכֶל טוֹב בְּעֵינֵי אֱלֹהִים וְאָדָם.

// הָרַחֲמָן הוּא יְזַכֵּנוּ לִימוֹת הַמָּשִׁיחַ וּלְחַיֵּי הָעוֹלָם הַבָּא.

// מַגְדִּיל יְשׁוּעוֹת מַלְכּוֹ וְעֹשֶׂה חֶסֶד לִמְשִׁיחוֹ, לְדָוִד וּלְזַרְעוֹ עַד עוֹלָם. עֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כָּל יִשְׂרָאַל, וְאִמְרוּ אָמֵן.

// יְראוּ אֶת יְיָ קְדֹשָׁיו, כִּי אֵין מַחְסוֹר לִירֵאָיו. כְּפִירִים רָשׁוּ וְרָעֵבוּ, וְדֹרְשֵׁי יְיָ לֹא יַחְסְרוּ כָל טוֹב. הוֹדוּ לַיְיָ כִּי טוֹב, כִּי לְעוֹלָם חַסְדּוֹ. פּוֹתֵחַ אֶת יָדֶךָ, וּמַשְׂבִּיעַ לְכָל חַי רָצוֹן. בָּרוּךְ הַגֶּבֶר אֲשֶׁר יִבְטַח בַּיְיָ, וְהָיָה יְיָ מִבְטַחוֹ. נַעַר הָיִיתִי גַּם זָקַנְתִּי, וְלֹא רָאִיתִי צַדִּיק נֶעֱזָב, וְזַרְעוֹ מְבַקֶּשׁ לָחֶם. יְיָ עֹז לְעַמּוֹ יִתֵּן, יְיָ יְבָרֵךְ אֶת עַמּוֹ בַשָּׁלוֹם.`;

//   const frontRef = useRef();
//   const backRef = useRef();

// const handleDownloadPDF = async () => {
//     const backgroundImage = selectedBackground || "222.jpg";
//     const fontFamily = textStyle?.fontFamily || "Arial";
//     const textColor = textStyle?.color || "#000000";
//     const customTextValue = customText || "";
//     const part1Text = textPart1 || "";
//     const part2Text = textPart2 || "";

//     console.log("מתחיל תהליך יצירת PDF סופי...");

//     // פונקציה ליצירת כרטיס בודד
//     const createCardElement = (content, customTextContent = "", isBack = false) => {
//         const card = document.createElement("div");
//         card.style.cssText = `
//             width: 100%; height: 100%; padding: 6mm; box-sizing: border-box;
//             border: 2px solid #333; border-radius: 8px;
//             font-family: ${fontFamily}, Arial, sans-serif; font-size: 9px; line-height: 1.3;
//             color: ${textColor}; text-align: justify; direction: rtl;
//             overflow: hidden; position: relative; background-color: #fff;
//         `;
        
//         if (backgroundImage && backgroundImage !== "222.jpg" && backgroundImage.startsWith('data:')) {
//             card.style.backgroundImage = `url("${backgroundImage}")`;
//             card.style.backgroundSize = "cover";
//             card.style.backgroundPosition = "center";
//         }

//         const contentWrapper = document.createElement("div");
//         contentWrapper.style.cssText = `position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column;`;
        
//         if (!isBack) {
//             const title = document.createElement("div");
//             title.innerHTML = "ברכת המזון";
//             title.style.cssText = `text-align: center; font-size: 14px; font-weight: bold; margin-bottom: 6mm; padding: 6px; background-color: rgba(255,255,255,0.95); border-radius: 6px; border: 2px solid #000;`;
//             contentWrapper.appendChild(title);
//         }
        
//         const contentDiv = document.createElement("div");
//         contentDiv.innerHTML = content;
//         contentDiv.style.cssText = `flex-grow: 1; overflow: hidden; font-size: 12px; text-align: justify; line-height: 1.2; background-color: rgba(255,255,255,0.8); padding: 4px; border-radius: 4px;`;
//         contentWrapper.appendChild(contentDiv);
        
//         if (isBack && customTextContent) {
//             const customDiv = document.createElement("div");
//             customDiv.innerHTML = customTextContent;
//             customDiv.style.cssText = `margin-top: 6mm; text-align: center; font-size: 10px; font-weight: bold; padding: 6px; background-color: rgba(255,255,255,0.95); border-radius: 6px; border-top: 2px dashed #666;`;
//             contentWrapper.appendChild(customDiv);
//         }
        
//         card.appendChild(contentWrapper);
//         return card;
//     };

//     // פונקציה ליצירת דף בודד
//     const createSinglePage = (content, customTextContent, isBack) => {
//         const page = document.createElement("div");
//         page.style.cssText = `
//             width: 297mm; height: 210mm; display: flex;
//             justify-content: space-around; align-items: stretch;
//             padding: 5mm; box-sizing: border-box; background-color: #fff;
//             margin: 0; position: relative;
//         `;
        
//         for (let i = 0; i < 3; i++) {
//             const column = document.createElement("div");
//             column.style.cssText = `width: 90mm; height: 190mm; margin: 0 2mm;`;
//             const card = createCardElement(content, customTextContent, isBack);
//             column.appendChild(card);
//             page.appendChild(column);
//         }
//         return page;
//     };

//     const tempContainer = document.createElement("div");
//     tempContainer.style.cssText = "position: fixed; left: -9999px; top: 0; z-index: -1;";
//     document.body.appendChild(tempContainer);

//     try {
//         const mainContainer = document.createElement("div");
//         mainContainer.style.cssText = `background-color: #fff; width: 297mm; min-height: 420mm;`;

//         // דף 1
//         const page1 = createSinglePage(part1Text, "", false);
//         mainContainer.appendChild(page1);

//         // דף 2 - עם רווח קטן כדי לעזור לספרייה להבין שזה דף חדש
//         const spacer = document.createElement("div");
//         spacer.style.cssText = `height: 5mm; width: 100%; background-color: transparent;`;
//         mainContainer.appendChild(spacer);
        
//         const page2 = createSinglePage(part2Text, customTextValue, true);
//         mainContainer.appendChild(page2);

//         tempContainer.appendChild(mainContainer);
//         await new Promise(resolve => setTimeout(resolve, 500));

//         // הגדרות PDF פשוטות ללא pagebreak
//         const options = {
//             margin: 0,
//             filename: 'ברכת_המזון_3_טורים.pdf',
//             image: { type: 'jpeg', quality: 0.98 },
//             html2canvas: { 
//                 scale: 2, 
//                 useCORS: true, 
//                 allowTaint: true, 
//                 backgroundColor: '#ffffff', 
//                 logging: false, 
//                 scrollX: 0, 
//                 scrollY: 0,
//                 height: 1588, // גובה של 2 דפים A4 landscape (794*2)
//                 width: 1123   // רוחב A4 landscape
//             },
//             jsPDF: { 
//                 unit: 'mm', 
//                 format: 'a4', 
//                 orientation: 'landscape', 
//                 compress: true 
//             }
//             // *** הסרתי לגמרי את pagebreak ***
//         };

//         console.log("יוצר PDF...");
//         await html2pdf().set(options).from(mainContainer).save();
//         console.log("PDF נוצר בהצלחה!");

//     } catch (error) {
//         console.error("שגיאה ביצירת PDF:", error);
//         alert("אירעה שגיאה ביצירת הקובץ. נסה שוב.");
//     } finally {
//         if (document.body.contains(tempContainer)) {
//             document.body.removeChild(tempContainer);
//         }
//     }
// };


//   return (
//     <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
//       <Typography variant="h4" sx={{ textAlign: "center", mb: 4, color: "#983f4b" }}>
//         ברכת המזון - שני צדדים
//       </Typography>

//       <Box sx={{ mb: 3 }}>
//         <Typography>בחר רקע מותאם אישית:</Typography>
//         <input type="file" accept="image/*" onChange={handleBackgroundUpload} />
//       </Box>

//       <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
//         <GraceCardFront ref={frontRef} background={selectedBackground} textStyle={textStyle} textPart1={textPart1} />
//         <GraceCardBack ref={backRef} background={selectedBackground} textStyle={textStyle} textPart2={textPart2} customText={customText} />
//       </Box>

//       <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
//         <Card>
//           <CardContent>
//             <Typography variant="h6">הכנס טקסט מותאם לצד השני:</Typography>
//             <input
//               type="text"
//               value={customText}
//               onChange={(e) => setCustomText(e.target.value)}
//               style={{ width: "100%", padding: "10px", fontSize: "16px" }}
//             />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent>
//             <Typography variant="h6">עיצוב טקסט</Typography>
//             <TextEditorToolbar
//               onStyleChange={(newStyle) => setTextStyle({ ...textStyle, ...newStyle })}
//               currentStyle={textStyle}
//             />
//           </CardContent>
//         </Card>

//         <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
//           הורד PDF להדפסה דו־צדדית (4 כרטיסים)
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default GraceCardGenerator;
