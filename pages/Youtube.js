/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player/youtube";
import Head from "next/head";

const Youtube = () => {
  const [data, setData] = useState([]);

  // const YOUTUBE__PLAYLIST = "PLt8NnwrNlZAQdsa7FINdm6UT6DrzoKw0L";
  const YOUTUBE__PLAYLIST = "PLt8NnwrNlZARINtZ8Y_QM942cO3nYiCRm";

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${YOUTUBE__PLAYLIST}&key=AIzaSyDQcaS38Yawh1IeRLjyDXZ-aJKSm64qyXc&maxResutls=4`
      );
      setData(res.data.items);
    };
    getData();
  }, []);

  // const Url = data.snippet.resourceId.videoId;
  // console.log(Url);
  console.log("results >>>", data);

  return (
    <div>
      <Head>
        <title>Youtube</title>
      </Head>
      <h1>hello Youtube</h1>
      <div className="youtube">
        {data.map((item) => (
          <div className="youtube__item">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`}
            />
          </div>
        ))}
      </div>

      {/* <Player url="/video.mp4"/> */}
    </div>
  );
};

export default Youtube;
