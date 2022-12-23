import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, Fragment } from "react";
import { Dialog } from '@headlessui/react';
import {
  EmojiHappyIcon as EmojiHappyIconSolid,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  ThumbUpIcon,
  XIcon,
  Bars3Icon, 
  XMarkIcon
} from "@heroicons/react/solid";

export default function Home() {
  // React Hooks
  const [data, setData] = useState({ text: "" });
  const [query, setQuery] = useState();
  const [query2, setQuery2] = useState();
  const [search, setSearch] = useState();
  const [search2, setSearch2] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            name: search,
            name2: search2,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, search2]);
  
  // What we want to render
  return (
    <Fragment>
      <Head>
        <title>What's Next?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-tr from-pink-200 to-blue-400 min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <main className="flex flex-col justify-center  max-w-3xl w-full align-center">
          <h1 className="text-4xl text-center font-bold text-slate-800 drop-shadow sm:text-2xl mb-1">
            What's Next?
          </h1>
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-300 to-red-300 rounded-md py-1.5 px-4 text-sm leading-6 ring-4 mt-4 ring-gray-900/10 hover:ring-gray-900/20">
          <p className="block text-sm text-center mt-4 text-gray-500">
            What do you want to do?
          </p>

          {/* Card & Input field  */}
          <div className="text-center relative backdrop-filter overflow-hidden mb-6 max-w w-full rounded-md  ring-1 ring-black ring-opacity-0 p-4 ">
            <textarea
              className="max-w shadow-md bg-gray-100 text-gray-800 px-4 py-2   min-h-64  block w-full focus:ring-pink-500 focus:border-pink-500 sm:text-sm border border-gray-300 rounded-lg"
              type="textarea"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="(e.g. expand music reach, promote my business, stop a bad habit, learn an instrument)"
              defaultValue={""}
            />

            
            <p className="block text-sm text-center mt-4 text-gray-500">
            What is your intended goal?
          </p>

          {/* Card & Input field  */}
          <div className="text-center relative backdrop-filter overflow-hidden mb-6 mt-4 max-w w-full rounded-md  ring-1 ring-black ring-opacity-0 p-0 ">
            <textarea
              className="max-w shadow-md bg-gray-100 text-gray-800 px-4 py-2    min-h-64  block w-full focus:ring-pink-500 focus:border-pink-500 sm:text-sm border border-gray-300 rounded-lg"
              type="textarea"
              value={query2}
              onChange={(event) => setQuery2(event.target.value)}
              placeholder="Write a specific goal here"
              defaultValue={""}
            />
            
            {/* Button to that calls API */}
            <div className="text-center relative backdrop-filter overflow-hidden mb-6 max-w w-full rounded-md  ring-1 ring-black ring-opacity-0 py-4 ">  
            <button
              className="inline-block rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blue-600 hover:bg-blue-700 hover:ring-blue-700"
              type="button"
              onClick={() => [setSearch(query), setSearch2(query2)]}
            >
              Result
            </button>

              <div className="mt-5 p-5 text-sm text-gray-900 border-t-2 border-slate-200 ">
              {isLoading ? <div>Loading ...</div> : <span> {data.text} </span>}
              {/* {lorem} */}
              </div>
            </div>
          </div>
            </div>
          </div>  
        </main>
      </div>
    </Fragment>
  );
}
