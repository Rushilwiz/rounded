import { useAuth } from "../lib/firebase/authContext";
import { useRouter } from "next/router";
import { useState } from "react";
export default function AuthComponent() {
  const { signup, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Register</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
