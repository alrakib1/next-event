import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert/error-alert";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { getFilteredEvents } from "../api/api-utils";

const FilteredEventsPage = (props) => {
  const router = useRouter();

  // const filteredData = router.query.slug;

  // if (!filteredData) {
  //   return (
  //     <p className="text-3xl font-bold h-[calc(100vh-80px)] flex justify-center items-center">
  //       Loading...
  //     </p>
  //   );
  // }

  // const filteredYear = filteredData[0];
  // const filteredMonth = filteredData[1];
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (props.hasError) {
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

  const filteredEvents = props.events;

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

  const date = new Date(props.date.year, props.date.month - 1);

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

export async function getServerSideProps(ctx) {
  const { params } = ctx;

  const filteredData = params.slug;

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
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect : {
      //   destinations: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
