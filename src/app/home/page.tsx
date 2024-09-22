"use client";

import React, {useContext} from "react";
import {useEffect} from "react";
import ClientCardList from "@/components/ClientCard/ClientCardList";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import {useRouter} from "next/navigation";
import {AuthContext} from "@/components/AuthContext";
import { error } from "console";

export default function Home() {
 const [events, setEvents] = React.useState([]);
 const {isLoggedIn} = useContext(AuthContext);
 const router = useRouter();


 useEffect(() => {
 console.log("object");
  if (!isLoggedIn) {
//    router.push("/");
  }
 }, []);

 return (
  <div className="py-5 md:p-7 lg:py-20">
   <h1 className="text-2xl font-medium text-center text-accent">Home</h1>
   <div className="flex flex-col lg:flex-row">
    <ClientCardList />
    <CalendarComponent
     events={events}
    />
   </div>
  </div>
 );
}
