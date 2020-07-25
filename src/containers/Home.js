import React from 'react';
import { useTranslation } from 'react-i18next';

import './Home.css';


export default function Home() {
    const { t } = useTranslation();

    return(
        <div className="content">
            {t('home.content.part1')}
            <br /><br />
            {t('home.content.part2')}
            <hr />
            {t('home.content.part3')}
        </div>
    )
}