import React from 'react';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import './App.css';
import Routes from "./Routes";

export default function App() {
    const { t, i18n } = useTranslation();
    const history = useHistory();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    }

    return (
            <div className="App">
                <div className="header">
                    <div className="title">{t('header.title')}</div>
                </div>
                <div className="body">
                    <Routes />
                    <div className="nav">
                        <ul>
                            <li><button onClick={() => { history.push("/") }}>Home</button></li>
                            <li><button onClick={() => { history.push("/uploadphoto") }}>{t('body.nav.uploadphoto')}</button></li>
                            <li><button onClick={() => { history.push("/uploadvideo") }}>{t('body.nav.uploadvideo')}</button></li>
                            <li><button onClick={() => { history.push("/uploadtext") }}>{t('body.nav.uploadtext')}</button></li>
                            <li><button onClick={() => { history.push("/searchentry") }}>{t('body.nav.searchentry')}</button></li>
                            <li><button onClick={() => { history.push("/viewall") }}>{t('body.nav.viewall')}</button></li>
                            <li><button className="langselector" onClick={() => changeLanguage('de')}>Deutsch</button></li>
                            <li><button className="langselector" onClick={() => changeLanguage('en')}>English</button></li>
                            <li><button className="langselector" onClick={() => changeLanguage('es')}>Español</button></li>
                        </ul>
                    </div>
                </div>
                <div className="footer">
                    <ul>
                        <li><a href='mailto:julius@themakowskis.de?cc=viktor@themakowskis.de?subject=MariLu80%20Website'>{t('footer.contactus')}</a></li>
                    </ul>
                </div>
            </div>
    );
}
