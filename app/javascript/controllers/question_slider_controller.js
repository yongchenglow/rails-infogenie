import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="question-slider"
export default class extends Controller {
  static targets = ["qSlides","qDots"]
  connect() {
    console.log(this.qSlidesTargets, this.qDotsTarget);
    this.qDotsTarget.classList.add("active")
  }

  _curSlide = 0;
  _maxSlide = this.qSlidesTargets.length - 1 ;

  slideRight() {
    if (this._curSlide === this._maxSlide) {
      this._curSlide = 0;
    } else {
      this._curSlide++;
    }
    this.qDotsTargets.forEach(dot => dot.classList.remove("active"));
    this.qSlidesTargets.forEach((s,i) => s.style.transform = `translateX(${110 * (i - this._curSlide)}%)`)
    document.querySelector(`.qdots_dot[data-slide="${this._curSlide}"]`).classList.add("active");

  }

  slideLeft() {
    if (this._curSlide === 0) {
      this._curSlide = this._maxSlide;
    } else {
      this._curSlide--;
    }
    this.qDotsTargets.forEach(dot => dot.classList.remove("active"));
    this.qSlidesTargets.forEach((s,i) => s.style.transform = `translateX(${110 * (i - this._curSlide)}%)`)
    document.querySelector(`.qdots_dot[data-slide="${this._curSlide}"]`).classList.add("active");
  }

}
