function createObserver() {
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  return new IntersectionObserver(handleIntersect, options);
}

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const imageElement = element.querySelector("img");
      const imageSrc = imageElement.dataset.src;

      imageElement.removeAttribute("data-src");
      imageElement.setAttribute("src", imageSrc);

      observer.unobserve(element);
    }
  });
}

export { createObserver };
