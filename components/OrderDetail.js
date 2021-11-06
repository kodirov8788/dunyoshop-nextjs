/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { patchData } from "../utils/fetchData";
import { updateItem } from "../store/Actions";
import { useState, useEffect } from "react";

const OrderDetail = ({ orderDetail, state, dispatch }) => {
  const { auth, orders } = state;

  const [orderData, setOrderData] = useState("");
  // const [orderDetails, setOrderDetails] = useState(orderDetails);
  // console.log(orderDetail);
  // useEffect(() => {
  //   setOrderDetails(orderDetails);
  // }, []);
  console.log("this is orderData", orderDetail);

  const handleDelivered = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      const { paid, dateOfPayment, method, delivered } = res.result;

      setOrderData(delivered);
      dispatch(
        updateItem(
          orders,
          order._id,
          {
            ...order,
            paid,
            dateOfPayment,
            method,
            delivered,
          },
          "ADD_ORDERS"
        )
      );

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  if (!auth.user) return null;
  return (
    <>
      {orderDetail.map((order) => (
        <div
          key={order._id}
          style={{ margin: "10px auto" }}
          className="row justify-content-around"
        >
          <div className="text-uppercase my-3" style={{ maxWidth: "600px" }}>
            <h4 className="text-break">Order {order._id}</h4>

            <div className="mt-4 text-break">
              <h3>Shipping</h3>
              <p>Name: {order.user.name}</p>
              <p>Email: {order.user.email}</p>
              <p>Address: {order.address}</p>
              <p>Mobile: {order.mobile}</p>

              <div
                className={`alert text-break ${
                  order.delivered ? "alert-success" : "alert-danger"
                }
                        d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.delivered
                  ? `Deliverd on ${order.updatedAt}`
                  : "Not Delivered"}
                {auth.user.role === "admin" && !order.delivered && (
                  <button
                    className="btn btn-dark text-uppercase"
                    onClick={() => handleDelivered(order)}
                  >
                    Mark as delivered
                  </button>
                )}
              </div>

              <h3>Payment</h3>
              {order.method && (
                <h6>
                  Method: <em>{order.method}</em>
                </h6>
              )}

              {order.paymentId && (
                <p>
                  PaymentId: <em>{order.paymentId}</em>
                </p>
              )}

              <div
                className={`alert ${
                  order.paid ? "alert-success" : "alert-danger"
                }
                        d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.paid ? `Paid on ${order.dateOfPayment}` : "Not Paid"}
              </div>

              <div>
                <h3>Order Items</h3>
                {order.cart.map((item) => (
                  <div
                    className="row border-bottom mx-0 p-2 justify-content-betwenn
                                    align-items-center"
                    key={item._id}
                    style={{ maxWidth: "550px" }}
                  >
                    <img
                      src={item.images[0].url}
                      alt={item.images[0].url}
                      style={{
                        width: "50px",
                        height: "45px",
                        objectFit: "cover",
                      }}
                    />

                    <h5 className="flex-fill text-secondary px-3 m-0">
                      <Link href={`/product/${item._id}`}>
                        <a>{item.title}</a>
                      </Link>
                    </h5>

                    <span className="text-info m-0">
                      {item.quantity} x ${item.price} = $
                      {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!order.paid && auth.user.role !== "admin" && (
            <div className="order__payment">
              <div className="payment w-70">
                <h2 className=" mb-5"> Pay by this services </h2>

                <div className="payment__imgs">
                  <img
                    src="https://docs.click.uz/wp-content/themes/click_help/assets/images/logo.png"
                    alt=""
                  />
                  <img
                    src="https://cdn.paycom.uz/documentation_assets/payme_01.png"
                    alt=""
                  />
                  <img
                    src="/assets/uzcard.svg"
                    alt=""
                    style={{ marginTop: "10px" }}
                  />
                  <img
                    src="https://www.fibernet.uz/wp-content/uploads/apelsin-logo.png"
                    alt=""
                  />
                </div>

                <div className="order__telegram">
                  <h2> contact us</h2>
                  <div className="order__contactDetail">
                    <span>
                      <img
                        style={{ width: "60px", marginRight: "10px" }}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png"
                        alt=""
                      />
                      <h3>telegram:</h3>
                    </span>
                    <h4>
                      <Link href="#">@kodirovdev</Link>
                    </h4>
                  </div>
                  <div className="order__contactDetail">
                    <span>
                      <img
                        src="http://svgcuts.com/fsvgfotw/2014/svgcuts-022314-retro-telephone.png"
                        alt=""
                      />
                      <h3>Tel:</h3>
                    </span>
                    <h4>
                      <Link href="+998939427899">(93)9427899</Link>
                    </h4>
                  </div>
                </div>
                <h2
                  style={{
                    padding: "10px",
                    color: "red",
                    marginTop: "40px",
                    width: "400px",
                    // border: "1px solid #000",
                  }}
                >
                  Total: ${order.total}
                </h2>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default OrderDetail;
