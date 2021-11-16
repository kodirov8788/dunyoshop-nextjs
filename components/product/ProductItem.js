/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { GrView } from "react-icons/gr";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useRouter } from "next/router";
import en from "../../locales/en";
import uz from "../../locales/uz";
const ProductItem = ({ product, handleCheck }) => {
  const [salebox, setSalebox] = useState(false);

  useEffect(() => {
    if (product.sale) {
      setSalebox(true);
    }
  }, []);
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : uz;
  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <div className="btn__view">
            <GrView />
            <p>{t.view}</p>
          </div>
        </Link>
        <button
          className="btn__buy"
          disabled={product.inStock === 0 ? true : false}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          <BsFillCartPlusFill />
        </button>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`create/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            {t.edit}
          </a>
        </Link>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px", flex: 1 }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: product._id,
                  title: product.title,
                  type: "DELETE_PRODUCT",
                },
              ],
            })
          }
        >
          {t.delete_product}
        </button>
      </>
    );
  };

  return (
    <div className="productItem__card">
      {auth.user && auth.user.role === "admin" && (
        <input
          type="checkbox"
          checked={product.checked}
          className="position-absolute"
          style={{ height: "20px", width: "20px" }}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <Link href={`product/${product._id}`}>
        <img
          // className="card-img-top"
          src={product.images[0].url}
          alt={product.images[0].url}
        />
      </Link>

      <div className="product__box">
        <Link href={`product/${product._id}`}>
          <h5 className="card-title text-capitalize" title={product.title}>
            {product.title}
          </h5>
        </Link>

        <div className="row justify-content-between mx-0">
          {salebox && (
            <span className="productItem__actualPrice"> $ {product.price}</span>
          )}
          {/* {salebox && product.price} */}
          <span className={salebox && " productItem__SalePrice"}>
            $
            {salebox && product.sale
              ? product.price - (product.price / 100) * product.sale
              : product.price}
          </span>

          {product.sale && (
            <span className="product__sale text-white">-{product.sale}%</span>
          )}
        </div>
        {/* {product.inStock > 0 ? (
          <h6 className="text-danger">In Stock: {product.inStock}</h6>
        ) : (
          <h6 className="text-danger">Out Stock</h6>
        )} */}
        <p className="card__text" title={product.description}>
          {product.description}
        </p>

        <div className="row justify-content-between mx-0">
          {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
