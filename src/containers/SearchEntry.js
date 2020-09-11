import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import Axios from "axios";

export default function SearchEntry() {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [fileType, setFileType] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [searchValue, setSearchValue] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("filetype", fileType);
    formData.append("searchparam", searchParam);
    formData.append("searchvalue", searchValue);
    await Axios.post("/php/getEntries.php", formData, {
      "content-type": "multipart/form-data",
    })
      .then((r) => {
        resetForm();
        setData(r.data);
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
        // resetForm();
      });
  }

  function resetForm() {
    setFileType("photo");
    setSearchParam("");
    setSearchValue("");
    setLoading(false);
  }

  function RenderPhotos() {
    if (data) {
      if (data.photos) {
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
            <a
              href={"/uploads/photos/" + d.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={"/uploads/photos/" + d.path} alt={d.path} />
            </a>
          </div>
        ));
        return (
          <fieldset className="mediaset">
            <legend>{t("general.results")}</legend>
            {list}
          </fieldset>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  function RenderVideos() {
    if (data) {
      if (data.videos) {
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
            <legend>{t("general.results")}</legend>
            {list}
          </fieldset>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  function RenderTexts() {
    if (data) {
      if (data.texts) {
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
            <legend>{t("general.results")}</legend>
            {list}
          </fieldset>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  return (
    <>
      <form id="load" name="load" /*onSubmit={handleSubmit}*/>
        <fieldset id="all">
          <legend>{t("searchentry.form.title")}</legend>
          <fieldset id="filetype">
            <legend>{t("searchentry.form.filetype.title")}</legend>
            <select
              required
              id="selectfiletype"
              name="selectfiletype"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              <option>{t("searchentry.form.filetype.selectfiletype.none")}</option>
              <option value="photo">
                {t("searchentry.form.filetype.selectfiletype.photo")}
              </option>
              <option value="video">
                {t("searchentry.form.filetype.selectfiletype.video")}
              </option>
              <option value="text">
                {t("searchentry.form.filetype.selectfiletype.text")}
              </option>
            </select>
          </fieldset>
          {fileType === "photo" || fileType === "video" ? (
            <fieldset id="search">
              <legend>{t("searchentry.form.search.title")}</legend>
              <select
                required
                id="selectsearchparam"
                name="selectsearchparam"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
              >
                <option>{t("searchentry.form.search.searchparam.none")}</option>
                <option value="name">{t("general.name")}</option>
                <option value="nickname">{t("general.nickname")}</option>
                <option value="email">{t("general.email")}</option>
                <option value="year">{t("general.year")}</option>
                <option value="context">{t("general.context")}</option>
              </select>
              <input
                id="searchvalue"
                name="searchvalue"
                type="text"
                placeholder={t("searchentry.form.search.placeholder.searchvalue")}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </fieldset>
          ) : (
            ""
          )}
          {fileType === "text" ? (
            <fieldset id="search">
              <legend>{t("searchentry.form.search.title")}</legend>
              <select
                required
                id="selectsearchparam"
                name="selectsearchparam"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
              >
                <option>{t("searchentry.form.search.searchparam.none")}</option>
                <option value="name">{t("general.name")}</option>
                <option value="nickname">{t("general.nickname")}</option>
                <option value="email">{t("general.email")}</option>
                <option value="year">{t("general.year")}</option>
                <option value="text">{t("general.text")}</option>
              </select>
              <input
                required
                id="searchvalue"
                name="searchvalue"
                type="text"
                placeholder={t("searchentry.form.search.placeholder.searchvalue")}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </fieldset>
          ) : (
            ""
          )}
          <div>
            <div id="loader" style={{display: loading ? "block" : "none"}} />
            <button
              type="submit"
              id="submit"
              name="submit"
              style={{display: loading ? "none" : "block"}}
              onClick={handleSubmit}
            >
              {t("searchentry.form.submit")}
            </button>
          </div>
        </fieldset>
      </form>
      <div className="view">
        <RenderPhotos />
        <RenderVideos />
        <RenderTexts />
      </div>
    </>
  );
}
