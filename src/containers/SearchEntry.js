import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import Axios from 'axios';

import './Content.css';



export default function SearchEntry() {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [ids, setIds] = useState(null);

    const [fileType, setFileType] = useState('');
    const [searchParam, setSearchParam] = useState('');
    const [searchValue, setSearchValue] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('filetype', fileType);
        formData.append('searchparam', searchParam);
        formData.append('searchvalue', searchValue);
        await Axios.post('/php/getIds.php', formData, {'content-type': 'multipart/form-data'})
            .then(r => {
                resetForm();
                setIds(r.data.ids);
            })
            .catch(e => {
                resetForm();
            });
    }

    function resetForm() {
        setFileType('photo');
        setSearchParam('');
        setSearchValue('');
        setLoading(false);
    }

    function RenderIdList() {
        if (ids) {
            let idList;
            switch (fileType) {
                case 'photo':
                    idList = ids.map(d => <li key={d.id}>{t('general.id') + ": " + d.id}</li>);
                    return(
                        <ul>
                            {idList}
                        </ul>
                    );
                case 'video':
                    idList = ids.map(d => <li key={d.id}>{t('general.id') + ": " + d.id}</li>);
                        return(
                            <ul>
                                {idList}
                            </ul>
                        );
                case 'text':
                    idList = ids.map(d => <li key={d.id}>{t('general.id') + ": " + d.id}</li>);
                    return(
                        <ul>
                            {idList}
                        </ul>
                    );
                default:
                    return null;
            }
        } else {
            return null;
        }
    }

    return (
        <div className="content">
            <form id="load" name="load" onSubmit={handleSubmit}>
                <fieldset id="all">
                    <legend>{t('searchentry.form.title')}</legend>
                    <fieldset id="filetype">
                        <legend>{t('searchentry.form.filetype.title')}</legend>
                        <select required id="selectfiletype" name="selectfiletype" value={fileType} onChange={e => setFileType(e.target.value)}>
                            <option>{t('searchentry.form.filetype.selectfiletype.none')}</option>
                            <option value="photo">{t('searchentry.form.filetype.selectfiletype.photo')}</option>
                            <option value="video">{t('searchentry.form.filetype.selectfiletype.video')}</option>
                            <option value="text">{t('searchentry.form.filetype.selectfiletype.text')}</option>
                        </select>
                    </fieldset>
                    {
                        fileType === 'photo' || fileType === 'video'
                            ? <fieldset id="search">
                                <legend>{t('searchentry.form.search.title')}</legend>
                                <select required id="selectsearchparam" name="selectsearchparam" value={searchParam} onChange={e => setSearchParam(e.target.value)}>
                                    <option>{t('searchentry.form.search.searchparam.none')}</option>
                                    <option value="name">{t('general.name')}</option>
                                    <option value="nickname">{t('general.nickname')}</option>
                                    <option value="email">{t('general.email')}</option>
                                    <option value="year">{t('general.year')}</option>
                                    <option value="context">{t('general.context')}</option>
                                </select>
                                <input id="searchvalue" name="searchvalue" type="text" placeholder={t('searchentry.form.search.placeholder.searchvalue')} value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                            </fieldset>
                            : ''
                    }
                    {
                        fileType === 'text'
                            ? <fieldset id="search">
                                <legend>{t('searchentry.form.search.title')}</legend>
                                <select required id="selectsearchparam" name="selectsearchparam" value={searchParam} onChange={e => setSearchParam(e.target.value)}>
                                    <option>{t('searchentry.form.search.searchparam.none')}</option>
                                    <option value="name">{t('general.name')}</option>
                                    <option value="nickname">{t('general.nickname')}</option>
                                    <option value="email">{t('general.email')}</option>
                                    <option value="year">{t('general.year')}</option>
                                    <option value="text">{t('general.text')}</option>
                                </select>
                                <input required id="searchvalue" name="searchvalue" type="text" placeholder={t('searchentry.form.search.placeholder.searchvalue')} value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                            </fieldset>
                            : ''
                    }
                    <div>
                        <div id="loader" style={{display: loading ? 'block' : 'none'}}/>
                        <button type="submit" id="submit" name="submit"
                                style={{display: loading ? 'none' : 'block'}}>{t('searchentry.form.submit')}</button>
                    </div>
                </fieldset>
            </form>
            <RenderIdList />
        </div>
    )
}