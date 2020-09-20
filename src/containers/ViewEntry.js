import React, {useState, useEffect} from "react";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";
import Axios from "axios";

export default function SearchEntry() {
  const {t} = useTranslation();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchEntry() {
      setLoading(true);
      const formData = new FormData();
      formData.append("filetype", params.filetype);
      formData.append("filename", params.filename);
      await Axios.post("/php/getEntry.php", formData, {
        "content-type": "multipart/form-data",
      })
        .then((r) => {
          setLoading(false);
          setData(r.data);
          console.log(r.data);
        })
        .catch((e) => {
          alert(e);
          setLoading(false);
          // resetForm();
        });
    }
    fetchEntry();
  }, [params.filename, params.filetype]);

  function RenderPhoto() {
    if (data) {
      if (data.photo) {
        return (
          <fieldset className="mediaset">
            <div className="col">
              <span>{t("general.id") + ": " + data.photo[0].id}</span>
              {data.photo[0].name ? (
                <span>{t("general.name") + ": " + data.photo[0].name}</span>
              ) : null}
              {data.photo[0].nickname ? (
                <span>{t("general.nickname") + ": " + data.photo[0].nickname}</span>
              ) : null}
              {data.photo[0].email ? (
                <span>{t("general.email") + ": " + data.photo[0].email}</span>
              ) : null}
              {data.photo[0].year ? (
                <span>{t("general.year") + ": " + data.photo[0].year}</span>
              ) : null}
              {data.photo[0].context ? (
                <>
                  <span>{t("general.context") + ": "}</span>
                  <pre>{data.photo[0].context}</pre>
                </>
              ) : null}
              <a
                href={"/uploads/photos/" + data.photo[0].path}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={"/uploads/photos/" + data.photo[0].path}
                  alt={data.photo[0].path}
                />
              </a>
            </div>
          </fieldset>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  function RenderVideo() {
    if (data) {
      if (data.video) {
        return (
          <fieldset className="mediaset">
            <div className="col">
              <span>{t("general.id") + ": " + data.video[0].id}</span>
              {data.video[0].name ? (
                <span>{t("general.name") + ": " + data.video[0].name}</span>
              ) : null}
              {data.video[0].nickname ? (
                <span>{t("general.nickname") + ": " + data.video[0].nickname}</span>
              ) : null}
              {data.video[0].email ? (
                <span>{t("general.email") + ": " + data.video[0].email}</span>
              ) : null}
              {data.video[0].year ? (
                <span>{t("general.year") + ": " + data.video[0].year}</span>
              ) : null}
              {data.video[0].context ? (
                <>
                  <span>{t("general.context") + ": "}</span>
                  <pre>{data.video[0].context}</pre>
                </>
              ) : null}
              <video src={"/uploads/videos/" + data.video[0].path} controls />
            </div>
          </fieldset>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  function RenderText() {
    if (data) {
      if (data.text) {
        return (
          <fieldset className="mediaset">
            <div className="col">
              <span>{t("general.id") + ": " + data.text[0].id}</span>
              {data.text[0].name ? (
                <span>{t("general.name") + ": " + data.text[0].name}</span>
              ) : null}
              {data.text[0].nickname ? (
                <span>{t("general.nickname") + ": " + data.text[0].nickname}</span>
              ) : null}
              {data.text[0].email ? (
                <span>{t("general.email") + ": " + data.text[0].email}</span>
              ) : null}
              {data.text[0].year ? (
                <span>{t("general.year") + ": " + data.text[0].year}</span>
              ) : null}
              <textarea value={data.text[0].text} />
            </div>
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
      <div className="view">
        <RenderPhoto />
        <RenderVideo />
        <RenderText />
        <div id="loader" style={{display: loading ? "block" : "none"}} />
        {/* <button
            type="submit"
            id="submit"
            name="submit"
            style={{display: loading ? "none" : "block"}}
            onClick={() => {
              history.push(`/edit/${params.filetype}/${params.filename}`);
            }}
          >
            {t("viewentry.submit")}
          </button> */}
      </div>
    </>
  );
}
