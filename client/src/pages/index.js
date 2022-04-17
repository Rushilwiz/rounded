import { useAuth } from "../common/lib/firebase/authContext";
export default function HomePage() {
  const { currentUser } = useAuth();
  return (
    <div>
      <h1>This is HackTJ 2022!</h1>
      {currentUser ? (
        <p>You're logged in! Current email: {currentUser.email}</p>
      ) : (
        <p>Not logged in</p>
      )}
      <a href="/dashboard">Go to Dashboard</a>
    </div>
  );
}
