import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";

import Head from "next/head";
import { getEventById, getFeaturedEvents } from "../api/api-utils";

const EventDetailPage = (props) => {
  const event = props.selectedEvent;
  if (!event) {
    return (
      <>
        <div>
          <p>Loading....</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title} | Next Event</title>
        <meta name="description" content={event.description} />
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
  const events = await getFeaturedEvents();

  const paths = events.map((event) => {
    if (!event.id) {
      throw new Error(`Event ${event.title} does not have an id`);
    }

    return { params: { eventid: event.id } };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
}
