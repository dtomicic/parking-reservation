import styles from "./Reserve.module.css";
import { supabase } from "../../supabase";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { UserContext } from "../_app";

const index = () => {
  const [userId, setUserId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [availableSpots, setAvailableSpots] = useState(10);
  const [takenSpots, setTakenSpots] = useState(0);
  const router = useRouter();
  const value = useContext(UserContext);

  const normalDate =
    startDate.getMonth() +
    1 +
    "-" +
    startDate.getDate() +
    "-" +
    startDate.getFullYear();

  const reserveSpot = async () => {
    const { data, error } = await supabase
      .from("rezervacije")
      .insert({ datum: startDate, id_korisnika: userId });
    router.push("/");
  };

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserId(user.id);
  };

  const getRowCount = async () => {
    const { data, error } = await supabase
      .from("rezervacije")
      .select()
      .eq("datum", normalDate);
    setTakenSpots(data.length);
  };

  useEffect(() => {
    if (value === null) {
      router.push('/');
    } else {
      getUserId();
      getRowCount();
    }
  }, [value]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.header}>Make a reservation</h2>
        <Link href="/">
          <h3 className={styles.backBtn}>Back</h3>
        </Link>
      </div>
      <div className={styles.formContainer}>
        <h3 className={styles.label}>
          Available spots for {normalDate}: {availableSpots - takenSpots}{" "}
        </h3>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className={styles.datePicker}
        />
        <button
          className={
            availableSpots - takenSpots === 0
              ? `${styles.reserveBtn} ${styles.disabled}`
              : `${styles.reserveBtn}`
          }
          onClick={reserveSpot}
        >
          Reserve
        </button>
      </div>
    </div>
  );
};
export default index;
