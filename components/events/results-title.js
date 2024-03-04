import Button from "../ui/Button";
import classes from "./results-title.module.css";

function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1 className="text-2xl mb-5 font-semibold">
        Events in {humanReadableDate}
      </h1>
      <div className="max-w-48 mx-auto">
        <Button link="/events">Show all events</Button>
      </div>
    </section>
  );
}

export default ResultsTitle;
