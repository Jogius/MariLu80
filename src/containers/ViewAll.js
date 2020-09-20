import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Axios from "axios";

export default function ViewAll() {
  const {t} = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    getMedia();
  }, []);

  async function getMedia() {
    await Axios.get("/php/getAll.php")
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
        <div className="col">
          <span>{t("general.id") + ": " + d.id}</span>
          {d.name ? <span>{t("general.name") + ": " + d.name}</span> : null}
          {d.nickname ? <span>{t("general.nickname") + ": " + d.nickname}</span> : null}
          {d.email ? <span>{t("general.email") + ": " + d.email}</span> : null}
          {d.year ? <span>{t("general.year") + ": " + d.year}</span> : null}
          {d.context ? (
            <>
              <span>{t("general.context") + ": "}</span>
              <pre>{d.context}</pre>
            </>
          ) : null}
          <a href={"/entry/photo/" + d.path} target="_blank" rel="noopener noreferrer">
            <img src={"/uploads/photos/" + d.path} alt={d.path} />
          </a>
        </div>
      ));
      return (
        <fieldset className="mediaset">
          <legend>{t("viewall.photos")}</legend>
          {list}
        </fieldset>
      );
    } else {
      return null;
    }
  }

  function RenderVideos() {
    if (data) {
      const list = data.videos.map((d) => (
        <div className="col">
          <span>{t("general.id") + ": " + d.id}</span>
          {d.name ? <span>{t("general.name") + ": " + d.name}</span> : null}
          {d.nickname ? <span>{t("general.nickname") + ": " + d.nickname}</span> : null}
          {d.email ? <span>{t("general.email") + ": " + d.email}</span> : null}
          {d.year ? <span>{t("general.year") + ": " + d.year}</span> : null}
          {d.context ? (
            <>
              <span>{t("general.context") + ": "}</span>
              <pre>{d.context}</pre>
            </>
          ) : null}
          <video src={"/uploads/videos/" + d.path} controls />
        </div>
      ));
      return (
        <fieldset className="mediaset">
          <legend>{t("viewall.videos")}</legend>
          {list}
        </fieldset>
      );
    } else {
      return null;
    }
  }

  function RenderTexts() {
    if (data) {
      const list = data.texts.map((d) => (
        <div className="col">
          <span>{t("general.id") + ": " + d.id}</span>
          {d.name ? <span>{t("general.name") + ": " + d.name}</span> : null}
          {d.nickname ? <span>{t("general.nickname") + ": " + d.nickname}</span> : null}
          {d.email ? <span>{t("general.email") + ": " + d.email}</span> : null}
          {d.year ? <span>{t("general.year") + ": " + d.year}</span> : null}
          <textarea value={d.text} />
        </div>
      ));
      return (
        <fieldset className="mediaset">
          <legend>{t("viewall.texts")}</legend>
          {list}
        </fieldset>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="view">
        <RenderPhotos />
        <RenderVideos />
        <RenderTexts />
      </div>
    </>
  );
}
