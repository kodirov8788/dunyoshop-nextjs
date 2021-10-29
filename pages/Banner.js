import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Image from "next/image";
function Banner() {
  const BANNER_DATA = [
    {
      id: 0,
      imageURL: "/essets/1.jpg",
      imageDesc: "Shop and Toys",
    },
    {
      id: 1,
      imageURL: "/essets/2.jpg",
      imageDesc: "savdo",
    },
    {
      id: 2,
      imageURL: "/essets/3.jpg",
      imageDesc: "technology",
    },
  ];

  const [imageIndex, SetImageIndex] = useState(0);

  useEffect(() => {
    const lastIndex = BANNER_DATA.length - 1;
    if (imageIndex < 0) {
      SetImageIndex(lastIndex);
    }
    if (imageIndex > lastIndex) {
      SetImageIndex(0);
    }
  }, [imageIndex]);

  useEffect(() => {
    let slider = setInterval(() => {
      SetImageIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(slider);
  }, []);

  return (
    <div className="banner">
      <div
        className="banner_leftIcon"
        onClick={() => SetImageIndex((prev) => prev - 1)}
      >
        <FiChevronLeft />
      </div>
      {/* <img className={classes.banner__image} src={BANNER_DATA[imageIndex]?.imageURL} alt={BANNER_DATA[imageIndex]?.imageDesc} /> */}
      <div
        style={{
          transform: `translate(-${imageIndex * (100 / BANNER_DATA.length)}%)`,
        }}
        className="banner__imageContainer"
      >
        {BANNER_DATA.map((img, ind) => (
          <div key={ind} className="banner__imageContainerItem">
            <Image
              className="banner__image"
              src={img.imageURL}
              alt={img.imageDesc}
              width={1400}
              height={600}
            />
          </div>
        ))}
      </div>
      <div
        className="banner_rightIcon"
        onClick={() => SetImageIndex((prev) => prev + 1)}
      >
        <FiChevronRight />
      </div>
    </div>
  );
}

export default Banner;
