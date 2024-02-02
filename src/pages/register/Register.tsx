import { ChangeEvent, FormEvent, useState } from "react";

import axios from "axios";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Layer from "@/layer/Layer";

const Register = () => {
  const [validated, setValidated] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [flash] = useState("");

  const navigate = useNavigate();

  const userEndPoint = "http://localhost:3000/api/auth/register";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setValidated(false);

    const emptyName = form.username === "";
    const emptyEmail = form.email === "";
    const emptyPassword = form.password === "";

    if (emptyName) {
      setValidated(true);
      return setNameError("ユーザー名を入力してください");
    }
    if (emptyEmail) {
      setValidated(true);
      return setEmailError("メールアドレスを入力してください");
    }
    if (emptyPassword) {
      setValidated(true);
      return setPasswordError("パスワードを入力してください");
    }

    const enableSubmit = !emptyName && !emptyEmail && !emptyPassword;

    if (enableSubmit) {
      console.log(form);

      await axios
        .post(`${userEndPoint}`, form)
        .then((res) => {
          setForm({
            username: "",
            email: "",
            password: "",
          });
          console.log(res.data);
          const token = res.data.token;
          console.log(token);
          localStorage.setItem("token", token);
          console.log("ユーザーを作成しました");
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
      <h1>ユーザー登録</h1>
      {flash && <p>{flash}</p>}
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
          {emailError && <p>{emailError}</p>}
          <label htmlFor="email" className="form-label">
            メールアドレス:{" "}
          </label>
          <input
            type="email"
            id="email"
            placeholder="メールアドレスを入力"
            name="email"
            value={form.email}
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
            作成
          </button>
        </div>
      </Form>
    </Layer>
  );
};

export default Register;
