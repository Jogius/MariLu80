import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Axios from 'axios';

import './Content.css';


export default function ViewAll() {
    const {t} = useTranslation();
    const [data, setData] = useState(null);

    useEffect(() => {
        getPhotos();
    }, []);

    async function getPhotos() {
        await Axios.get('/php/getAll.php')
            .then(r => {
                setData(r.data);
            })
            .catch(e => {
                alert(e);
            });
    }

    function RenderPhotos() {
        if (data) {
            const list = data.photos.map(
                d =>
                    <div className='col3'>
                        <span>{t('general.id') + ": " + d.id}</span>
                        <span>{t('general.name') + ": " + d.name}</span>
                        <span>{t('general.nickname') + ": " + d.nickname}</span>
                        <span>{t('general.email') + ": " + d.email}</span>
                        <span>{t('general.year') + ": " + d.year}</span>
                        <span>{t('general.context') + ": " + d.context}</span>
                        <img src={'/uploads/photos/' + d.path} alt={d.path} />
                    </div>
            );
            return(
                <fieldset className='mediaset'>
                    <legend>{t('viewall.photos')}</legend>
                    {list}
                </fieldset>
            );
        } else {
            return null;
        }
    }

    function RenderVideos() {
        if (data) {
            const list = data.videos.map(
                d =>
                    <div className='col3'>
                        <span>{t('general.id') + ": " + d.id}</span>
                        <span>{t('general.name') + ": " + d.name}</span>
                        <span>{t('general.nickname') + ": " + d.nickname}</span>
                        <span>{t('general.email') + ": " + d.email}</span>
                        <span>{t('general.year') + ": " + d.year}</span>
                        <span>{t('general.context') + ": " + d.context}</span>
                        <video src={'/uploads/videos/' + d.path} />
                    </div>
            );
            return(
                <fieldset className='mediaset'>
                    <legend>{t('viewall.videos')}</legend>
                    {list}
                </fieldset>
            );
        } else {
            return null;
        }
    }

    function RenderTexts() {
        if (data) {
            const list = data.texts.map(
                d =>
                    <div className='col3'>
                        <span>{t('general.id') + ": " + d.id}</span>
                        <span>{t('general.name') + ": " + d.name}</span>
                        <span>{t('general.nickname') + ": " + d.nickname}</span>
                        <span>{t('general.email') + ": " + d.email}</span>
                        <span>{t('general.year') + ": " + d.year}</span>
                        <textarea value={d.text} />
                    </div>
            );
            return(
                <fieldset className='mediaset'>
                    <legend>{t('viewall.texts')}</legend>
                    {list}
                </fieldset>
            );
        } else {
            return null;
        }
    }

    return (
        <div className="content">
            <div className='viewall'>
                <RenderPhotos />
                <RenderVideos />
                <RenderTexts />
            </div>
        </div>
    )
}