import React, { useEffect, useState } from "react";
import "react18-json-view/src/style.css";
import JsonView from "react18-json-view";
import { socket } from "@/lib/socket";

const SocketPage: React.FC = () => {
  const [data, setData] = useState({});
  const [isConnected, setIsConnected] = useState(socket.connected);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const event = form.get("event") as string;
    const payload = form.get("payload") as string;

    if (socket) socket?.emit(event, payload);

    e.currentTarget.reset();
  };

  const handleConnectSocket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const URL = form.get("baseURL") as string;
    console.log(URL);
  };

  useEffect(() => {
    socket.on("pong", async (d) => setData(d));
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-2 pb-10">
        <h1 className="font-bold text-4xl ">Web Sockets</h1>

        {isConnected ? (
          <span className="whitespace-nowrap rounded-full bg-green-500 text-white px-2.5 py-0.5 text-sm text--700">
            Live
          </span>
        ) : (
          <span className="whitespace-nowrap rounded-full bg-red-500 text-white px-2.5 py-0.5 text-sm text--700">
            Not Live
          </span>
        )}
      </div>
      <form
        onSubmit={handleConnectSocket}
        className=" flex gap-4 w-full  p-4 border px-8"
      >
        <div className="flex gap-4 items-center w-full">
          <label
            htmlFor="baseURL"
            className="inline-block whitespace-nowrap text-xs font-medium text-gray-700"
          >
            BASE URL
          </label>

          <input
            type="text"
            id="baseURL"
            name="baseURL"
            placeholder="http:://localhost:4000/ws"
            className="flex-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2"
          />
          {isConnected ? (
            <button
              className="inline-block rounded border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-red-600/90  focus:outline-none focus:ring active:text-red-500"
              // type="submit"
              onClick={() => socket.disconnect()}
            >
              Disconnect
            </button>
          ) : (
            <button
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-600/90  focus:outline-none focus:ring active:text-indigo-500"
              // type="submit"
              onClick={() => socket.connect()}
            >
              Connect
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col lg:flex-row w-full p-8 gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex-[1] flex flex-col gap-4 lg:w-[350px] p-4 border rounded"
        >
          <div className="">
            <label
              htmlFor="event"
              className="block text-xs font-medium text-gray-700"
            >
              Event
            </label>

            <input
              type="text"
              id="event"
              name="event"
              placeholder="hello-world"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="payload"
              className="block text-sm font-medium text-gray-700"
            >
              Payload
            </label>

            <textarea
              id="payload"
              name="payload"
              className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm  px-4 py-2"
              rows={4}
              placeholder="Enter payload here..."
            ></textarea>
          </div>
          <button
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-600/90  focus:outline-none focus:ring active:text-indigo-500"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="flex-[2] flex flex-col gap-4 border relative rounded p-4 h-[400px] overflow-auto">
          <JsonView src={data} dark={true} theme="atom" />
        </div>
      </div>
    </div>
  );
};

export default SocketPage;
