import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

export const components = {
 event: (props: {
  event: {
   backgroundColor?: any;
   textColor?: any;
   title?: any;
   data?: any;
  };
 }) => {
  const {data} = props.event;

  console.log(props);
  console.log(data);
  return (
   <div
    style={{
     backgroundColor: props.event.backgroundColor,
     color: props.event.textColor,
     width: "100%",
     height: "100%",
     display: "flex",
     alignItems: "center",
     borderRadius: 12,
     padding: 4,
    }}
   >
    <CircleRoundedIcon
     color={props.event.textColor}
     style={{fontSize: "10px", marginRight: "4px"}}
    />
    {props.event.title}
   </div>
  );
 },
};

// import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
// import {EventProps} from "react-big-calendar"; // Import EventProps for typing

// export const components = {
//   event: (props: EventProps<Event>) => {
//     const { event } = props;

//     return (
//       <div
//         style={{
//           backgroundColor: event.backgroundColor,
//           color: event.textColor,
//           width: "100%",
//           height: "100%",
//           display: "flex",
//           alignItems: "center",
//           borderRadius: 12,
//           padding: 4,
//         }}
//       >
//         <CircleRoundedIcon
//           style={{ fontSize: "10px", marginRight: "4px", color: event.textColor }}
//         />
//         {event.title}
//       </div>
//     );
//   },
// };
