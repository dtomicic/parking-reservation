import "../styles/globals.css";
import React from "react";
import { supabase } from "../supabase";

export const UserContext = React.createContext();

export default function App({ Component, pageProps }) {
  const [user, setUser] = React.useState(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
