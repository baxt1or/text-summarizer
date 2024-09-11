import HomeComponent from "@/components/Home";
import Summarizer from "@/components/Summarizer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-24 max-w-5xl mx-auto gap-y-5">
      <HomeComponent />
      <Summarizer />
    </div>
  );
}
