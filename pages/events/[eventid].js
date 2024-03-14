import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";

import Head from "next/head";
import ErrorAlert from "@/components/ui/error-alert/error-alert";
import { getAllEvents, getEventById } from "../utils/api-utils";

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <>
        <Head>
          <title>Event Not Found</title>
        </Head>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title} | Next Event</title>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;

export async function getStaticProps(ctx) {
  const eventId = ctx.params.eventid;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  console.log(events);
  console.log(events.map((event) => event.id));

  const paths = events.map((event) => {
    if (!event.id) {
      throw new Error(`Event ${event.title} does not have an id`);
    }

    return { params: { eventid: event.id } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}
