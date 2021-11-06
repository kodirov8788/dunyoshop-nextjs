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

const Profile = () => {
  const initialSate = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };
  const YOUTUBE__API__KEY = process.env.YOUTUBE__API__KEY;
  const [tab, setTab] = useState(0);
  const [tab2, setTab2] = useState(0);

  console.log("tab2", tab2);
  const [data, setData] = useState(initialSate);
  const [item2, setItem2] = useState([]);
  const [item3, setItem3] = useState([]);
  const [item4, setItem4] = useState([]);
  const [item5, setItem5] = useState(false);
  const [item6, setItem6] = useState(false);
  const [video, setVideo] = useState([]);
  const box = item3.filter((pro) => pro.length !== 0);
  const box2 = box.map((pro) => pro.map((it) => it.video));
  // const box5 = [];
  // const box6 = [];

  // useEffect(() => {
  //   const res3 = box6.push(...box3, ...box5);
  //   return res3;
  // }, []);

  // const box6 = [];
  const box3 = box2.filter((box22) => box22.length === 1);
  const box4 = box2.filter(
    (box22) =>
      box22.length !== 1 && box22.map((item) => box3.push(new Array(item)))
  );

  // console.log("this is box6", box6);
  console.log("this is box", box);
  console.log("this is box2", box2);
  console.log("this is box3", box3);
  console.log("this is box4", box4);
  // console.log("this is box5", box5);
  // console.log("this is item2", item2);
  // console.log("this is item3", item3);
  // ? as.cart.map((item5) =>
  //   item5.title && item5.video
  //   ? item5.video + setItem4(item5.video)
  //   : ""
  // )
  // : ""
  // console.log("this is item4", item4);
  console.log("this is item6", item6);
  console.log("this is video", video?.items);
  // console.log("this is video details", video?.items.snippet);
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
        .get(`${box3[tab2]}=${YOUTUBE__API__KEY}&maxResutls=99`)
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
  }, [box3 + tab2]);

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
                      <Link href={`/order/${order._id}`}>
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
      {/* {item3 === true ? ( */}
      {/* {item2.map((ite) => (
        <> */}
      {item6 ? (
        <>
          <div className="profile__videoSection">
            {/* <h1>Video section</h1> */}

            <div className="profile__mainVideo">
              {/* <h1>{ite.delivered && "true"}</h1> */}
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video?.items[tab].snippet.resourceId.videoId}`}
                // onClick={() => setTab(index)}
              />
            </div>

            <div className="profile__leftSide">
              {video.items.map((video, index) => (
                <button key={index} onClick={() => setTab(index)}>
                  click me {index + 1}
                </button>
              ))}
              {/* <button>Click videos</button>
            <button>Click videos</button>
            <button>Click videos</button> */}
            </div>
          </div>
          <div className="profile__videoDivider">
            {box3.map((video, ind) => (
              <button key={ind} onClick={() => setTab2(ind)}>
                click me {ind + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
      {/* </>
      ))} */}
      {/* ) : (
        ""
      )} */}
    </div>
  );
};

export default Profile;
