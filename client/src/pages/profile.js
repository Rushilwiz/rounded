import { useState } from "react";
export default function Profile() {
  const [wallet, setWallet] = useState("");
  async function handleSubmit(e) {
    try {
      const reqOps = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, //prettier-ignore
        },
        body: {
          "address": wallet, //prettier-ignore
        },
      };
      const resp = await fetch(
        "http://localhost:8000/api/profile/add_wallet",
        reqOps
      );
      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Profile</h1>
      <h2>Add Wallet</h2>
      <input
        placeholder="Address"
        onChange={(e) => setWallet(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
