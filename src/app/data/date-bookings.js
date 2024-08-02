import dayjs from "dayjs";

export const data = [
    {
        id: 1,
        name: "Fiona Galager",
        date: new Date("2024-08-01"),
        time: "10:00",
        area: "Area 1",
        service: "Service 1",
        startTime: "10:00",
        endTime: "11:00",
        isAllDay: false,
        status: "Completed",
        priority: "High"
    },
    {
        id: 2,
        name: "Jane Doe",
        date: new Date("2024-08-02"),
        time: "12:00",
        area: "Area 2",
        service: "Service 2",
        startTime: "12:00",
        endTime: "13:00",
        isAllDay: false,
        status: "Pending",
        priority: "Medium"
    },
    {
        id: 3,
        name: "Bob Smith",
        date: new Date("2024-08-03"),
        time: "14:00",
        area: "Area 3",
        service: "Service 3",
        startTime: "14:00",
        endTime: "15:00",
        isAllDay: false,
        status: "In Progress",
        priority: "Low"
    },
    {
        id: 4,
        name: "Alice Johnson",
        date: new Date("2024-08-04"),
        time: "16:00",
        area: "Area 4",
        service: "Service 4",
        startTime: "16:00",
        endTime: "17:00",
        isAllDay: false,
        status: "Completed",
        priority: "High"
    },
    {
        id: 5,
        name: "Charlie Brown",
        date: new Date("2024-08-05"),
        time: "18:00",
        area: "Area 5",
        service: "Service 5",
        startTime: "18:00",
        endTime: "19:00",
        isAllDay: false,
        status: "Pending",
        priority: "Medium"
    },
    {
        id: 6,
        name: "David Wilson",
        date: new Date("2024-08-06"),
        time: "20:00",
        area: "Area 6",
        service: "Service 6",
        startTime: "20:00",
        endTime: "21:00",
        isAllDay: false,
        status: "In Progress",
        priority: "Low"
    },
    {
        id: 7,
        name: "Emily Davis",
        date: new Date("2024-08-07"),
        time: "08:00",
        area: "Area 7",
        service: "Service 7",
        startTime: "08:00",
        endTime: "09:00",
        isAllDay: false,
        status: "Completed",
        priority: "High"
    },
    {
        id: 8,
        name: "Frank Miller",
        date: new Date("2024-08-08"),
        time: "10:00",
        area: "Area 8",
        service: "Service 8",
        startTime: "10:00",
        endTime: "11:00",
        isAllDay: false,
        status: "Pending",
        priority: "Medium"
    },
    {
        id: 9,
        name: "Grace Smith",
        date: new Date("2024-08-09"),
        time: "12:00",
        area: "Area 9",
        service: "Service 9",
        startTime: "12:00",
        endTime: "13:00",
        isAllDay: false,
        status: "In Progress",
        priority: "Low"
    },
    {
        id: 10,
        name: "Henry Johnson",
        date: new Date("2024-08-10"),
        time: "14:00",
        area: "Area 10",
        service: "Service 10",
        startTime: "14:00",
        endTime: "15:00",
        isAllDay: false,
        status: "Completed",
        priority: "High"
    }
];



export const events = [
  {
    id: 1,
    title: "Event 1",
    start: dayjs("2024-08-10T12:00:00").toDate(),
    end: dayjs("2024-08-10T12:00:00").add(3, "hour").toDate(), // Додавання 3 годин до початку
    backgroundColor: "#D0F4DE",
    textColor: "black",
    data: {
      description: "Event 1 description",
    },
  },
  {
    id: 2,
    title: "Event 2",
    start: dayjs("2024-08-18T12:00:00").toDate(),
    end: dayjs("2024-08-18T12:00:00").add(3, "hour").toDate(), // Додавання 3 годин до початку
    backgroundColor: "#FCF6BD",
    textColor: "black",
    data: {
      description: "Event 2 description",
    },
  },
  {
    id: 3,
    title: "Event 3",
    start: dayjs("2024-08-07T10:00:00").toDate(),
    end: dayjs("2024-08-07T10:00:00").add(3, "hour").toDate(), // Додавання 3 годин до початку
    backgroundColor: "#FF99C8",
    textColor: "white",
    data: {
      description: "Event 3 description",
    },
  },
  {
    id: 4,
    title: "Event 4",
    start: dayjs("2024-08-14T12:00:00").toDate(),
    end: dayjs("2024-08-14T12:00:00").add(3, "hour").toDate(), // Додавання 3 годин до початку
    backgroundColor: "##FCF6BD",
    textColor: "white",
    data: {
      description: "Event 4 description",
    },
  },
  {
    id: 5,
    title: "Event 5",
    start: dayjs("2024-08-04T12:00:00").toDate(),
    end: dayjs("2024-08-04T12:00:00").add(3, "hour").toDate(), // Додавання 3 годин до початку
    backgroundColor: "#E4C1F9",
    textColor: "white",
    data: {
      description: "Event 5 description",
    },
  },
  {
    id: 6,
    title: "Event 6",
    start: dayjs("2024-08-04T09:00:00").toDate(),
    end: dayjs("2024-08-04T09:00:00").add(3, "hour").toDate(), // Додавання 3 годин до початку
    backgroundColor: "#A9DEF9",
    textColor: "white",
    data: {
      description: "Event 6 description",
    },
  },
];
