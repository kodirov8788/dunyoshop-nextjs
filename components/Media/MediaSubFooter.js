/* eslint-disable @next/next/no-img-element */
import React from "react";

const MediaFooter = () => {
  return (
    <div className="mediaFooter">
      <div className="mediaFooter__section">
        <ul className="About">
          <h2>About us</h2>
          <li>
            <a href="#">Our Story</a>
          </li>
          <li>
            <a href="#">Contact us</a>
          </li>
          <li>
            <a href="#">Policy</a>
          </li>
          <li>
            <a href="#">Carreer</a>
          </li>
        </ul>

        <ul className="Shop">
          <h2>Shop by</h2>
          <li>
            <a href="#">New Arrival</a>
          </li>
          <li>
            <a href="#">Best Seller</a>
          </li>
          <li>
            <a href="#">Features Product</a>
          </li>
          <li>
            <a href="#">Sale Off</a>
          </li>
        </ul>

        <ul className="Support">
          <h2>Support</h2>
          <li>
            <a href="#">The Blog</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
          <li>
            <a href="#">Order Tracking</a>
          </li>
          <li>
            <a href="#">Shipping and Returns</a>
          </li>
        </ul>
        <ul className="Address">
          <h2>Address</h2>
          <li>
            <a href="#">PO Box 16122 Collins</a>
          </li>
          <li>
            <a href="#">Victoria 8007 Australia-Map</a>
          </li>
          <li>
            <a href="#">+61 3 8376 6284</a>
          </li>
          <li>
            <a href="#">Alitstudios@gmail.com</a>
          </li>
        </ul>

        <div className="payment">
          <h2>Payment</h2>
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
        </div>
      </div>
    </div>
  );
};

export default MediaFooter;
