import Image from "next/image";
import Link from "next/link";
import classes from "./event-item.module.css";
import Button from "../ui/Button";

const EventItem = (props) => {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image
        src={"/" + image}
        alt={"image" + " of " + title}
        width={700}
        height={100}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2 className="text-2xl font-semibold">{title}</h2>

          <div className={classes.date}>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          ,<Button link={exploreLink}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
