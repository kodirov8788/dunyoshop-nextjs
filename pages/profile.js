/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import axios from "axios";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";
import ReactPlayer from "react-player";
import { imageUpload } from "../utils/imageUpload";
import { Player } from "video-react";
import "../node_modules/video-react/dist/video-react.css";
const Profile = () => {
  const initialSate = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };
  // const scrollTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };
  const YOUTUBE__API__KEY = process.env.YOUTUBE__API__KEY;
  const [tab, setTab] = useState(0);
  const [tab2, setTab2] = useState(0);

  // console.log("tab2", tab2);
  const [data, setData] = useState(initialSate);
  const [item2, setItem2] = useState([]);
  const [item3, setItem3] = useState([]);
  const [item6, setItem6] = useState(false);
  const [video, setVideo] = useState([]);
  const [video2, setVideo2] = useState([]);
  const box = item3.filter((pro) => pro.length !== 0);

  console.log("this is video", video?.items);
  console.log("this is video2", video2);
  // console.log("this is video details", video?.items.snippet);

  // -------------Video and Rasm ------------------
  const pr = box.map((pro) => pro.filter((it) => it.video));
  const pr2 = pr.filter((pi) => pi.length !== 0);
  const pr3 = pr2.filter((box22) => box22.length === 1);
  const pr4 = pr2.filter(
    (box22) =>
      box22.length !== 1 && box22.map((item) => pr3.push(new Array(item)))
  );
  const pr5 = pr3.map((pr3inner) => pr3inner[0]);
  const pr6 = pr5.map((pr5inner) => pr5inner.video);
  console.log("pr6", pr6);
  // ----------------------------------
  const { avatar, name, password, cf_password } = data;

  const { state, dispatch } = useContext(DataContext);
  const { auth, notify, orders } = state;
  useEffect(() => {
    const res2 = setItem2(orders.map((item) => item));
    return res2;
  }, [orders]);

  useEffect(() => {
    const res3 = setItem3(
      item2
        ?.filter((as) => as.delivered === true)
        .map((cartWrap) =>
          cartWrap?.cart.filter((cartInner) => cartInner.video)
        )
      // .filter()
    );
    return res3;
  }, [item2]);

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }

    if (name !== auth.user.name || avatar) updateInfor();
  };

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "File does not exist." },
      });

    if (file.size > 1024 * 1024)
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "The largest image size is 1mb." },
      });

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image format is incorrect." },
      });

    setData({ ...data, avatar: file });
  };

  const updateInfor = async () => {
    let media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    if (avatar) media = await imageUpload([avatar]);

    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };
  // --------------------video -----------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      const res = axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pr6[tab2]}&key=${YOUTUBE__API__KEY}&maxResults=99`
        )
        .then((response) => {
          setVideo(response?.data);
          +setItem6(true);
          console.log("video bor", response.data);
        })
        .catch((error) =>
          error ? console.log("video yoq") : console.log("ok")
        );

      return res;
    }, 2000);
    return () => clearTimeout(timer);
  }, [pr6 + tab2]);

  // --------------------end of the video ------------

  if (!auth.user) return null;
  return (
    <div className="profile__page">
      <Head>
        <title>Profile</title>
      </Head>
      <section className="row text-secondary my-2">
        <div className="col-md-4">
          <h3 className="text-center text-uppercase">
            {auth.user.role === "user" ? "User Profile" : "Admin Profile"}
          </h3>

          <div className="avatar">
            <img
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              alt="avatar"
            />
            <span>
              <i className="fas fa-camera"></i>
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={changeAvatar}
              />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              placeholder="Your name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              defaultValue={auth.user.email}
              className="form-control"
              disabled={true}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="Your new password"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cf_password">Confirm New Password</label>
            <input
              type="password"
              name="cf_password"
              value={cf_password}
              className="form-control"
              placeholder="Confirm new password"
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-info"
            disabled={notify.loading}
            onClick={handleUpdateProfile}
          >
            Update
          </button>
        </div>

        <div className="col-md-8">
          <h3 className="text-uppercase">Orders</h3>

          <div className="my-3 table-responsive">
            <table
              className="table-bordered table-hover w-100 text-uppercase"
              style={{ minWidth: "600px", cursor: "pointer" }}
            >
              <thead className="bg-light font-weight-bold">
                <tr>
                  <td className="p-2">id</td>
                  <td className="p-2">date</td>
                  <td className="p-2">total</td>
                  <td className="p-2">delivered</td>
                  <td className="p-2">paid</td>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="p-2">
                      <Link
                        // href={`/order/${order._id}`}
                        href={{
                          // pathname: `/order/${order._id}`,
                          // query: { order: order },
                          pathname: `/order/${order._id}`,
                          query: {
                            id: order.id, // pass the id
                          },
                        }}
                      >
                        <a>{order._id}</a>
                      </Link>
                    </td>
                    <td className="p-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">${order.total}</td>
                    <td className="p-2">
                      {order.delivered ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td className="p-2">
                      {order.paid ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* {pr6[1]} */}
      {/* <iframe
        src={pr6[2]}
        width="1280"
        height="686"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="p1.mp4"
      ></iframe> */}
      {item6 ? (
        <>
          <div className="profile__videoSection">
            <div className="profile__mainVideo">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video?.items[tab].snippet.resourceId.videoId}`}
                borderRadius="4px"
                width="100%"
                height="500px"
                className="player"
                playing={true}
                controls={true}
                showinfo={true}
              />
            </div>
            <div className="profile__leftSide">
              {video.items.map((video, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setTab(index);
                    // + scrollTop();
                  }}
                >
                  click me {index + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="profile__videoDivider">
            {pr5.map((pr5inner, ind) => (
              <>
                <button
                  style={{
                    backgroundImage: `url(${pr5inner.images[0].url}`,
                  }}
                  key={ind}
                  onClick={() => setTab2(ind)}
                >
                  {pr5inner.title}
                </button>
              </>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
