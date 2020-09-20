import React from "react";
import {useHistory, withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";

import "./App.css";
import "./containers/Content.css";
import Routes from "./Routes";

function App() {
  const {t, i18n} = useTranslation();
  const history = useHistory();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <div
        className="header"
        style={history.location.pathname === "/diashow" ? {display: "none"} : {}}
      >
        <div className="title">{t("header.title")}</div>
      </div>
      <div
        className="body"
        style={history.location.pathname === "/diashow" ? {height: "100vh"} : {}}
      >
        <div
          className="content"
          style={history.location.pathname === "/diashow" ? {padding: "0"} : {}}
        >
          <Routes />
        </div>
        <div
          className="nav"
          style={history.location.pathname === "/diashow" ? {display: "none"} : {}}
        >
          <ul>
            <li>
              <button
                onClick={() => {
                  history.push("/");
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/uploadphoto");
                }}
              >
                {t("body.nav.uploadphoto")}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/uploadvideo");
                }}
              >
                {t("body.nav.uploadvideo")}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/uploadtext");
                }}
              >
                {t("body.nav.uploadtext")}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/searchentry");
                }}
              >
                {t("body.nav.searchentry")}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/viewall");
                }}
              >
                {t("body.nav.viewall")}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/collage");
                }}
              >
                {t("body.nav.collage")}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/diashow");
                }}
              >
                {t("body.nav.diashow")}
              </button>
            </li>
            <li>
              <button className="langselector" onClick={() => changeLanguage("de")}>
                Deutsch
              </button>
            </li>
            <li>
              <button className="langselector" onClick={() => changeLanguage("en")}>
                English
              </button>
            </li>
            <li>
              <button className="langselector" onClick={() => changeLanguage("es")}>
                Español
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="footer"
        style={history.location.pathname === "/diashow" ? {display: "none"} : {}}
      >
        <ul>
          <li>
            <a href="mailto:julius@themakowskis.de?cc=viktor@themakowskis.de?subject=MariLu80%20Website">
              {t("footer.contactus")}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(App);
