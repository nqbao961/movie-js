import { useEffect, useRef, useState } from "react";
import { IMAGE_BASE } from "../constants";
import Button from "./Button";

export default function SlickItem({ observer, title, name, src }) {
  const slickItemEl = useRef(null);

  useEffect(() => {
    const { current } = slickItemEl;

    if (observer !== null) {
      observer.observe(current);
    }

    return () => {
      if (observer !== null) {
        observer.unobserve(current);
      }
    };
  }, [observer]);

  return (
    <div ref={slickItemEl} className="item">
      <div className="item-wrapper">
        <h3>{title || name}</h3>
        <div className="button-wrapper">
          <Button type="primary">Watch Now</Button>
          <Button type="border">Watch Trailer</Button>
        </div>
      </div>
      <img data-src={IMAGE_BASE.ORIGINAL + src} alt={title || name} />
    </div>
  );
}
