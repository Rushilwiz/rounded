import { useEffect } from "react";
import axios from "axios";
export default function DashboardComponent({ clientID, secretID }) {
  useEffect(() => {
    const fetchData = async () => {
      const bearerResponse = await fetch(
        "https://api.sandbox.paypal.com/v1/oauth2/token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                "AbA-5-a8nI5NbtAr0lrk2HNeJsc9u8W9TSy0zCWVgQKBkdkGTgRS5FRnpE2EuZge0Wvgzj0nRcgQAayY:EI_hNPlvttB2d8vIpqZC-qhuBGjZW_UOcFRJVs2-Axt8QFh1ZZ6j-jk0XYfrpOk7qgHPV7TubhgmuR3k"
              ),
          },
          body: "grant_type=client_credentials",
        }
      );
      const bearer = await bearerResponse.json();
      const access_token = bearer.access_token;
      console.log(access_token);
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + "T" + time + "-07:00";
      const balanceResponse = await fetch(
        `https://api.sandbox.paypal.com/v1/reporting/balances?currency_code=ALL&as_of_time=${dateTime}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );
      const balance = await balanceResponse.json();
      console.log(balance);
    };
    fetchData();
  }, []);

  let orders = [
    {
      id: "1",
      name: "Order 1",
      date: "2020-01-01",
      amount: "100.06",
      vendor: "Amazon",
    },
    {
      id: "2",
      name: "Order 2",
      date: "2020-02-25",
      amount: "235.21",
      vendor: "Walmart",
    },
    {
      id: "3",
      name: "Order 3",
      date: "2020-04-15",
      amount: "10.89",
      vendor: "Ebxay",
    },
  ];

  return (
    <div classNameName="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Vendor
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {order.name}
              </th>
              <td className="px-6 py-4">{order.date}</td>
              <td className="px-6 py-4">{order.vendor}</td>
              <td className="px-6 py-4">${order.amount}</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Round up for charity?
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
