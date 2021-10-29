import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { getData } from "../utils/fetchData";
import ProductItem from "../components/product/ProductItem";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";
import Filter from "../components/Filter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Banner from "./Banner";
// import I18n from "./I18n";

const Home = (props) => {
  const [products, setProducts] = useState(props.products);
  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const { categories } = state;
  console.log(categories);

  // console.log(products);

  const shirinliklar = [];
  const technology = [];

  products.map((item) =>
    item.category === "617afcdcaa8e7240bae36a42" ? shirinliklar.push(item) : ""
  );
  products.map((item) =>
    item.category === "617afce5aa8e7240bae36a43" ? technology.push(item) : ""
  );

  // console.log(shirinliklar);
  // console.log(technology);

  // -------------------------------------------------
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    speed: 1000,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1.3,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    // ],
  };
  // -------------------------------------------------

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const handleCheckALL = () => {
    products.forEach((product) => (product.checked = !isCheck));
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: "",
          id: product._id,
          title: "Delete all selected products?",
          type: "DELETE_PRODUCT",
        });
      }
    });

    dispatch({ type: "ADD_MODAL", payload: deleteArr });
  };

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  return (
    <div className="home__page">
      <Head>
        <title>Home Page</title>
      </Head>
      {/* <I18n /> */}
      <Filter state={state} />

      <Banner />
      {auth.user && auth.user.role === "admin" && (
        <div
          className="delete_all btn btn-danger mt-2"
          style={{ marginBottom: "-10px" }}
        >
          <input
            type="checkbox"
            checked={isCheck}
            onChange={handleCheckALL}
            style={{
              width: "25px",
              height: "25px",
              transform: "translateY(8px)",
            }}
          />

          <button
            className="btn btn-danger ml-2"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={handleDeleteAll}
          >
            DELETE ALL
          </button>
        </div>
      )}
      {shirinliklar.length !== 0 ? (
        <div className="product__slick">
          <h1>Shrinliklar</h1>
          <Slider {...settings}>
            {shirinliklar.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                handleCheck={handleCheck}
              />
            ))}
          </Slider>
        </div>
      ) : (
        ""
      )}
      {technology.length !== 0 ? (
        <div className="product__slick">
          <h1>technology</h1>
          <Slider {...settings}>
            {technology.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                handleCheck={handleCheck}
              />
            ))}
          </Slider>
        </div>
      ) : (
        ""
      )}
      <div className="products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              handleCheck={handleCheck}
            />
          ))
        )}
      </div>

      {/* {props.result < page * 6 ? (
        ""
      ) : (
        <button
          className="btn btn-outline-info d-block mx-auto mb-4"
          onClick={handleLoadmore}
        >
          Load more
        </button>
      )} */}
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `product?limit=&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Home;
