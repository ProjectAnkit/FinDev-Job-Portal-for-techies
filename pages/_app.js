import "@/styles/globals.css";
import { store } from "@/Store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/Watermark.module.css";
import { setUserData, setUserToken } from "@/Utils/UserSlice";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  useEffect(() => {
    // Initialize user data from localStorage
    const storedUser = localStorage.getItem("user");
    const token = Cookies.get("token");
    
    if (storedUser && token) {
      store.dispatch(setUserData(JSON.parse(storedUser)));
      store.dispatch(setUserToken(token));
    }

    // Handle page unload
    const handleBeforeUnload = (event) => {
      // Only clear data if explicitly logging out
      if (!event.returnValue) {
        localStorage.removeItem("user");
        Cookies.remove("token");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <div className={styles.watermark}>Made by Ankit & Mayank</div>
    </Provider>
  );
}
