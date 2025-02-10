import useCounterStore from "../../stores/counter";

export default function ScoreCard() {
  const counter = useCounterStore();
  return (
    <div
      className="w-full flex flex-col  py-8 px-8  justify-center items-center"
    >
      <span className="text-8xl font-[200] text-primary/50 select-none">
        {counter.count || 0}
      </span>
    </div>
  );
}
