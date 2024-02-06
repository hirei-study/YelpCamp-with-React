import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

import axios from "axios";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Layer from "@/layer/Layer";

const New: FC = () => {
  const [form, setForm] = useState({
    title: "",
    price: null,
    location: "",
    images: "",
    description: "",
  });

  const [validated, setValidated] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [imageError, setImageError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [flash, setFlash] = useState("");

  const navigate = useNavigate();

  const newEndPoint = "http://localhost:3000/api/campground/new";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // トークンがない場合、ログイン画面に遷移
      return navigate("/api/auth/login", {
        state: { message: "ログインして下さい" },
      });
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTitleError("");
    setPriceError("");
    setLocationError("");
    setImageError("");
    setDescriptionError("");

    // エラーのチェック
    const emptyTitle = form.title === "";
    const emptyPrice = form.price === null || form.price < 0;
    const emptyLocation = form.location === "";
    const emptyImage = form.images === "";
    const emptyDescription = form.description === "";

    if (emptyTitle) {
      setTitleError("タイトルを入力してください");
      setValidated(true);
    }
    if (emptyPrice) {
      setPriceError("0円以上を指定してください");
      setValidated(true);
    }

    if (!emptyPrice) {
      const parsedPrice = parseInt(String(form.price));
      if (isNaN(parsedPrice)) {
        setPriceError("有効な数字を入力してください");
        setValidated(true);
        return;
      }

      if (parsedPrice < 0) {
        setPriceError("0円以上を入力してください");
        setValidated(true);
        return;
      }
      setValidated(true);
    }

    if (emptyLocation) {
      setLocationError("場所を入力してください");
      setValidated(true);
    }
    if (emptyImage) {
      setImageError("URLを入力してください");
      setValidated(true);
    }
    if (emptyDescription) {
      setDescriptionError("説明を入力してください");
      setValidated(true);
    }

    const enableSubmit =
      !emptyTitle &&
      !emptyPrice &&
      !emptyLocation &&
      !emptyImage &&
      !emptyDescription;

    if (enableSubmit) {
      console.log("submit");
      console.log(form);

      const token = localStorage.getItem("token");

      if (!token) {
        // トークンがない場合、ログイン画面に遷移
        return navigate("/api/auth/login", {
          state: { message: "ログインして下さい" },
        });
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await axios
        .post(newEndPoint, form, { headers: headers })
        .then((res) => {
          console.log(res);
          setForm({
            title: "",
            price: null,
            location: "",
            images: "",
            description: "",
          });
          console.log(res.data);
          console.log("作成しました");
          setFlash(res.data.message);
          return navigate(`/api/campground/${res.data.campground._id}/detail`);
        })
        .catch((err) => {
          console.log(err);
          setFlash(err.response.data.flash);
        });
    }
  };

  const onChangeForm = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Layer>
      <div className="row">
        <h1 className="text-center mb-5">キャンプ場新規作成</h1>
        {flash && <p>{flash}</p>}
        <div className="offset-3 col-6">
          <Form
            onSubmit={onSubmit}
            noValidate
            className="validated-form"
            validated={validated}
          >
            <div className="mb-3">
              {titleError && <p>{titleError}</p>}
              <label htmlFor="title" className="form-label">
                タイトル:{" "}
              </label>
              <input
                type="text"
                id="title"
                placeholder="タイトルを入力"
                name="title"
                value={form.title}
                onChange={onChangeForm}
                className="form-control"
                required
              />
              <div className="valid-feedback">OK</div>
            </div>

            <div className="mb-3">
              {priceError && <p>{priceError}</p>}
              <div className="input-group">
                <label htmlFor="price" className="form-label">
                  価格:{" "}
                </label>
                <div className="input-group">
                  <span className="input-group-text" id="price-label">
                    ¥
                  </span>
                  <input
                    type="text"
                    id="price"
                    placeholder="価格を入力"
                    name="price"
                    // value={form.price !== null ? form.price.toString() : ""}
                    value={form.price !== null ? String(form.price) : ""}
                    onChange={onChangeForm}
                    className="form-control"
                    aria-label="価格"
                    aria-describedby="price"
                    required
                  />
                  <div className="valid-feedback">OK</div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              {locationError && <p>{locationError}</p>}
              <label htmlFor="location" className="form-label">
                場所:{" "}
              </label>
              <input
                type="text"
                id="location"
                placeholder="場所を入力"
                name="location"
                value={form.location}
                onChange={onChangeForm}
                className="form-control"
                required
              />
              <div className="valid-feedback">OK</div>
            </div>
            <div className="mb-3">
              {imageError && <p>{imageError}</p>}
              <label htmlFor="images" className="form-label">
                画像:{" "}
              </label>
              <input
                type="text"
                id="images"
                placeholder="URLを入力"
                name="images"
                value={form.images}
                onChange={onChangeForm}
                className="form-control"
                required
              />
              <div className="valid-feedback">OK</div>
            </div>
            <div className="mb-3">
              {descriptionError && <p>{descriptionError}</p>}
              <label htmlFor="desc" className="form-label">
                説明:{" "}
              </label>
              <textarea
                id="desc"
                placeholder="説明"
                name="description"
                value={form.description}
                onChange={onChangeForm}
                className="form-control"
                required
              ></textarea>
              <div className="valid-feedback">OK</div>
            </div>
            <div className="mb-3">
              <button className="btn btn-success" type="submit">
                作成
              </button>
            </div>
          </Form>
          <a className="mb-3" href="/api/campground">
            一覧に戻る
          </a>
        </div>
      </div>
    </Layer>
  );
};

export default New;
