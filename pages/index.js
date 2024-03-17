import EventList from "@/components/events/event-list";

import Head from "next/head";
import { getFeaturedEvents } from "./api/api-utils";
import NewsletterRegistration from "@/components/input/newsletter-registration";

export default function HomePage(props) {
  const { events } = props;

  return (
    <>
      <Head>
        <title>Next Event</title>
        <meta
          name="description"
          content="Find a lot of great events that will help you will a lot."
          key="description"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps(ctx) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
