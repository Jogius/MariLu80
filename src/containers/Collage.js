import React, {useEffect, useState} from "react";
import Axios from "axios";

import "./Collage.css";

export default function ViewAll() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPhotos();
  }, []);

  async function getPhotos() {
    await Axios.get("/php/getAllPhotos.php")
      .then((r) => {
        setData(r.data);
      })
      .catch((e) => {
        alert(e);
      });
  }

  function RenderPhotos() {
    if (data) {
      const list = data.photos.map((d) => (
        <a href={"/uploads/photos/" + d.path} target="_blank" rel="noopener noreferrer">
          <img src={"/uploads/photos/" + d.path} alt={d.path} />
        </a>
      ));
      return <div className="collage">{list}</div>;
    } else {
      return null;
    }
  }

  return (
    <>
      <RenderPhotos />
    </>
  );
}
