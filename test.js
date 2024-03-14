const { getAllEvents } = require("./pages/utils/api-utils");





getAllEvents()
  .then(events => console.log(events))
  .catch(error => console.error(error));

  