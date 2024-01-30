import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import type Campground from "@/types/Campground";

import Layer from "@/layer/Layer";

const Show = () => {
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
      {detail ? (
        <>
          <h1>{detail.title}</h1>
          <h2>{detail.location}</h2>
          <img src={detail.images} alt={detail.title} />
          <p>
            <a href={`/api/campground/${id}/edit`}>編集する</a>
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <form action="/api/campground/*/delete">
        <button>削除する</button>
      </form>

      <p>
        <a href={`/api/campground`}>一覧へ</a>
      </p>
    </Layer>
  );
};

export default Show;
