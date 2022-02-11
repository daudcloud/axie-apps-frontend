import { useEffect, useState } from "react";
import Router from "next/router";
import { useUser } from "../../contexts/UserContext";
import styles from "./styles.module.scss";
import Link from "next/link";

const Login = () => {
  const [dataPost, setDataPost] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ error: false, message: "" });
  const [user, setUser] = useUser();

  const handleChange = (e) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataPost.email === "" || dataPost.password === "") {
      return setErrors({
        ...errors,
        message: "Email and Password is required",
      });
    }
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
    const { success, token, message } = await res.json();
    if (!success) {
      return setErrors({ ...errors, message, error: true });
    }
    setErrors({ ...errors, message, error: false });
    localStorage.setItem("token", token);
    Router.reload();
  };

  useEffect(() => {
    if (user) Router.push(`/${user.roninAddress}`);
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {errors.message !== "" && errors.error && (
          <div className={styles.errors}>{errors.message}</div>
        )}
        {errors.message !== "" && !errors.error && (
          <div className={styles.success}>{errors.message}</div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={dataPost.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={dataPost.password}
          />
          <button type="submit">Log In</button>
          <Link href="/signup">
            <a>
              <button className={styles.btnSecondary}>Sign Up</button>
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
