import { useEffect, useState } from "react";
export default function DonatePage() {
  const [foundation, setFoundation] = useState([]);
  useEffect(() => {
    async function getData() {
      const reqOps = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const resp = await fetch("http://localhost:8000/api/foundation/", reqOps);
      const data = await resp.json();
      // console.log(data);
      setFoundation(JSON.stringify(data));
      console.log(foundation);
    }
    // const d = ;
    getData();
    // setFoundation(d);
  }, []);
  return (
    <div>
      <h1>This is the donate page.</h1>
      <p>This page is under construction. Please check back later.</p>
    </div>
  );
}
