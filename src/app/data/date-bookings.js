import dayjs from "dayjs";

export const events = [
  {
    id: 1,
    title: "Evnbnfv 1",
    start: dayjs("2024-08-10T12:00:00").toDate(),
    end: dayjs("2024-08-10T12:00:00").add(2, "hour").toDate(), 
    backgroundColor: "#D0F4DE",
    textColor: "black",
    data: {
      description: "Event 1 description",
    },
  },
  {
    id: 2,
    title: "арварва 2",
    start: dayjs("2024-08-18T12:00:00").toDate(),
    end: dayjs("2024-08-18T12:00:00").add(3, "hour").toDate(), 
    textColor: "black",
    data: {
      description: "Event 2 description",
    },
  },
  {
    id: 3,
    title: "fdjfd 3",
    start: dayjs("2024-08-07T10:00:00").toDate(),
    end: dayjs("2024-08-07T10:00:00").add(3, "hour").toDate(), 
    backgroundColor: "#FF99C8",
    textColor: "white",
    data: {
      description: "Event 3 description",
    },
  },
  {
    id: 4,
    title: "fvfv 4",
    start: dayjs("2024-08-14T12:00:00").toDate(),
    end: dayjs("2024-08-14T12:00:00").add(3, "hour").toDate(), 
    textColor: "white",
    data: {
      description: "Event 4 description",
    },
  },
  {
    id: 5,
    title: "vxcvxc 5",
    start: dayjs("2024-08-04T12:00:00").toDate(),
    end: dayjs("2024-08-04T12:00:00").add(3, "hour").toDate(), 
    backgroundColor: "#E4C1F9",
    textColor: "white",
    data: {
      description: "Event 5 description",
    },
  },
  {
    id: 6,
    title: "name 6",
    start: dayjs("2024-08-04T09:00:00").toDate(),
    end: dayjs("2024-08-04T09:00:00").add(3, "hour").toDate(), 
    backgroundColor: "#A9DEF9",
    textColor: "white",
    data: {
      description: "Event 6 description",
    },
  },
];
