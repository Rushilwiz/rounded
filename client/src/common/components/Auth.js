import { useAuth } from "../lib/firebase/authContext";
import { useRouter } from "next/router";
import { useState } from "react";
// import axios from "axios";
export default function AuthComponent() {
  const { signup, signIn } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    try {
      console.log(username);
      console.log(password);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "username": username, //prettier-ignore
          "password": password, //prettier-ignore
        }),
      };

      const response = await fetch("localhost:8000/api/token/", requestOptions);
      const data = await response.json();
      console.log(data);

      localStorage.setItem("token", data.access);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Register</h1>
      <input
        placeholder="Email"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
