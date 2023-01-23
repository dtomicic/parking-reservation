import InputBox from "../../components/inputBox/inputBox";
import styles from "../Home.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useRouter } from "next/router";

const index = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const Router = useRouter();
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

  useEffect(() => {
    getSession();
    if (loggedIn) {
      Router.push("/");
    }
  }, [loggedIn]);
  return (
    <>
        <div className={styles.container}>
          <h2 className={styles.header}>Parking App</h2>
          <div className={styles.loginContainer}>
            <InputBox type={"register"} />
          </div>
        </div>
    </>
  );
};
export default index;
