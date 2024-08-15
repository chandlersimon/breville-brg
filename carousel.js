document.addEventListener("DOMContentLoaded", function () {
  const allSplides = document.querySelectorAll("[carousel-component='true']");
  allSplides.forEach((splideElement) => {
    let carouselStyle = splideElement.getAttribute("carousel-style");
    let carouselType = splideElement.getAttribute("carousel-type") || "loop";

    let options = {
      arrows: false, // Disable default arrows
      type: carouselType,
      gap: "20px",
    };

    // Conditionally add omitEnd if not in loop mode
    if (carouselType !== "loop") {
      options.omitEnd = true;
    }

    switch (carouselStyle) {
      case "5-in-view":
        options = {
          ...options,
          perPage: 5,
          breakpoints: {
            991: { perPage: 3 },
            767: { perPage: 1.5, gap: "10px" },
          },
        };
        break;
      case "4-in-view":
        options = {
          ...options,
          perPage: 4,
          breakpoints: {
            991: { perPage: 3 },
            767: { perPage: 1.5, gap: "10px" },
          },
        };
        break;
      case "3-in-view (4-4-8)":
        options = {
          ...options,
          perPage: 3,
          breakpoints: {
            991: { perPage: 3 },
            767: { perPage: 1.5, gap: "10px" },
          },
        };
        break;
      case "3-in-view (4-6-10)":
        options = {
          ...options,
          perPage: 3,
          breakpoints: {
            991: { perPage: 2 },
            767: { perPage: 1.2, gap: "10px" },
          },
        };
        break;
      case "1-in-view":
        options = {
          ...options,
          perPage: 1,
          breakpoints: {
            991: { perPage: 1 },
            767: { perPage: 1, gap: "10px" },
          },
        };
        break;
      case "Introduction":
        options = {
          ...options,
          perPage: 3,
          breakpoints: {
            991: { perPage: 3 },
            767: { perPage: 1.5, gap: "10px" },
          },
        };
        break;
      default:
        options = {
          ...options,
          perPage: 4,
          breakpoints: {
            991: { perPage: 3 },
            767: { perPage: 1.5, gap: "10px" },
          },
        };
    }

    let splide = new Splide(splideElement, options);

    // Custom arrow handling
    let prevArrow = splideElement.querySelector(".custom-prev");
    let nextArrow = splideElement.querySelector(".custom-next");

    splide.on("mounted move updated", () => {
      if (carouselType !== "loop") {
        if (splide.index === 0) {
          prevArrow.classList.add("is-disabled");
        } else {
          prevArrow.classList.remove("is-disabled");
        }

        if (splide.index === splide.Components.Controller.getEnd()) {
          nextArrow.classList.add("is-disabled");
        } else {
          nextArrow.classList.remove("is-disabled");
        }
      }
    });

    // Bind custom arrows
    prevArrow.addEventListener("click", () => splide.go("<"));
    nextArrow.addEventListener("click", () => splide.go(">"));

    splide.mount();
  });
});
