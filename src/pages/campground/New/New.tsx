import { ChangeEvent, FC, FormEvent, useState } from "react";

import axios from "axios";

import Layer from "@/layer/Layer";

const New: FC = () => {
  // const [title, setTitle] = useState("");
  // const [price, setPrice] = useState<number | null>(null);
  // const [location, setLocation] = useState("");
  // const [image, setImage] = useState("");
  // const [description, setDescription] = useState("");

  const [form, setForm] = useState({
    title: "",
    price: null,
    location: "",
    image: "",
    description: "",
  });

  const [titleError, setTitleError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [imageError, setImageError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const newEndPoint = "http://localhost:3000/api/campground/new";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTitleError("");
    setPriceError("");
    setLocationError("");
    setImageError("");
    setDescriptionError("");

    // const formData = {
    //   title: title,
    //   price: price,
    //   location: location,
    //   image: image,
    //   description: description,
    // };

    // エラーのチェック
    const emptyTitle = form.title === "";
    const emptyPrice = form.price === null || form.price < 0;
    const emptyLocation = form.location === "";
    const emptyImage = form.image === "";
    const emptyDescription = form.description === "";

    if (emptyTitle) {
      setTitleError("タイトルを入力してください");
    }
    if (emptyPrice) {
      setPriceError("0円以上を指定してください");
    }

    if (!emptyPrice) {
      const parsedPrice = parseInt(String(form.price));
      if (isNaN(parsedPrice)) {
        setPriceError("有効な数字を入力してください");
        return;
      }

      if (parsedPrice < 0) {
        setPriceError("0円以上を入力してください");
        return;
      }
    }

    if (emptyLocation) {
      setLocationError("場所を入力してください");
    }
    if (emptyImage) {
      setImageError("URlを入力してください");
    }
    if (emptyDescription) {
      setDescriptionError("説明を入力してください");
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

      axios
        .post(newEndPoint, form)
        .then((res) => {
          console.log(res);
          setForm({
            title: "",
            price: null,
            location: "",
            image: "",
            description: "",
          });
          console.log("作成しました");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onChangeForm = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  // };

  // const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = e.target.value;

  //   if (typeof inputValue !== "number" && !/^\d*$/.test(inputValue)) {
  //     console.log("数字を入力してください");
  //     return <p>数字を入力してください</p>;
  //   }
  //   const priceValue = inputValue === "" ? null : parseInt(inputValue);
  //   setPrice(priceValue);
  // };

  // const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
  //   setLocation(e.target.value);
  // };

  // const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
  //   setImage(e.target.value);
  // };

  // const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setDescription(e.target.value);
  // };

  return (
    <Layer>
      <div className="row">
        <h1 className="text-center mb-5">キャンプ場新規作成</h1>
        <div className="offset-3 col-6">
          <form onSubmit={onSubmit}>
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
              />
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
                  />
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
              />
            </div>
            <div className="mb-3">
              {imageError && <p>{imageError}</p>}
              <label htmlFor="image" className="form-label">
                画像:{" "}
              </label>
              <input
                type="text"
                id="image"
                placeholder="URLを入力"
                name="image"
                value={form.image}
                onChange={onChangeForm}
                className="form-control"
              />
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
              ></textarea>
            </div>
            <div className="mb-3">
              <button className="btn btn-success" type="submit">
                作成
              </button>
            </div>
          </form>
          <a className="mb-3" href="/api/campground">
            一覧に戻る
          </a>
        </div>
      </div>
    </Layer>
  );
};

export default New;
