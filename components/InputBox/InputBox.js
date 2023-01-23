import styles from "./InputBox.module.css";
import { useState } from "react";
import { supabase } from "../../supabase";
import Router from "next/router";
import Link from "next/link";

const InputBox = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.type === "register") {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error);
        setError(true);
      } else {
        console.log(data);
        setError(false);
        Router.reload();
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error);
        setError(true);
      } else {
        console.log(data);
        setError(false);
        Router.reload();
      }
    }
  };

  return (
    <div className={styles.container}>
      {props.type === "register" ? (
        <div className={styles.heading}>
          <h2 className={styles.header}>Register</h2>
          <span
            className={
              error
                ? `${styles.errorText} ${styles.errorDisplay}`
                : `${styles.errorText}`
            }
          >
            User already exists!
          </span>
        </div>
      ) : (
        <div className={styles.heading}>
          <h2 className={styles.header}>Login</h2>
          <span
            className={
              error
                ? `${styles.errorText} ${styles.errorDisplay}`
                : `${styles.errorText}`
            }
          >
            Wrong username or password!
          </span>
        </div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label htmlFor="email" className={styles.formItemLabel}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={
              error
                ? `${styles.formItemInput} ${styles.errorBorder}`
                : `${styles.formItemInput}`
            }
            placeholder="example@example.com"
            onChange={handleEmailInput}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="password" className={styles.formItemLabel}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={
              error
                ? `${styles.formItemInput} ${styles.errorBorder}`
                : `${styles.formItemInput}`
            }
            placeholder="******"
            onChange={handlePasswordInput}
          />
        </div>
        {props.type === "register" ? (
          <h3 className={styles.cta}>
            Already have an account?{" "}
            <span className={styles.bolded}>
              <Link href="/">Login</Link>
            </span>
          </h3>
        ) : (
          <h3 className={styles.cta}>
            Don't have an account?{" "}
            <span className={styles.bolded}>
              <Link href="/register">Register</Link>
            </span>
          </h3>
        )}
        <button type="submit" className={styles.submitButton}>
          {props.type === "register" ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
};
export default InputBox;
