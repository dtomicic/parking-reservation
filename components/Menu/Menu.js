import styles from "./Menu.module.css";
import Link from "next/link";
import Modal from "../Modal/Modal";
import { useState } from "react";

const Menu = () => {
  const [toggleModal, setToggleModal] = useState(false);
  
  const handleClick = () => {
    setToggleModal(!toggleModal);
  }


  return (
    <>
      <Modal toggleModal={toggleModal} setToggleModal={setToggleModal} type={'logout'} />
      <div className={styles.container}>
        <Link href="/reserve" className={styles.link}>
          <div className={styles.menuItem}>
            <h3 className={styles.menuItemHeader}>New reservation</h3>
          </div>
        </Link>
        <Link href="/reservations" className={styles.link}>
          <div className={styles.menuItem}>
            <h3 className={styles.menuItemHeader}>Your reservations</h3>
          </div>
        </Link>
        <div className={`${styles.menuItem} ${styles.menuItemLogout}`}  onClick={handleClick}>
          <h3 className={styles.menuItemHeader}>Logout</h3>
        </div>
      </div>
    </>
  );
};
export default Menu;
