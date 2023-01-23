import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import InputBox from "../components/InputBox/InputBox";
import styles from "./Home.module.css";
import Router from "next/router";
import Menu from "../components/Menu/Menu";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
    }
    if (data.session === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  };

  const logout = async () => {
    const { data } = await supabase.auth.signOut();
    Router.reload();
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <>
      {loggedIn ? (
        <div className={styles.container}>
          <h2 className={styles.header}>Parking App</h2>
          <Menu />
        </div>
      ) : (
        <div className={styles.container}>
          <h2 className={styles.header}>Parking App</h2>
          <div className={styles.loginContainer}>
            <InputBox type={"login"} />
          </div>
        </div>
      )}
    </>
  );
}
