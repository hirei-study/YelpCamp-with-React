import { useEffect, useState } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";

import type Campground from "@/types/Campground";

import Layer from "@/layer/Layer";

const Campground = () => {
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
  const location = useLocation();
  type MessageState = { flash: string; type: "success" | "error" };
  const messageState = location.state as MessageState;

  useEffect(() => {
    const getCampground = async () => {
      const res = await axios.get("http://localhost:3000/api/campground");
      // console.log(res.data);
      // console.log(messageState);
      setCampgrounds(res.data);
    };
    getCampground();
  }, [messageState]);

  return (
    <Layer>
      <h1>キャンプ場一覧</h1>
      {messageState && messageState.type === "success" && (
        <p>{messageState.flash}</p>
      )}
      {campgrounds && campgrounds.length > 0 ? (
        campgrounds.map((campground, index) => (
          <div className="card mb-3" key={index}>
            <div className="row">
              <div className="col-md-4">
                <img className="img-fluid" src={campground.images} alt="demo" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card0title">{campground.title}</h5>
                  <p className="card-text">{campground.description}</p>
                  <p className="card-text">
                    <small className="text-muted">{campground.location}</small>
                  </p>
                  <p className="card-text">{campground.price}円</p>
                  <a
                    href={`/api/campground/${campground._id}/detail`}
                    className="btn btn-primary"
                  >
                    {campground.title}の詳細へ
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loding...</p>
      )}
    </Layer>
  );
};

export default Campground;
