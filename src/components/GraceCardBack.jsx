// // GraceCardBack.jsx
// import React from "react";
// import { Card, CardContent } from "@mui/material";

// const GraceCardBack = React.forwardRef(({ background, textStyle, textPart2, customText }, ref) => (
//   <Card
//     ref={ref}
//     sx={{
//       width: { xs: "100%", md: "7.4cm" },
//       height: { xs: "auto", md: "21cm" },
//       padding: "2rem",
//       boxShadow: 3,
//       textAlign: "right",
//       background: `linear-gradient(rgba(250,250,250,0.61), rgba(255,255,255,0.5)), url(${background})`,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//       position: "relative",
//       color: "black",
//       alignSelf: "flex-start",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",
//     }}
//   >
//     <CardContent>
//       <p
//         style={{
//           ...textStyle,
//           fontSize: "11px",
//           lineHeight: "1.4",
//           letterSpacing: "0.9px",
//         }}
//         dangerouslySetInnerHTML={{ __html: textPart2 }}
//       />

//       {customText && (
//         <div
//           style={{
//             marginTop: "2rem",
//             ...textStyle,
//             textAlign: "center",
//             fontSize: "14px",
//             color: "#444",
//             padding: "8px",
//             borderTop: "1px dashed #999",
//             background: "rgba(255,255,255,0.5)",
//             borderRadius: "4px",
//           }}
//         >
//           {customText}
//         </div>
//       )}
//     </CardContent>
//   </Card>
// ));

// export default GraceCardBack;
