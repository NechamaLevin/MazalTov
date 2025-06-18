// // GraceCardFront.jsx
// import React from "react";
// import { Card, CardContent } from "@mui/material";

// const GraceCardFront = React.forwardRef(({ background, textStyle, textPart1 }, ref) => (
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
//     }}
//   >
//     <CardContent>
//       <div
//         style={{
//           marginBottom: "2rem",
//           ...textStyle,
//           textAlign: "center",
//           fontSize: "24px",
//           color: "#2c3e50",
//           textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
//           padding: "10px",
//           borderBottom: "2px solid black",
//           borderTop: "2px solid black",
//           background: "rgba(255,255,255,0.7)",
//           borderRadius: "8px",
//         }}
//       >
//         ברכת המזון
//       </div>
//       <p
//         style={{
//           ...textStyle,
//           fontSize: "11px",
//           lineHeight: "1.4",
//           letterSpacing: "0.9px",
//         }}
//         dangerouslySetInnerHTML={{ __html: textPart1 }}
//       />
//     </CardContent>
//   </Card>
// ));

// export default GraceCardFront;
