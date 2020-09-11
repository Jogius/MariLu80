import React from "react";
import {useTranslation} from "react-i18next";

import "./NotFound.css";

export default function NotFound() {
  const {t} = useTranslation();

  return (
    <>
      <div class="error">{t("notfound.content.error")}</div>
    </>
  );
}
