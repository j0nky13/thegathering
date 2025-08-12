import BookPromo from "../components/home/BookPromo";
import Hero from "../components/home/Hero";
import SubscribeBlock from "../components/home/SubscribeBlock";
import HomeSections from "../components/home/HomeSections";

export default function Home() {
  return (
    <div className="min-h-[70vh]">
      <Hero />
      <BookPromo />
      <HomeSections />
      <SubscribeBlock />
    </div>
  );
}