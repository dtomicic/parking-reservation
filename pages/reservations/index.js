import styles from "./Reservations.module.css";
import { supabase } from "../../supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../components/Modal/Modal";

const index = () => {
  const [userId, setUserId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [resId, setResId] = useState(null);

  const handleClick = (x) => {
    setToggleModal(!toggleModal);
    setResId(x);
  };

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserId(user.id);
    console.log(userId);
  };

  const getReservations = async () => {
    if (userId !== null) {
      const { data, error } = await supabase
        .from("rezervacije")
        .select()
        .eq("id_korisnika", userId);
      if (error) {
        console.log(error);
      }
      setReservations(data);
    }
  };

  console.log(resId);

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    getReservations();
  }, [userId]);

  return (
    <>
      <Modal toggleModal={toggleModal} setToggleModal={setToggleModal} resId={resId} />
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.header}>Your reservations</h2>
          <Link href="/">
            <h3 className={styles.backBtn}>Back</h3>
          </Link>
        </div>
        {reservations.length === 0 ? (
          <h3 className={styles.noReservations}>You have no reservations</h3>
        ) : (
          <div className={styles.reservations}>
            {reservations.map((reservation) => (
              <div className={styles.reservationContainer} key={reservation.id}>
                <h3 className={styles.reservationHeader}>
                  {reservation.datum}
                </h3>
                <button className={styles.cancelBtn} onClick={() => handleClick(reservation.id)}>
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default index;
