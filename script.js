import { setUpPhotoModal, updateNavbarUponCurrentScreenWidth, updateElementsUponCurrentScreenWidth } from "./modules/functions.js";
import { galleryImgs } from "./modules/data.js";

galleryImgs.forEach((img, index) => {
    img.addEventListener("click", () => setUpPhotoModal(img, index));
});

updateNavbarUponCurrentScreenWidth();
addEventListener("resize", updateElementsUponCurrentScreenWidth);