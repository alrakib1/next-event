import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";

const FilteredEventsPage = () => {
  const router = useRouter();

getFilteredEvents()


  return (
    <div>
      <h1>Filtered Events Page</h1>
    </div>
  );
};

export default FilteredEventsPage;
