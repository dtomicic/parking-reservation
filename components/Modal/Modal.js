import styles from "./Modal.module.css";
import { supabase } from "../../supabase";
import Router from "next/router";

const Modal = (props) => {
  const handleClick = () => {
    props.setToggleModal(!props.toggleModal);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    Router.reload();
  };

  const cancelReservation = async () => {
    const { error } = await supabase
      .from("rezervacije")
      .delete()
      .eq("id", props.resId);
    Router.reload();
  };

  return (
    <div
      className={
        props.toggleModal
          ? `${styles.background} ${styles.display}`
          : `${styles.background}`
      }
      onClick={handleClick}
    >
      <div className={styles.modal}>
        <h3 className={styles.header}>
          {props.type === "logout" ? "Logout" : "Cancel reservation"}
        </h3>
        <p className={styles.text}>
          {props.type === "logout"
            ? "Are you sure you want to logout?"
            : "Are you sure you want to cancel the reservation?"}
        </p>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={props.type === "logout" ? signOut : cancelReservation}
          >
            Yes
          </button>
          <button className={styles.button} onClick={handleClick}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
