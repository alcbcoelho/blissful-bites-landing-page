export default class Blur {
  static BLURRED_ELEMENTS = [
    document.querySelector("header"),
    ...document.querySelectorAll("section"),
    document.querySelector("footer"),
  ];

  static BLUR_CLASS = "blur";

  static blurPage() {
    this.BLURRED_ELEMENTS.forEach(
      (element) =>
        !element.classList.contains(this.BLUR_CLASS) &&
        element.classList.add(this.BLUR_CLASS)
    );
  }

  static unblurPage() {
    this.BLURRED_ELEMENTS.forEach((element) => {
      element.classList.contains(this.BLUR_CLASS) &&
        element.classList.remove(this.BLUR_CLASS);
    });
  }
}
