import React from "react";
import "../styles/Button.scss";

export default function Button({ type, children }) {
  let buttonType = 'default';
  switch (type) {
    case "primary":
      buttonType = 'primary';
      break;

    case "border":
      buttonType = 'border';
      break;

    default:
      buttonType = 'default';
      break;
  }
  return (
    <button className={`button container ${buttonType}`}>{children}</button>
  );
}
