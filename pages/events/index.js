import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AllEventsPage = () => {
  const router = useRouter();

  const [events, setEvents] = useState();

  fetch("https://car-doctor-5f3ce-default-rtdb.firebaseio.com/events.json")
    .then((response) => response.json())
    .then((data) => setEvents(data));

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
