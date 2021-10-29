import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { language_items } from "../../static/static_data";
// import "./LanguageSelect.css";

function LanguageSelect() {
  const [languagePersist, setLanguagePersist] = useState("");
  const [languageSelectActive, setLanguageSelectActive] = useState(false);
  const [language, setLanguage] = useState(null);
  const { t, i18n } = useTranslation();
  const language_items = [
    {
      id: 0,
      languageImage: "https://cdn-icons-png.flaticon.com/512/206/206626.png",
      title: "English",
      languageCode: "en",
    },
    // {
    //   id: 1,
    //   languageImage: "https://cdn-icons-png.flaticon.com/512/206/206604.png",
    //   title: "Russian",
    //   languageCode: "ru",
    // },
    {
      id: 1,
      languageImage: "https://cdn-icons-png.flaticon.com/512/206/206662.png",
      title: "O'zbek",
      languageCode: "uz",
    },
  ];
  useEffect(() => {
    setLanguagePersist(
      language_items.find(
        (lan) => lan.languageCode === localStorage.getItem("lang")
      )
    );
  }, [language]);
  const changeLanguage = (languageDetail) => {
    setLanguage(languageDetail);
    i18n.changeLanguage(languageDetail.languageCode || "uz");
  };
  return (
    <div
      className="profile__headerLanguage"
      onClick={() => setLanguageSelectActive(!languageSelectActive)}
    >
      {languagePersist ? (
        <>
          {" "}
          <img src={languagePersist.languageImage} alt="" />{" "}
          <p>{languagePersist.title}</p>
        </>
      ) : (
        <p className="profile__headerDefault">Select Language</p>
      )}
      {languageSelectActive && (
        <ul className="language__collection dark">
          {language_items?.map((languageItem) => (
            <li
              key={languageItem.id}
              className="language__item dark darkshadow"
              onClick={() =>
                changeLanguage({
                  languageImage: languageItem.languageImage,
                  languageReferance: languageItem.title,
                  languageCode: languageItem.languageCode,
                })
              }
            >
              <img src={languageItem.languageImage} alt={languageItem.title} />
              <p>{languageItem.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSelect;
