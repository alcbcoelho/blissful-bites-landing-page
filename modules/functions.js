import Blur from "./classes/Blur.js";
import { checkScreenSize, galleryImgs } from "./data.js";

function setUpPhotoModal(img, index) {
  // blur page
  Blur.blurPage();

  // create modal
  const modal = createPhotoModal(img);

  // select elements
  const photoLink = modal.querySelector("a");
  const photo = photoLink.querySelector("img");

  const closeButton = document.querySelector("#close-button");
  const forwardButton = document.querySelector("#forward-button");
  const backwardButton = document.querySelector("#backward-button");

  // close modal
  closeButton.addEventListener("click", () => closePhotoModal(modal));
  modal.addEventListener("click", () => closePhotoModal(modal));

  // stop default capture behavior (prevent modal from closing upon clicking on children elements)
  photo.addEventListener("click", (e) => e.stopPropagation());
  forwardButton.addEventListener("click", (e) => {
    e.stopPropagation();
    loadPreviousOrNextPhoto(img, index);
  });
  backwardButton.addEventListener("click", (e) => {
    e.stopPropagation();
    loadPreviousOrNextPhoto(img, index, false);
  });
}

function createPhotoModal(img) {
  const photoModalOverlayDiv = document.createElement("div");
  photoModalOverlayDiv.className = "overlay";

  const photoModalButtonDivs = [
    ["close-button", "Fechar"],
    ["backward-button", "Imagem anterior"],
    ["forward-button", "Imagem seguinte"],
  ].map(([id, title]) => {
    const div = document.createElement("div");
    div.id = id;
    div.className = "modal-btn";
    div.title = title;
    return div;
  });

  const photoModalButtonIcons = [
    "fa-solid fa-xmark",
    `fa-solid ${
      checkScreenSize.xs() ? "fa-arrow-up" : "fa-arrow-left"
    } 2xl:text-lg`,
    `fa-solid ${
      checkScreenSize.xs() ? "fa-arrow-down" : "fa-arrow-right"
    } 2xl:text-lg`,
  ].map((className) => {
    const i = document.createElement("i");
    i.className = className;
    return i;
  });

  photoModalButtonDivs.forEach((div, index) => {
    div.appendChild(photoModalButtonIcons[index]);
    photoModalOverlayDiv.appendChild(div);
  });

  const photoContainer = document.createElement("div");
  const photoLink = document.createElement("a");
  const photo = document.createElement("img");
  photoContainer.id = "photo-container";
  photoLink.setAttribute("href", img.src);
  photoLink.setAttribute("target", "_blank");
  photo.setAttribute("src", img.src);
  photo.setAttribute("alt", img.alt);
  photoLink.appendChild(photo);
  photoContainer.appendChild(photoLink);

  photoModalOverlayDiv
    .querySelector("#backward-button")
    .insertAdjacentElement("afterend", photoContainer);

  document
    .querySelector("body")
    .insertAdjacentElement("afterbegin", photoModalOverlayDiv);

  return photoModalOverlayDiv;
}

function closePhotoModal(modal) {
  // unblur page
  Blur.unblurPage();

  // close modal
  modal.remove();
}

function loadPreviousOrNextPhoto(img, index, next = true) {
  const operator = next ? 1 : -1;

  index += operator;
  if (index === galleryImgs.length) index = 0;
  else if (index < 0) index = galleryImgs.length - 1;
  img = galleryImgs[index];

  closePhotoModal(document.querySelector(".overlay"));
  setUpPhotoModal(img, index);
}

function updateElementsUponCurrentScreenWidth() {
  updateModalIconsUponCurrentScreenWidth();
  updateNavbarUponCurrentScreenWidth();
}

function updateNavbarUponCurrentScreenWidth() {
  const sideMenu = document.querySelector(".side-menu");

  const navbar = document.querySelector("nav");
  const navUl = navbar.querySelector("ul");

  if (checkScreenSize.xs()) {
    navUl.classList.add("hidden");

    if (!navbar.querySelector("div")) {
      const navButtonDiv = document.createElement("div");
      const navButtonIcon = document.createElement("i");
      navButtonDiv.className = "size-6 flex justify-center items-center";
      navButtonIcon.className = "fa-solid fa-bars fa-xl";
      navButtonDiv.appendChild(navButtonIcon);

      navbar.insertAdjacentElement("afterbegin", navButtonDiv);
      navButtonDiv.addEventListener("click", () => {
        if (sideMenu.classList.contains("displaced")) openSideMenu();
        else closeSideMenu();

        if (!sideMenu.hasChildNodes()) {
          sideMenu.appendChild(replicateElement(navUl));

          const sideMenuLinks = document.querySelectorAll(".side-menu ul li a");
          sideMenuLinks.forEach((a) =>
            a.addEventListener("click", closeSideMenu)
          );
        }

        document
          .querySelector("#side-menu-overlay")
          ?.addEventListener("click", closeSideMenu);

        function closeSideMenu() {
          sideMenu.classList.add("displaced");
          document.querySelector("#side-menu-overlay")?.remove();
        }

        function openSideMenu() {
          sideMenu.classList.remove("displaced");
          createOverlayElement();
        }

        function createOverlayElement() {
          const overlayElement = document.createElement("div");

          overlayElement.id = "side-menu-overlay";
          overlayElement.classList.add("overlay");
          document
            .querySelector("body")
            .insertAdjacentElement("afterbegin", overlayElement);
        }
      });
    }
  } else {
    navUl.classList.contains("hidden") && navUl.classList.remove("hidden");
    navbar.querySelector("div") && navbar.querySelector("div").remove();
  }
}

function updateModalIconsUponCurrentScreenWidth() {
  const modal = document.querySelector(".overlay");

  if (modal) {
    let arr;
    galleryImgs.forEach((img, index) => {
      if (img.src === modal.querySelector("#photo-container a img").src)
        arr = [img, index];
    });

    closePhotoModal(modal);
    setUpPhotoModal(...arr);
  }
}

function replicateElement(element) {
  const elementClasses = element.className;

  const newElement = document.createElement(element.tagName);
  newElement.className = elementClasses;
  newElement.innerHTML = element.innerHTML;

  return newElement;
}

export {
  setUpPhotoModal,
  updateNavbarUponCurrentScreenWidth,
  updateElementsUponCurrentScreenWidth,
};
