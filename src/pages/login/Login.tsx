import { ChangeEvent, FormEvent, useState } from "react";

import axios from "axios";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Layer from "@/layer/Layer";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const location = useLocation();
  type MessageState = { flash: string; type: "success" | "error" };
  const messageState = location.state as MessageState;

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // const [flash, setFlash] = useState("");

  const navigate = useNavigate();

  const userEndPoint = "http://localhost:3000/api/auth/login";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameError("");
    setPasswordError("");
    setValidated(false);

    const emptyName = form.username === "";
    const emptyPassword = form.password === "";

    if (emptyName) {
      setValidated(true);
      return setNameError("ユーザー名を入力してください");
    }

    if (emptyPassword) {
      setValidated(true);
      return setPasswordError("パスワードを入力してください");
    }

    const enableSubmit = !emptyName && !emptyPassword;

    if (enableSubmit) {
      console.log(form);

      await axios
        .post(`${userEndPoint}`, form)
        .then((res) => {
          setForm({
            username: "",
            password: "",
          });
          console.log(res.data);
          const token = res.data.token;
          console.log(token);
          localStorage.setItem("token", token);
          console.log("ログインしました");
          return navigate(`/api/campground`, {
            state: { flash: res.data.flash, type: "success" },
          });
        })
        .catch((error) => {
          console.log("Error: " + error);
          // setFlash(error.response.data.flash);
        });
    } else {
      console.log("Error");
      return;
    }
  };

  const onChangeForm = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Layer>
      <h1>ログイン</h1>
      {/* {flash && <p>{flash}</p>} */}
      {messageState && messageState.type === "success" && (
        <p>{messageState.flash}</p>
      )}
      <Form
        onSubmit={onSubmit}
        noValidate
        className="validated-form"
        validated={validated}
      >
        <div className="mb-3">
          {nameError && <p>{nameError}</p>}
          <label htmlFor="username" className="form-label">
            ユーザー名:{" "}
          </label>
          <input
            type="text"
            id="username"
            placeholder="ユーザー名を入力"
            name="username"
            value={form.username}
            onChange={onChangeForm}
            className="form-control"
            required
          />
          <div className="valid-feedback">OK</div>
        </div>

        <div className="mb-3">
          {passwordError && <p>{passwordError}</p>}
          <label htmlFor="password" className="form-label">
            パスワード:{" "}
          </label>
          <input
            type="password"
            id="password"
            placeholder="パスワードを入力"
            name="password"
            value={form.password}
            onChange={onChangeForm}
            className="form-control"
            required
          />
          <div className="valid-feedback">OK</div>
        </div>

        <div className="mb-3">
          <button className="btn btn-success" type="submit">
            ログイン
          </button>
        </div>
      </Form>
    </Layer>
  );
};

export default Login;
