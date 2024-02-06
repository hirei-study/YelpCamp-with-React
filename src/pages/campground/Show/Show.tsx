import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import axios from "axios";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import type Campground from "@/types/Campground";

import Layer from "@/layer/Layer";

const Show = () => {
  console.log("レンダリング");
  const { id } = useParams();
  // console.log(id);
  const [detail, setDetail] = useState<Campground | null>(null);
  const [review, setReview] = useState({
    body: "",
    rating: 1,
  });

  const [validated, setValidated] = useState(false);

  const [bodyError, setBodyError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const backendURL = "http://localhost:3000/api/campground";
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getCampgroundDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/campground/${id}/detail`,
      );
      console.log(res.data);
      setDetail(res.data);
    } catch (error) {
      console.log("データ取得に失敗しました: ", error);
    }
  };

  useEffect(() => {
    getCampgroundDetail();
  }, []);

  const onSubmitReviewDelete = async (
    e: FormEvent<HTMLFormElement>,
    reviewId: string,
  ) => {
    e.preventDefault();

    try {
      await axios.delete(`${backendURL}/${id}/reviews/${reviewId}`);

      getCampgroundDetail();
    } catch (error) {
      console.log("レビューの削除に失敗しました: ", error);
    }
  };

  const onSubmitDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.delete(`${backendURL}/${id}/delete`).then((res) => {
      console.log(res);
      navigate("/api/campground");
    });
  };

  const onSubmitReviewPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBodyError("");
    setRatingError("");
    setValidated(false);

    const emptyBody = review.body === "";
    const emptyRating = review.rating === null || review.rating < 0;

    if (emptyBody) {
      setBodyError("内容を書いてください");
      setValidated(true);
    }

    if (emptyRating) {
      setRatingError("評価をつけてください");
      setValidated(true);
    }

    if (!emptyRating) {
      const parsedRating = parseInt(String(review.rating));
      if (isNaN(parsedRating)) {
        setRatingError("有効な数字を入力してください");
        setValidated(true);
        return;
      }

      if (parsedRating < 0) {
        setRatingError("0円以上を入力してください");
        setValidated(true);
        return;
      }
    }

    const enableSubmit = !emptyBody && !emptyRating;

    if (enableSubmit) {
      console.log(review);

      await axios
        .post(`${backendURL}/${id}/reviews`, review)
        .then((res) => {
          // console.log(res)
          setReview({
            body: "",
            rating: 1,
          });
          console.log(res.data);
          navigate(`/api/campground/${id}/detail`);
          getCampgroundDetail();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const onChangeReviewPost = (
  //   e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  // ) => {
  //   setReview({ ...review, [e.target.name]: e.target.value });
  // };

  const onChangeReviewPost = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReview((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layer>
      {detail ? (
        <>
          <div className="row">
            <div className="col-6">
              <div className="card mb-3">
                <img
                  src={detail.images}
                  alt={detail.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{detail.title}</h5>
                  <p className="card-text">{detail.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-muted">
                    {detail.location}
                  </li>
                  {detail.author && detail.author.length > 0 && (
                    <li className="list-group-item">
                      氏名: {detail.author[0]?.username}
                    </li>
                  )}
                  <li className="list-group-item">¥{detail.price}/泊</li>
                </ul>
                <div className="card-body">
                  {token && (
                    <a
                      className="btn btn-info"
                      href={`/api/campground/${id}/edit`}
                    >
                      編集する
                    </a>
                  )}

                  <form className="d-inline" onSubmit={onSubmitDelete}>
                    {token && (
                      <button className="btn btn-danger">削除する</button>
                    )}
                  </form>
                </div>
                <div className="card-footer text-muted">2 days ago</div>
              </div>
            </div>
            <div className="col-6">
              <h2>レビュー</h2>
              <Form
                onSubmit={onSubmitReviewPost}
                noValidate
                className="validated-form mb-3"
                validated={validated}
              >
                <div className="mb-3">
                  {ratingError && <p>{ratingError}</p>}
                  <label className="form-label" htmlFor="body">
                    評価
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    // defaultValue={(review.rating = 1)}
                    name="rating"
                    id="rating"
                    value={review.rating !== null ? String(review.rating) : ""}
                    onChange={onChangeReviewPost}
                    className="form-range"
                    required
                  />
                </div>
                <div className="mb-3">
                  {bodyError && <p>{bodyError}</p>}
                  <textarea
                    className="form-control"
                    name="body"
                    id="body"
                    value={review.body}
                    onChange={onChangeReviewPost}
                    cols={30}
                    rows={5}
                    required
                  ></textarea>
                </div>
                {token && <button className="btn btn-success">投稿</button>}
              </Form>
              <div>
                {detail.reviews.map(
                  (review: { body: string; rating: number; _id: string }) => (
                    <div className="card mb-3" key={review._id}>
                      <div className="card-body">
                        <h5 className="card-title">評価: {review.rating}</h5>
                        <p className="card-text">コメント: {review.body}</p>
                        <Form
                          onSubmit={(e) => onSubmitReviewDelete(e, review._id)}
                          noValidate
                          className="validated-form mb-3"
                          validated={validated}
                        >
                          <button className="btn btn-sm btn-danger">
                            削除
                          </button>
                        </Form>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layer>
  );
};

export default Show;
