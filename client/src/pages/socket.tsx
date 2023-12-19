import React from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
const dummyData = {
  string: "this is a test string",
  integer: 42,
  array: [1, 2, 3, "test", null],
  float: 3.14159,
  object: {
    "first-child": true,
    "second-child": false,
    "last-child": null,
  },
  string_number: "1234",
  date: "2023-12-19T14:15:09.606Z",
};

const SocketPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      event: form.get("event"),
      payload: form.get("payload"),
    };
    console.log(data);
    e.currentTarget.reset();
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-2 pb-10">
        <h1 className="font-bold text-4xl ">Web Sockets</h1>
        <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text--700">
          Live
        </span>
      </div>
      <div className="flex w-full p-8 gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex-[1] flex flex-col gap-4 w-[350px] p-4 border-r"
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

        <div className="flex-[2] flex flex-col gap-4 border rounded p-4 max-h-[500px] overflow-auto">
          <JsonView src={dummyData} dark={true} theme="atom" />
        </div>
      </div>
    </div>
  );
};

export default SocketPage;
