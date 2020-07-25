import React from 'react';
import {useTranslation} from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation();

    return(
        <div className="content">
            <div id="error">
                {t('notfound.content.error')}
            </div>
        </div>
    )
}