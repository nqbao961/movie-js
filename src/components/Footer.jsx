import React from "react";
import "../styles/Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="container wrapper">
        <div className="col">
          <img src="/logo.png" alt="logo" />
          <p className="description">
            SMIX is a value-based, one-stop platform offering Pure Entertainment
            — high quality, wholesome enjoyment with a focus on values such as
            love, hope, family, courage and honour.
          </p>
        </div>
        <div className="col">
          <ul className="nav-list">
            <li>
              <a href="link">Enter redemption code</a>
            </li>
            <li>
              <a href="link">About</a>
            </li>
            <li>
              <a href="link">Privacy Policy</a>
            </li>
            <li>
              <a href="link">Contact Us</a>
            </li>
            <li>
              <a href="link">FAQ</a>
            </li>
            <li>
              <a href="link">Terms and Conditions</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="copy-right">© 2021 Salt Media & Entertainment</p>
    </footer>
  );
}
