"use client";
// import Scheduler from "@/components/Scheduler/Scheduler";
import axios from "axios";
import {useEffect, useState} from "react";
// import {addDays, subDays} from "date-fns";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
// import MyCalendar from "@/components/Calendar/CalendarComponent";
const getData = async () => {
 try {
  const response = await axios.get("https://shine-polish-server.onrender.com/bookings/options");
  return response.data;
 } catch (error) {
  console.error(error);
 }
};

export default function Home() {
 const [result, setResult] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const response = await axios.get("https://shine-polish-server.onrender.com/bookings/options");

    setResult(response.data);
    // const areas = response.data.areaOptions;
    return response.data;
    // console.log(areas)
   } catch (error) {
    console.error(error);
   }
  };

  fetchData();
  // console.log(data)
 }, []);

 //   useEffect(() => {
 // 	console.log(data);
 //   }, [data]);

 console.log(result);

 return (
  <div>
   <h1>Hello Admin page</h1>
   <form>
    <input
     type="text"
     className=" border border-s-orange-500"
    />
    <input
     type="text"
     className=" border border-s-orange-500"
    />
    <button type="submit">Submit</button>
   </form>
   {/* <Scheduler
    events={[
     {date: subDays(new Date(), 1), title: "Event 1"},
     {date: subDays(new Date(), 1), title: "Event 2"},
     {date: addDays(new Date(), 8), title: "Event 3"},
    ]}
   /> */}
   <CalendarComponent />
   {/* <MyCalendar /> */}
   <ul></ul>
  </div>
 );
import { Sidebar } from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

const getData = async () => {
  try {
    const response = await axios.get(
      "https://shine-polish-server.onrender.com/bookings/options"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://shine-polish-server.onrender.com/bookings/options"
        );

        setResult(response.data);
        // const areas = response.data.areaOptions;
        return response.data;
        // console.log(areas)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // console.log(data)
  }, []);

  //   useEffect(() => {
  // 	console.log(data);
  //   }, [data]);

  console.log(result);

  return (
    <div>
      <h1>Hello Admin page</h1>
      <form>
        <input type="text" className=" border border-s-orange-500" />
        <input type="text" className=" border border-s-orange-500" />
        <button type="submit">Submit</button>
      </form>
      <ul></ul>
    </div>
  );
}
