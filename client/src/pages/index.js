// import { useAuth } from "../common/lib/firebase/authContext";
import { useEffect, useState } from "react";

export default function HomePage() {
  // const { currentUser } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    // Perform localStorage action
    setCurrentUser(localStorage.getItem("username"));
  }, []);

  return (
    <div>
      <div
        className="logo"
        data-0="opacity: 1; display: flex"
        data-99="opacity: 0; display: none"
        data-100="display: none"
      >
        <div className="logo">rounded.</div>
      </div>
      <div className="hint" data-0="bottom: 10vh" data-100="bottom: -25px">
        the future of rounding up, for a better tomorrow
      </div>

      <div className="menu">rounded.</div>
      <div className="content">We're rounding up where you can't.</div>

      <h1>This is HackTJ 2022!</h1>
      {currentUser ? (
        <p>You're logged in! Current username: {currentUser}</p>
      ) : (
        <p>Not logged in</p>
      )}
      <a href="/dashboard">Go to Dashboard</a>
    </div>
  );
}
