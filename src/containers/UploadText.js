import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import Axios from "axios";

export default function UploadText() {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);

  const [isPublic, setIsPublic] = useState(true);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [year, setYear] = useState("");

  const [file, setFile] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("public", isPublic ? "1" : "0");
    formData.append("name", name);
    formData.append("nickname", nickname);
    formData.append("email", email);
    formData.append("text", text);
    formData.append("year", year);
    await Axios.post("/php/uploadText.php", formData, {
      "content-type": "multipart/form-data",
    })
      .then((r) => {
        resetForm();
        alert(r.data.message + "You can find your entry under the ID: " + r.data.id);
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
        // resetForm();
      });
  }

  function resetForm() {
    setIsPublic(true);
    // setName('');
    //setNickname('');
    //setEmail('');
    setText("");
    setYear("");
    setFile("");
    setLoading(false);
  }

  function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = e.type === "dragover" ? "hover" : "";
  }

  function handleFileChange(e) {
    fileDragHover(e);

    let fileReader = new FileReader();
    fileReader.onload = function (e) {
      setText(this.result);
    };
    if (e.type === "drop") {
      fileReader.readAsText(e.dataTransfer.files[0]);
      setFile(e.dataTransfer.files[0]);
    } else if (e.type === "change") {
      fileReader.readAsText(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  }

  return (
    <>
      <form id="upload" name="upload" /*onSubmit={handleSubmit}*/>
        <fieldset id="all">
          <legend>{t("uploadtext.form.title")}</legend>
          <div>
            <fieldset id="submitter">
              <legend>{t("general.submitter.title")}</legend>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t("general.name")}
                maxLength="255"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder={t("general.nickname")}
                maxLength="255"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t("general.email")}
                maxLength="254"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset id="text">
              <legend>{t("uploadtext.form.text.title")}</legend>
              <div>
                <label htmlFor="ispublic">{t("general.public?")}</label>
                <input
                  id="ispublic"
                  name="ispublic"
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              </div>
              <input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
                accept="text/*"
              />
              <label
                id="filedrag"
                htmlFor="file"
                onDragOver={fileDragHover}
                onDragLeave={fileDragHover}
                onDrop={handleFileChange}
              >
                {t("uploadtext.form.text.placeholder.filedrag")}
              </label>
              <div className="filename">
                {file.name || t("uploadtext.form.text.nofilename")}
              </div>
              <textarea
                id="textfield"
                name="textfield"
                placeholder={t("uploadtext.form.text.placeholder.text")}
                maxLength="65534"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </fieldset>
            <fieldset id="text-info">
              <legend>{t("uploadtext.form.text-info.title")}</legend>
              <input
                id="year"
                name="year"
                type="number"
                placeholder={t("general.year")}
                maxLength="4"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </fieldset>
            <div id="loader" style={{display: loading ? "block" : "none"}} />
            <button
              type="submit"
              id="submit"
              name="submit"
              style={{display: loading ? "none" : "block"}}
              onClick={handleSubmit}
            >
              {t("general.submit")}
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
