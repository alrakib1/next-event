import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const FilteredEventsPage = () => {
  const router = useRouter();

  const filteredData = router.query.slug;

  if (!filteredData) {
    return (
      <p className="text-3xl font-bold h-[calc(100vh-80px)] flex justify-center items-center">
        Loading...
      </p>
    );
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <Head>
          <title>Invalid Filter</title>
        </Head>
        <div className="space-y-5">
          <ErrorAlert>
            <p>Invalid Filter</p>
          </ErrorAlert>
          <div className="center max-w-48">
            <Button link="/events">Show All Events</Button>
          </div>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <Head>
          <title>Event Not Found</title>
        </Head>
        <div className="space-y-5">
          <ErrorAlert>
            <p>No events found !!</p>
          </ErrorAlert>
          <div className="center max-w-48">
            <Button link="/events">Show All Events</Button>
          </div>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <Head>
        <title>Filtered Event</title>
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
