/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { patchData } from "../utils/fetchData";
import { updateItem } from "../store/Actions";
import { useRouter } from "next/router";
import en from "../locales/en";
import uz from "../locales/uz";
const OrderDetail = ({ orderDetail, state, dispatch }) => {
  const { auth, orders } = state;
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : uz;
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
          style={{ margin: "30px 10px 100px 10px" }}
          className="row justify-content-around"
        >
          <div className="text-uppercase my-3" style={{ maxWidth: "600px" }}>
            <h4 className="text-break">
              {t.order_ID} : {order._id}
            </h4>

            <div className="mt-4 text-break">
              <h3>{t.shipping}</h3>
              <p>
                {t.order_name} : {order.user.name}
              </p>
              <p>Email: {order.user.email}</p>
              <p>
                {t.address}: {order.address}
              </p>
              <p>
                {t.mobile}: {order.mobile}
              </p>

              <div
                className={`alert text-break ${
                  order.delivered ? "alert-success" : "alert-danger"
                }
                        d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.delivered
                  ? `${t.Delivered_on} ${order.updatedAt}`
                  : t.not_delivered}
                {auth.user.role === "admin" && !order.delivered && (
                  <button
                    className="btn btn-dark text-uppercase"
                    onClick={() => handleDelivered(order)}
                  >
                    {t.Mark_as_delivered}
                  </button>
                )}
              </div>

              <h3>{t.payment}</h3>
              <div
                className={`alert ${
                  order.paid ? "alert-success" : "alert-danger"
                }
                        d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.paid
                  ? `${t.paid_on} ${order.dateOfPayment}`
                  : `${t.not_paid}`}
              </div>

              <div>
                <h3>{t.order_items}</h3>
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
              <h2 className=" mb-3 "> {t.Pay_by_this_services} </h2>

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
              <h2>{t.contact_us}</h2>

              <div className="order__telegram">
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
                  // marginLeft: "20px",
                  width: "400px",
                  // border: "1px solid #000",
                }}
              >
                {t.total}: ${order.total}
              </h2>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default OrderDetail;
