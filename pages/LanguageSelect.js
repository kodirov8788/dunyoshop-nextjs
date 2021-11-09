/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
const Languages = ["uz", "en"];
import { useRouter } from "next/router";

function LanguageSelect() {
  const router = useRouter();
  const [lang, setLang] = useState("uz");
  const [langImg, setLangImg] = useState(
    "https://cdn-icons-png.flaticon.com/512/206/206662.png"
  );

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
      id: 2,
      languageImage: "https://cdn-icons-png.flaticon.com/512/206/206662.png",
      title: "O'zbek",
      languageCode: "uz",
    },
  ];

  useEffect(() => {
    const locale = lang;
    console.log("useEffect value", lang);
    router.push(router.pathname, router.asPath, { locale });
  }, [lang]);

  const [status, setStatus] = useState(false);

  return (
    <div className="profile__headerLanguage">
      <div
        className="language__taskAdderSelect"
        onMouseEnter={() => setStatus(true)}
        onMouseLeave={() => setStatus(false)}
      >
        <p>{lang}</p>
        <img src={langImg} alt={langImg} />
        <div
          className={
            status ? "language__taskAdderStatus" : "language__taskHide__status"
          }
        >
          {language_items.map((item) => (
            <div
              href="/"
              className="language__status"
              onMouseEnter={() => setStatus(true)}
              onMouseLeave={() => setStatus(false)}
              onClick={() =>
                setLang(item.languageCode) + setLangImg(item.languageImage)
              }
              key={item.id}
              value={item.id}
            >
              <img src={item.languageImage} alt={item.languageImage} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanguageSelect;
