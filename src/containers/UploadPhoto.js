import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Axios from 'axios';

import './Content.css';


export default function UploadPhoto() {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);

    const [isPublic, setIsPublic] = useState(false);
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState('');
    const [year, setYear] = useState('');
    const [context, setContext] = useState('');

    const [displayFile, setDisplayFile] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('public', isPublic ? '1' : '0');
        formData.append('name', name);
        formData.append('nickname', nickname);
        formData.append('email', email);
        formData.append('file', file);
        formData.append('year', year);
        formData.append('context', context);
        await Axios.post('/php/uploadPhoto.php', formData, {'content-type': 'multipart/form-data'})
            .then(r => {
                resetForm();
                alert(r.data.message + "You can find your entry under ID: " + r.data.id);
            })
            .catch(e => {
                resetForm();
            });
    }

    function resetForm() {
        setIsPublic(false);
        setName('');
        setNickname('');
        setEmail('');
        setFile('');
        setYear('');
        setContext('');
        setDisplayFile('');
        setLoading(false);
    }

    function fileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type === 'dragover' ? 'hover' : '');
    }

    function handleFileChange(e) {
        fileDragHover(e);
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
            setDisplayFile(this.result)
        };
        if (e.type === 'drop') {
            fileReader.readAsDataURL(e.dataTransfer.files[0]);
            setFile(e.dataTransfer.files[0]);
        } else if (e.type === 'change') {
            fileReader.readAsDataURL(e.target.files[0]);
            setFile(e.target.files[0]);
        }

    }


    return (
        <div className="content">
            <form id="upload" name="upload" onSubmit={handleSubmit}>
                <fieldset id="all">
                    <legend>{t('uploadphoto.form.title')}</legend>
                    <div>
                        <fieldset id="submitter">
                            <legend>{t('general.submitter.title')}</legend>
                            <input id="name" name="name" type="text"
                                   placeholder={t('general.name')} maxLength="255"
                                   value={name} onChange={e => setName(e.target.value)}/>
                            <input id="nickname" name="nickname" type="text"
                                   placeholder={t('general.nickname')} maxLength="255"
                                   value={nickname} onChange={e => setNickname(e.target.value)}/>
                            <input id="email" name="email" type="email"
                                   placeholder={t('general.email')} maxLength="254"
                                   value={email} onChange={e => setEmail(e.target.value)}/>
                        </fieldset>
                        <fieldset id="photo">
                            <legend>{t('uploadphoto.form.photo.title')}</legend>
                            <div>
                                <label htmlFor="ispublic">{t('general.public?')}</label>
                                <input style={{width: "auto", margin: "10px"}} id="ispublic" name="ispublic" type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
                            </div>
                            <input required id="file" name="file" type="file" onChange={handleFileChange}
                                   accept="image/*"/>
                            <label id="filedrag" htmlFor="file" onDragOver={fileDragHover} onDragLeave={fileDragHover}
                                   onDrop={handleFileChange}>{t('uploadphoto.form.photo.placeholder.filedrag')}</label>
                            <div className="filename">{file.name || t('uploadphoto.form.photo.nofilename')}</div>
                            <img id="selectedfile" src={displayFile} alt=""/>
                        </fieldset>
                        <fieldset id="photo-info">
                            <legend>{t('uploadphoto.form.photo-info.title')}</legend>
                            <input id="year" name="year" type="number"
                                   placeholder={t('general.year')} maxLength="4"
                                   value={year} onChange={e => setYear(e.target.value)}/>
                            <textarea id="context" name="context"
                                      placeholder={t('uploadphoto.form.photo-info.placeholder.context')}
                                      maxLength="65534" value={context} onChange={e => setContext(e.target.value)}/>
                        </fieldset>
                        <div id="loader" style={{display: loading ? 'block' : 'none'}}/>
                        <button type="submit" id="submit" name="submit"
                                style={{display: loading ? 'none' : 'block'}}>{t('general.submit')}</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}