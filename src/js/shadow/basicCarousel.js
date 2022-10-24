import {BehaviorSubject} from "rxjs";
import "../../styles/components/carousel.css";

class BasicCarousel extends HTMLDivElement {
    slides;
    activeSlide;
    autoplay;
    slideWrapper;

    constructor() {
        const self = super();
        this.slides = Array.from(self.querySelectorAll('[aria-roledescription="slide"]'));
        this.slideWrapper = this.slides[0].parentNode;
        this.shadowBuilder(self);
    }

    shadowBuilder(root) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        this.activeSlide = new BehaviorSubject(this.slides[0]);

        this.activeSlide.asObservable().subscribe(target => {
            this.slides.forEach((slide) => {
                if (slide === this.activeSlide.getValue()) {
                    slide.classList.add('carousel_slide--active');
                } else {
                    slide.classList.remove('carousel_slide--active');
                }
            });
        });

        this.startAutoplay();
    }

    nextSlide() {
        const currentIndex = this.slides.findIndex(el => el === this.activeSlide.getValue());
        let nextSlideIndex = Math.min(currentIndex + 1, this.slides.length - 1);

        if (nextSlideIndex === currentIndex)
            nextSlideIndex = 0;

        this.activeSlide.next(this.slides[nextSlideIndex]);
    }

    previousSlide() {
        const nextSlideIndex = Math.max(this.slides.findIndex(el => el === this.activeSlide.getValue()) - 1, 0);
        this.activeSlide.next(this.slides[nextSlideIndex]);
    }

    startAutoplay() {
        if (!this.autoplay)
            this.autoplay = new BehaviorSubject(setInterval(() => {
                this.nextSlide();
            }, 4000));
        else
            this.autoplay.next(setInterval(() => {
                this.nextSlide();
            }, 4000));
    }

    stopAutoplay() {
        if (this.autoplay.getValue()) {
            clearInterval(this.autoplay.getValue())
            this.autoplay.next(false);
        }
    }

    handleRotation() {
        if (this.autoplay.getValue())
            this.stopAutoplay();
        else
            this.startAutoplay();

        return !!this.autoplay.getValue();
    }
}

class CarouselButton extends HTMLButtonElement {
    parentCarousel;

    constructor() {
        const self = super();
        this.parentCarousel = self.closest('[aria-roledescription="carousel"]')
    }
}

export class CarouselControl extends CarouselButton {
    constructor() {
        const self = super();

        self.addEventListener('click', (event) => {
            const play = this.parentCarousel.handleRotation();

            if (play) {
                self.innerHTML = '<span class="fa-solid fa-pause w-6 h-6"></span><span class="sr-only">Stop slide rotation</span>';
                this.parentCarousel.slideWrapper.setAttribute('aria-live', 'off');
            }
            else {
                self.innerHTML = '<span class="fa-solid fa-play ml-1 w-6 h-6"></span><span class="sr-only">Start slide rotation</span>';
                this.parentCarousel.slideWrapper.setAttribute('aria-live', 'polite');
            }
        });
    }
}

export class CarouselPrevious extends CarouselButton {
    constructor() {
        const self = super();

        self.addEventListener('click', (event) => {
            this.parentCarousel.previousSlide();
        });
    }
}

export class CarouselNext extends CarouselButton {
    constructor() {
        const self = super();

        self.addEventListener('click', (event) => {
            this.parentCarousel.nextSlide();
        });
    }
}

export default BasicCarousel;