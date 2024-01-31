import { FormEvent, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import type Campground from "@/types/Campground";

import Layer from "@/layer/Layer";

const Show = () => {
  const { id } = useParams();
  // console.log(id);
  const [detail, setDetail] = useState<Campground | null>(null);
  const backendURL = "http://localhost:3000/api/campground";
  const navigate = useNavigate();

  useEffect(() => {
    const detailCampground = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/campground/${id}/detail`,
      );
      console.log(res.data);
      setDetail(res.data);
    };
    detailCampground();
  }, [id]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.delete(`${backendURL}/${id}/delete`).then((res) => {
      console.log(res);
      return navigate("/api/campground");
    });
  };

  return (
    <Layer>
      {detail ? (
        <>
          <div className="row">
            <div className="col-6 offset-3">
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
                  <li className="list-group-item">¥{detail.price}/泊</li>
                </ul>
                <div className="card-body">
                  <a
                    className="btn btn-info"
                    href={`/api/campground/${id}/edit`}
                  >
                    編集する
                  </a>
                  <form className="d-inline" onSubmit={onSubmit}>
                    <button className="btn btn-danger">削除する</button>
                  </form>
                </div>
                <div className="card-footer text-muted">2 days ago</div>
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
