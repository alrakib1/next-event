async function getAllEvents() {
  const response = await fetch(
    "https://car-doctor-5f3ce-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();

  const events = [];
  for (const key in data) {
    if (typeof key !== "string") {
      console.error(`Invalid event id: ${key}`);
    }

    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

async function getFeaturedEvents() {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
}

async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

module.exports = { getAllEvents, getFeaturedEvents, getEventById };
