import "../app/globals.css";
import { AuthProvider } from "../common/lib/firebase/authContext";
export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
