import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import type Campground from "@/types/Campground";

import Layer from "@/layer/Layer";

const Edit = () => {
  const { id } = useParams();
  // console.log(id);

  const [detail, setDetail] = useState<Campground | null>(null);

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

  return (
    <Layer>
      <h1>編集</h1>
      {detail ? (
        <>
          <div>
            <label htmlFor="title">タイトル: </label>
            <input
              type="text"
              id="title"
              placeholder="タイトルを入力"
              value={detail.title}
            />
          </div>
          <div>
            <label htmlFor="price">価格: </label>
            <input
              type="text"
              id="price"
              placeholder="価格を入力"
              value={detail.price}
            />
            円
          </div>
          <div>
            <label htmlFor="location">場所: </label>
            <input
              type="text"
              id="location"
              placeholder="場所を入力"
              value={detail.location}
            />
          </div>
          <div>
            <label htmlFor="image">画像: </label>
            <input
              type="text"
              id="image"
              placeholder="URLを入力"
              value={detail.images}
            />
          </div>
          <div>
            <label htmlFor="desc">説明: </label>
            <textarea
              id="desc"
              placeholder="説明"
              value={detail.description}
            ></textarea>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layer>
  );
};

export default Edit;
