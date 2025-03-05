import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/reducers/rootReducer";

import { Button } from "../../components/Button/Button";
import { login } from "../../store/actions/asyncActions";
import { clearErrors } from "../../features/authSlice";
import { TailSpin } from "react-loader-spinner";

import styles from "./LoginPage.styles.module.css";
import menuStyles from "../MenuPage/MenuPage.styles.module.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const location = useLocation();

  const dispatch = useDispatch() as AppDispatch;
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement>,
    username: string,
    password: string
  ) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  
  useEffect(() => {
    if (isLoggedIn) {
      const from = (location.state as { from?: Location })?.from?.pathname || "/";
      navigate(from);
    }
  }, [isLoggedIn, navigate, location]); 

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearErrors());
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearErrors());
    setPassword(e.target.value);
  };

  const handleCancel = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    dispatch(clearErrors());
  };

  return (
    <>
      <div className={menuStyles.background}>
        <div className={styles.main}>
          <h1 className={styles.title}>Log in</h1>
          {isLoading && (
            <TailSpin
            visible={true}
            height="40"
            width="40"
            color="#808080"
            ariaLabel="tail-spin-loading"
            radius="1"
            />
          )}
          <form className={styles.form} action="login">
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="username">
                User name
              </label>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  className={`${styles.input} ${error ? styles.error : ""}`}
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={handleNameChange}
                />
                {error && <span className={styles.errorMessage}>{error}</span>}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  className={`${styles.input} ${error ? styles.error : ""}`}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {error && <span className={styles.errorMessage}>{error}</span>}
              </div>
            </div>
            <div
              style={{ display: "flex", gap: "30px", justifyContent: "center" }}
            >
              <Button
                text="Submit"
                type="primaryButton"
                style={{
                  backgroundColor: "var(--tiffany-green)",
                  color: "white",
                }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleSubmit(e, username, password)
                }
              />
              <Button
                text="Cancel"
                type="primaryButton"
                onClick={handleCancel}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
