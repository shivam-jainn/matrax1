const lenis = new Lenis({
  duration: 4,
  smooth: true,
  easing: (t, friction = 0.1) => {
    // Apply friction to the easing function
    const easedValue = Math.min(1, 1.001 - Math.pow(2, -10 * t));

    // Apply friction to the eased value
    const frictionedValue = easedValue - friction * t;

    return Math.min(1, frictionedValue);
  },
});
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.body.addEventListener("mousemove", function (dets) {
  gsap.to(".cursor", {
    left: dets.x,
    top: dets.y,
  });
});

function showNav() {
  document.getElementsByClassName("navigation")[0].classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    direction: "ttb",
    height: "60vh",
    wheel: true,
    perPage: 5,
    // type: "loop",
    perMove: 1,
    pagination: false,
    gap: 25,
    padding: "1rem",
  });
  splide.mount();
});

// gsap.to(".rollingImage", {
//   left:"50%",
//   rotate: -360,
//   // repeat:-1,
//   duration: 4
// })

// gsap.to(".rollingImage", {
//   display:"none",
//   delay: 4
// })

// gsap.from(".heroCanvas", {
//   display:"none",
//   delay: 4
// })

gsap.from(".heroCanvas", {
  x: "150%", // Move the element to the right by 150% of its width
  rotate: 360,
  duration: 4,
});

function dom() {
  const canvas = document.querySelector(".heroSection>canvas");
  const context = canvas.getContext("2d");
  const imageSeq = {
    frame: 0,
  };

  function setCanvasSize() {
    const img = images[imageSeq.frame];
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    render();
  }

  window.addEventListener("resize", setCanvasSize);

  function files(index) {
    const data = `
      ./images/SequenceImages/jlsousa tires project 4  Urcola+.3117.${
        31 + index
      }.webp
      `;
    return data.trim();
  }

  const frameCount = 121;
  const images = [];

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 1.8,
      pin: true,
      trigger: "#main",
    },
    onUpdate: render,
  });

  images[0].onload = setCanvasSize;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  gsap.to(".heroSection>canvas", {
    scale: 0.8,
    scrollTrigger: {
      scrub: 0.1,
      trigger: "#main",
      start: "bottom 100%",
      invalidateOnRefresh: true,
    },
  });

  // ScrollTrigger.create({
  //   trigger: "#main",
  //   pin: true,
  //   start: "bottom 100%",
  // });
}
dom();

function videoSection() {
  let video = document.querySelector(".videoSection video");

  ScrollTrigger.create({
    trigger: "#main",
    // markers:true,
    start: "9% top",
    end: "45% top",
    // pin:".videoSection",
    onEnter: () => video.play(),
    onEnterBack: () => video.play(),
    onLeave: () => video.pause(),
    onLeaveBack: () => video.pause(),
  });

  let tl1 = gsap.timeline({
    scrollTrigger: {
      scrub: 0.1,
      trigger: "#main",
      start: "11.5% top",
      end: "40% top",
      pin: true,
      // markers: true,
    },
  });

  tl1.to(".videoOverlay", { opacity: 0.85 }, "+.4");
  tl1.to(".videoOverlayText", { bottom: "1%", duration: 8 }, "+.8");
}
videoSection();
function horizontalScroll() {
  let images = gsap.utils.toArray(".horizontal__item");
  let animationProps = {
    ease: "none",
    scrollTrigger: {
      trigger: "#main",
      pin: true,
      start: "23% top",
      end: "40% top",
      scrub: 1,
      markers: true,
    },
    defaults: { duration: 5 },
  };

  // Check the screen width
  if (window.innerWidth < 600) {
    gsap.to(images, {
      xPercent: -170 * (images.length - 1),
      ...animationProps,
    });
  } else if (window.innerWidth >= 600 && window.innerWidth < 1200) {
    gsap.to(images, {
      xPercent: -150 * (images.length - 1),
      ...animationProps,
    });
  } else {
    gsap.to(images, {
      xPercent: -60 * (images.length - 1),
      ...animationProps,
    });
  }
}

// Call the function initially
horizontalScroll();

// function horizontalScroll() {
//   // Check the screen width
//   if (window.innerWidth < 1000 && window.innerWidth > 600) {
//     gsap.to(".horizontal__content", {
//       transform: "translateX(-185vw)",
//       scrollTrigger: {
//         trigger: "#main",
//         start: "23% top",
//         end: "55% top",
//         scrub: 1,
//         pin: true,
//         markers: true,
//       },
//       defaults: { duration: 5 },
//     });
//   } else if (window.innerWidth < 1500 && window.innerWidth > 1000) {
//     gsap.to(".horizontal__content", {
//       transform: "translateX(-180%)",
//       scrollTrigger: {
//         trigger: "#main",
//         start: "23% top",
//         end: "55% top",
//         scrub: 1,
//         pin: true,
//         markers: true,
//       },
//       defaults: { duration: 5 },
//     });
//   } else if (window.innerWidth < 600 && window.innerWidth > 500) {
//     gsap.to(".horizontal__content", {
//       transform: "translateX(-315%)",
//       scrollTrigger: {
//         trigger: "#main",
//         start: "23% top",
//         end: "55% top",
//         scrub: 1,
//         pin: true,
//         markers: true,
//       },
//       defaults: { duration: 5 },
//     });
//   } else if (window.innerWidth < 500) {
//     gsap.to(".horizontal__content", {
//       transform: "translateX(-370%)",
//       scrollTrigger: {
//         trigger: "#main",
//         start: "23% top",
//         end: "55% top",
//         scrub: 1,
//         pin: true,
//         markers: true,
//       },
//       defaults: { duration: 5 },
//     });
//   } else {
//     gsap.to(".horizontal__content", {
//       transform: "translateX(-45vw)",
//       scrollTrigger: {
//         trigger: "#main",
//         start: "23% top",
//         end: "55% top",
//         scrub: 1,
//         pin: true,
//         markers: true,
//       },
//       defaults: { duration: 5 },
//     });
//   }
// }
// horizontalScroll();

function curvedScroll() {
 
const slides = gsap.utils.toArray(".single-item");

const animation = () => {
  gsap.set(".carrousel-wrappper", {
    xPercent: -50,
    yPercent: -4,
    width: `${slides.length * 350}px`,
    height: `${slides.length * 350}px`
  });
  circleSetup(".carrousel-wrappper", ".single-item", -50);

  // Add ScrollTrigger
  ScrollTrigger.create({
    trigger: "#main",
    start: "30.5% top",
    end: "34% top",
    pin: true,
    markers: true,
    onUpdate: (self) => {
      gsap.set(".carrousel-wrappper", { rotation: self.progress * 200 });
    }
  });
};



/// set slides around the circle
const circleSetup = (circle, items, percentageValue) => {
  const mainCicle = document.querySelector(circle);
  const circleItem = gsap.utils.toArray(items);

  const radius = mainCicle.offsetWidth / 2;
  const center = mainCicle.offsetWidth / 2;
  const total = circleItem.length;
  const slice = (-1.3 * Math.PI) / total;

  circleItem.forEach((item, i) => {
    const angle = i * slice;

    const x = center + radius * Math.sin(angle);
    const y = center - radius * Math.cos(angle);

    gsap.set(item, {
      rotation: angle + "_rad",
      xPercent: percentageValue,
      yPercent: percentageValue,
      x,
      y
    });
  });
};

window.addEventListener("load", () => {
  animation();
  gsap.set("main", { autoAlpha: 1 });
});
}

curvedScroll();

function bullStory() {
  ScrollTrigger.create({
    trigger: "#main",
    markers: true,
    start: "46% top",
    end: "53% top",
    pin: true,
  });

  gsap.to(".bullStoryOverlay", {
    scrollTrigger: {
      trigger: "#main",
      markers:true,
      start: "46% top",
      end: "52% top",
      scrub: 2,
    },
    top: "60%",
  });
}
bullStory();

function logoShrink() {
  let section = document.getElementById("section"),
    dot = document.querySelector(".dot");

  gsap.set(dot, {
    width: "142vmax", // ensures it fills every part of the screen.
    height: "142vmax",
    xPercent: -50, // center the dot in the section area
    yPercent: -50,
    top: "50%",
    left: "50%",
    transformOrigin: "center center", // Set the transform origin to the center
  });

  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#main",
      start: "57.5% top",
      end: "64% top",
      markers: true,
      scrub: 1.5,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
      markers:true
    },
    defaults: { ease: "none" },
  });

  tl1.fromTo(
    dot,
    {
      scale: 0,
    },
    {
      scale: 1,
      // ease: "power3.in",
    }
  );

//   tl1.to(".bullimg", { duration: 0.8, width: "15%", y: -250 }, "+.6");
//   tl1.to(".nameLogo", { duration: 0.8, y: -500 }, "+.6");
//   tl1.to(".logoTextSection", { duration: 0.8, y: -450 }, "+.9");
// }


 // Check the screen width
 if (window.innerWidth < 600) {
  tl1.to(".bullimg", { duration: 0.8, width: "55%", y: -300 }, "+.6");
  tl1.to(".nameLogo", { duration: 0.8, y: -650 }, "+.6");
  tl1.to(".logoTextSection", { duration: 0.8, y: -600 }, "+.9");
// } else if (window.innerWidth >= 600 && window.innerWidth < 1200) {
//   gsap.to(images, {
//     xPercent: -150 * (images.length - 1),
//     ...animationProps,
//   });
} else {
  tl1.to(".bullimg", { duration: 0.8, width: "15%", y: -250 }, "+.6");
  tl1.to(".nameLogo", { duration: 0.8, y: -500 }, "+.6");
  tl1.to(".logoTextSection", { duration: 0.8, y: -450 }, "+.9");
}
}


logoShrink();

function ecosystem() {
  const cardContainer = document.querySelector(".card-container");
  const cardContainerWidth = cardContainer.offsetWidth;

  const card1 = document.getElementById("card1");
  const card1Width = card1.offsetWidth;

  const card2 = document.getElementById("card2");
  const card2Width = card2.offsetWidth;

  const EXPAND_WIDTH = cardContainerWidth * 0.1;

  card1.addEventListener("mouseenter", () => {
    card1.style.width = `${card1Width + EXPAND_WIDTH}px`;
    card2.style.width = `${card2Width - EXPAND_WIDTH}px`;

    card2.classList.add("bgimg-card");
  });

  card1.addEventListener("mouseleave", () => {
    card1.style.width = `${card1Width}px`;
    card2.style.width = `${card2Width}px`;
    card1.classList.add("expandCard");
    card2.classList.remove("bgimg-card");
  });

  card2.addEventListener("mouseenter", () => {
    card2.style.width = `${card1Width + EXPAND_WIDTH}px`;
    card1.style.width = `${card2Width - EXPAND_WIDTH}px`;
    card1.classList.add("bgimg-card");
  });

  card2.addEventListener("mouseleave", () => {
    card2.style.width = `${card1Width}px`;
    card1.style.width = `${card2Width}px`;
    card1.classList.remove("bgimg-card");
  });
}
ecosystem();
