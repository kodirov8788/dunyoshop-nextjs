/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
// import { addToCart } from "../../store/Actions";
import axios from "axios";
import ReactPlayer from "react-player";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Videos = () => {
  const { state, dispatch } = useContext(DataContext);
  const YOUTUBE__API__KEY = process.env.YOUTUBE__API__KEY;

  const { cart, auth, orders } = state;
  const router = useRouter();

  // const [product] = useState(props.product);
  const [tab, setTab] = useState(0);
  const [buy, setBuy] = useState("false");
  const [videos, setVideos] = useState("");

  // const { state, dispatch } = useContext(DataContext);
  // const { cart } = state;

  console.log(videos);
  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };
  const [data, setData] = useState([]);

  // const YOUTUBE__PLAYLIST = "PLt8NnwrNlZAQdsa7FINdm6UT6DrzoKw0L";
  // const YOUTUBE__PLAYLIST = "PLt8NnwrNlZAQuYxWlsIi2Vn-GSq5KhvZm";
  const YOUTUBE__PLAYLIST = "PLt8NnwrNlZAQozkYjXqmoU9JvB80GOo-I";

  // const YOUTUBE__PLAYLIST = "PLt8NnwrNlZATttiaMqTeqyBVw_aHxRQD5";

  // const YOUTUBE__API__KEY = "AIzaSyCaIYtgRmE1v0vDtL1O6dTUY4UL8IRX3lY";

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${YOUTUBE__PLAYLIST}&key=${YOUTUBE__API__KEY}&maxResults=99`
      );

      // https://www.youtube.com/playlist?list=PLt8NnwrNlZAQozkYjXqmoU9JvB80GOo-I?&key
      // const res = await axios.get(
      //   `https://www.youtube.com/playlist?list=PLt8NnwrNlZATttiaMqTeqyBVw_aHxRQD5?&key=${YOUTUBE__API__KEY}&maxResutls=20`
      // );
      setData(res.data.items);
      setVideos(res.data.items);
    };
    getData();
  }, []);
  // console.log("results >>>", data);
  // console.log("vidoes>>>", videos);

  // ----------------------- Video order------------
  const handleBuy = async () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    postData("video", { title: YOUTUBE__API__KEY }, auth.token);

    // const res = await axios.get(`${baseUrl}/api/order`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: token,
    //   },
    // });
    // res();
    // .then((res) => {
    //   if (res.err)
    //     return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    //   dispatch({ type: "ADD_CART", payload: [] });

    //   const newOrder = {
    //     ...res.newOrder,
    //     user: auth.user,
    //   };
    //   dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
    dispatch({ type: "NOTIFY", payload: { success: "ok" } });
    //   // return router.push(`/order/${res.newOrder._id}`);
    // });
    setBuy("true");
  };
  return (
    <div className="row detail_page">
      <Head>
        <title>Detail Product</title>
      </Head>

      <div className="col-md-6">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${data[tab]?.snippet.resourceId.videoId}`}
          onClick={() => setTab(index)}
        />
        <div className="row mx-0" style={{ cursor: "pointer" }}>
          {data.map((video, index) => (
            <button key={index} onClick={() => setTab(index)}>
              Click me {index + 1}
            </button>
          ))}
        </div>
        <button className="w-30 h-20" onClick={handleBuy}>
          Buy the product
        </button>
        <h2>{buy}</h2>
      </div>
    </div>
  );
};

// export async function getServerSideProps({ params: { id } }) {
//   const res = await getData(`product/${id}`);
//   // server side rendering
//   return {
//     props: { product: res.product }, // will be passed to the page component as props
//   };
// }

export default Videos;
