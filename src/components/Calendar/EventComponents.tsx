"use client";

import React from "react";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const Event: React.FC<{event: any}> = ({event}) => {
 return (
  <div
   style={{
    backgroundColor: event.backgroundColor || "transparent",
    color: event.textColor || "black",
    width: "100%",
    height: "100%",
    display: "flex",

    alignItems: "center",
    borderRadius: 12,
    padding: 4,
   }}
  >
   <CircleRoundedIcon style={{fontSize: "10px", marginRight: "4px"}} />
   <span
    style={{
     whiteSpace: "nowrap",
     overflow: "hidden",
     textOverflow: "ellipsis",
    }}
   >
    {event.title}
   </span>
  </div>
 );
};

export default Event;
