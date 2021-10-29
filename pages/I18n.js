import { useState, useEffect } from "react";
// import "flag-icon-css/css/flag-icon.min.css";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const I18n = () => {
  const language = [
    {
      code: "us",
      name: "English",
      country_code: "us",
    },
    {
      code: "uz",
      name: "Uzbek",
      country_code: "uz",
    },
  ];
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(HttpApi)
    .init({
      // debug: true,
      supportedLngs: ["en", "uz"],
      fallbackLng: "en",
      detection: {
        order: ["htmlTag", "localStorage", "cookie", "path", "subdomain"],
        caches: ["cookie", "localStorage"],
      },
      backend: {
        loadPath: "/assets/locales/{{lng}}/translation.json",
      },
      react: { useSuspense: false },
    });

  // ---------------------------
  const items = [
    { value: "Uzbek", code: "uz", name: "uzbek", id: 1 },
    { value: "english", code: "us", name: "british", id: 2 },
  ];

  const [showItem, setShowItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    setSelectedItem(items[0]);
  }, []);
  if (selectedItem.value === "Uzbek") {
    i18n.changeLanguage("uz");
  } else {
    i18n.changeLanguage("en");
  }

  const selectItem = (item) => {
    setSelectedItem(item);
    setShowItem(false);
  };
  return (
    <div className="select__box__container">
      <div className="select__box__box" onClick={() => setShowItem(!showItem)}>
        {selectedItem.value}
      </div>

      <div
        style={{ display: showItem ? "block" : "none" }}
        className={"select__box__items"}
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => selectItem(item)}
            className={selectedItem === item ? "selected" : ""}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default I18n;
