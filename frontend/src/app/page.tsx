"use client";
import { useEffect, useState } from "react";
import LoginForm from "./pages/loginForm";
import Authenticate from "./authenticate/page";
export default function Home() {


  // This is a simple React component that fetches data from an API and displays it.
  // It uses the useEffect hook to perform the fetch operation when the component mounts.
  // The useState hook is used to manage the state of the fetched data.

  // const [data, setData] = useState(null);

  // const fetchData = async () => {
  //   const res = await fetch("http://127.0.0.1:8000/lessons/");
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   return res.json();
  // };

  // useEffect(() => {
  //   fetchData()
  //     .then(data => setData(data))
  //     .catch(error => console.error("Error fetching data:", error));
  // }, []);

  return (
    // <div>
    //   {data ? (
    //     <div>
    //       <h2>Data from API:</h2>
    //       <pre>{JSON.stringify(data, null, 2)}</pre>
    //     </div>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
    <div>
      <Authenticate />
    </div>
  );
}
