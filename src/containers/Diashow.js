import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Axios from "axios";

import "./Diashow.css";

export default function Diashow() {
  const [data, setData] = useState(null);
  const {t} = useTranslation();

  const [reRender, setReRender] = useState(false);
  const [stop, setStop] = useState(false);
  const [myInterval, setMyInterval] = useState();
  const [i, setI] = useState(0);

  useEffect(() => {
    getMedia();
  }, []);

  function incrementI() {
    setMyInterval(
      setInterval(() => {
        setI((prevI) => (prevI < 0 ? 0 : prevI + 1));
      }, 5000)
    );
  }

  async function getMedia() {
    await Axios.get("/php/getAll.php")
      .then((r) => {
        setData(r.data);
        incrementI();
      })
      .catch((e) => {
        alert(e);
      });
  }

  function RenderDiashow() {
    if (data) {
      const list = data.photos.map((d) => (
        <div className="col">
          <a
            href={"/entry/photo/" + d.path}
            target="_blank"
            rel="noopener noreferrer"
            id="image"
          >
            <img src={"/uploads/photos/" + d.path} alt={d.path} />
          </a>
          {d.name ? <span id="name">{t("general.name") + ": " + d.name}</span> : null}
          {d.nickname ? (
            <span id="nickname">{t("general.nickname") + ": " + d.nickname}</span>
          ) : null}
          {d.year ? <span id="year">{t("general.year") + ": " + d.year}</span> : null}
          {d.context ? (
            <>
              {/* <span id="context">{t("general.context") + ": "}</span> */}
              <pre id="context-pre">{d.context}</pre>
            </>
          ) : null}
        </div>
      ));
      return (
        <>
          <div>{list[i]}</div>
          <div style={{display: "none"}}>{list[i + 1]}</div>
        </>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="diashow">
        {reRender ? setReRender(false) : <RenderDiashow />}
        <div className="controls">
          <button
            id="backwards"
            onClick={() => {
              setI((prevI) => prevI - 1);
              setReRender(true);
            }}
          >
            ⟵
          </button>
          <button
            onClick={() => {
              if (stop) {
                setStop(false);
                incrementI();
              } else {
                setStop(true);
                clearInterval(myInterval);
              }
            }}
            style={stop ? {backgroundColor: "#ff0000"} : {backgroundColor: "#00ff00"}}
          >
            {stop ? "Start" : "Stop"}
          </button>
          <button
            id="forwards"
            onClick={() => {
              setI((prevI) => prevI + 1);
              setReRender(true);
            }}
          >
            ⟶
          </button>
          {/* <input
          type="number"
          onChange={(e) => setTime(e.target.value * 1000)}
          value={time / 1000}
          placeholder="Zeit in Sekunden"
        /> */}
        </div>
      </div>
    </>
  );
}
