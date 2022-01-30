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
  const [errors, setErrors] = useState({ message: "" });
  const [success, setSuccess] = useState({ message: "" });
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
      setSuccess({ ...success, message: "" });
      return setErrors({ ...errors, message });
    }
    setErrors({ ...success, message: "" });
    setSuccess({ ...success, message: message });
    localStorage.setItem("token", token);
    Router.reload();
  };

  useEffect(() => {
    if (user) Router.push("/dashboard");
  }, [user]);
  console.log(user);
  return (
    <div className={styles.formContainer}>
      {errors.message !== "" && (
        <div className={styles.errors}>{errors.message}</div>
      )}
      {success.message !== "" && (
        <div className={styles.success}>{success.message}</div>
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
  );
};

export default Login;
