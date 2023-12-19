import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { counterState, squaredState } from "@/atoms/example";
import axios from "@/lib/axios";

const HomePage: React.FC = () => {
  const [counter, setCounter] = useRecoilState(counterState);
  const squared = useRecoilValue(squaredState);

  useEffect(() => {
    const checkHealth = async () => {
      const { data } = await axios.get("/api/health");
      console.log(data);
    };
    // checkHealth();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl">Home Page</h1>
      <div className="flex flex-col gap-4">
        <button
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-600/90 focus:outline-none focus:ring active:text-indigo-500"
          onClick={() => setCounter((prev) => prev + 1)}
        >
          +
        </button>
        <span>Count : {counter}</span>
        <span> Squared : {squared}</span>
        <button
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-600/90  focus:outline-none focus:ring active:text-indigo-500"
          onClick={() => setCounter((prev) => prev - 1)}
        >
          -
        </button>

        <a
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-600/90  focus:outline-none focus:ring active:text-indigo-500"
          href="/socket"
        >
          socket page
        </a>
      </div>
    </div>
  );
};

export default HomePage;
