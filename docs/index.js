gsap.registerPlugin(ScrollTrigger);
const sections = document.querySelectorAll("section");
const windowHeight = window.innerHeight;

let hrzsection = document.querySelector("#horizontal-scroll");
let hrzdiv = gsap.utils.toArray("#horizontal-scroll div");

//Navigation Bar--Section Change
const navLi = document.querySelectorAll("nav ul li a");
window.onscroll = () => {
  var current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const { x , y } = section.getBoundingClientRect();
    if (y<windowHeight/2) {
      current = section.getAttribute("id");
      if(current === "horizontal-scroll") {
        hrzdiv.forEach((div) => {
          if(div.classList.contains("about-me")) {
          const { x , y } = div.getBoundingClientRect();
            if(x<window.innerWidth/2) {
              current = "about-me";
            }
        }
        })
      }
      }
  });
  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
      gsap.from
    }
  });
};

const entry = document.getElementsByClassName("entry");

var mainTl = gsap.timeline( {
  scrollTrigger: {
    trigger: hrzsection,
  }
});


mainTl.from(hrzdiv, {
  opacity: 0,
  duration: 1,
  y: () => "+=" + (hrzsection.scrollHeight/6),
  stagger: 0.1,
})
.from("nav ul li", {
  opacity: 0,
  stagger: 0.4,
  duration: 1,
  ease: "slow(0.7, 0.7, false)",
  y: () => "+=" + (hrzsection.scrollHeight/12),
})



function horizontalScroll() {
var tl = gsap.timeline( {
  scrollTrigger: {
    pin: true,
    scrub: 1,
    trigger: hrzsection,
    end: () => "+=" + (hrzsection.scrollWidth/2),
  }
});
tl.to(hrzdiv, {
  x: () =>
    -(hrzsection.scrollWidth - document.documentElement.clientWidth) + "px",
  ease: "none",
})
.set( {}, {}, "+=0.3")
return tl;
}

let eassection = document.querySelector("#exp-skills");
let projects = document.querySelector("#projects");

function aboutDisappear() {
  var tl = gsap.timeline( {
    scrollTrigger: {
      scrub: 1,
      trigger: eassection,
      start: "top center",
      end: () => "+=" + (hrzdiv.scrollHeight),
    }
  })
.to(hrzdiv, {
    opacity: 0,
    duration: 1,
    ease: "none",
  });
  return tl;
}

function expDisappear() {
  var tl = gsap.timeline( {
    scrollTrigger: {
      scrub: 1,
      trigger: projects,
      end: () => "+=" + (eassection.scrollHeight),
    }
  })
.to(eassection, {
    start: () => "+=" + (windowHeight/2),
    opacity: 0,
    duration: 0.1,
    ease: "none",
  });
  return tl;
}

let projectMainEntry = gsap.utils.toArray("#projects div.major-projects .entry");
let projectExtraEntry = gsap.utils.toArray("#projects div.learning-projects .entry-learning");

function projectAppear() {
  var tl = gsap.timeline( {
    scrollTrigger: {
      scrub: 1,
      trigger: projectMainEntry,
      endTrigger: projectExtraEntry,
      end: "top center",
    }
  })
projectMainEntry.forEach((entry) => {
  tl.from(entry, {
    opacity: 0,
    x: () => "+=" + (window.innerWidth/2),
    ease: "none",
    duration: 1,
  });
});
  return tl;
}

function projectExtraAppear() {
  var tl = gsap.timeline( {
    scrollTrigger: {
      scrub: 1,
      trigger: projectExtraEntry,
      end: "top center",
    }
  })
projectExtraEntry.forEach((entry) => {
tl.from(entry, {
    opacity: 0,
    y: () => "+=" + (window.innerHeight/10),
    duration: 1,
  });
});
}
mainTl.add(horizontalScroll())
      .add(aboutDisappear())
      .add(expDisappear())
      .add(projectAppear())
      .add(projectExtraAppear());