import { useAuth } from "../lib/firebase/authContext";
import { useRouter } from "next/router";
import { useState } from "react";
// import axios from "axios";
export default function AuthComponent() {
  const { signup, signIn } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  async function handleRegisterSubmit(e) {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }),
      };
      const response = await fetch(
        "http://localhost:8000/api/profile/create",
        requestOptions
      );
      const dataa = await response.json();
      console.log(dataa);
    } catch (error) {
      console.log(error);
    }
  }
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

      const response = await fetch(
        "http://localhost:8000/api/token/",
        requestOptions
      );
      const data = await response.json();
      console.log(data);

      localStorage.setItem("token", data.access);
      localStorage.setItem("username", username);

      // const reqOps = {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${data.access}`,
      //   },
      // };
      // const resp = await fetch("http://localhost:8000/api/foundation/", reqOps);
      // const data2 = await resp.json();
      // console.log(data2);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      <br />
      <h1>OR</h1>
      <br />
      <h1>Register</h1>
      <input
        placeholder="Username"
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <button onClick={handleRegisterSubmit}>Submit</button>
    </>
  );
}
