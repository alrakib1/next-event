import EventList from "@/components/events/event-list";
import { getAllEvents } from "@/dummy-data";
import React from "react";

const AllEventsPage = () => {
  const events = getAllEvents();
  return (
    <>
      <h1 className="text-center text-4xl font-semibold">All Events</h1>
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
