import {BehaviorSubject} from "rxjs";

class BasicCarousel extends HTMLDivElement {
    slides: Array<HTMLDivElement>;
    activeSlide: BehaviorSubject<HTMLDivElement>;
    autoplay: BehaviorSubject<any>;
    slideWrapper: ParentNode;

    constructor() {
        super();
        this.slides = Array.from(this.querySelectorAll("[aria-roledescription=\"slide\"]"));
        const sliderWrapper = this.slides[0].parentNode;

        if (sliderWrapper)
            this.slideWrapper = sliderWrapper;
        else
            throw new Error(`${this}: no parent element.`);

        this.activeSlide = new BehaviorSubject(this.slides[0]);

        this.autoplay = new BehaviorSubject(setInterval(() => {
            this.nextSlide();
        }, 4000));

        this.shadowBuilder(this);
    }

    shadowBuilder(_root: HTMLElement) {

        this.activeSlide.asObservable().subscribe(_target => {
            this.slides.forEach((slide) => {
                if (this.activeSlide && slide === this.activeSlide.getValue()) {
                    slide.classList.add("carousel_slide--active");
                } else {
                    slide.classList.remove("carousel_slide--active");
                }
            });
        });

        this.autoplay.asObservable().subscribe((autoplay) => {
            // this exploit layout thrashing to restart animation
            // this can also be achieved with element.style.animationPlayState switch
            void (this.slideWrapper as HTMLElement).offsetWidth;

            (this.slideWrapper as HTMLElement).setAttribute("aria-live", autoplay ? "off" : "polite");
        });

        this.startAutoplay();
    }

    nextSlide(stopSlide = false) {
        const currentIndex = this.slides.findIndex(el => el === this.activeSlide.getValue());
        let nextSlideIndex = Math.min(currentIndex + 1, this.slides.length - 1);

        if (nextSlideIndex === currentIndex)
            nextSlideIndex = 0;

        this.gotoSlide(nextSlideIndex, stopSlide);
    }

    previousSlide(stopSlide = false) {
        const nextSlideIndex = Math.max(this.slides.findIndex(el => el === this.activeSlide.getValue()) - 1, 0);
        this.gotoSlide(nextSlideIndex, stopSlide);
    }

    gotoSlide(slideIndex: number, stopSlide = false) {
        const isPlaying = this.autoplay.getValue();

        if(isPlaying && stopSlide)
            this.stopAutoplay();

        this.activeSlide.next(this.slides[slideIndex]);

        if(isPlaying && stopSlide)
            this.startAutoplay();
    }

    startAutoplay() {
        if (!this.autoplay)
            this.autoplay = new BehaviorSubject(setInterval(() => {
                this.nextSlide();
            }, 4000));
        else {
            clearInterval(this.autoplay.getValue());
            this.autoplay.next(setInterval(() => {
                this.nextSlide();
            }, 4000));
        }
    }

    stopAutoplay() {
        if (this.autoplay.getValue()) {
            clearInterval(this.autoplay.getValue());
            this.autoplay.next(null);
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
    parentCarousel: BasicCarousel;

    constructor() {
        super();
        const pc = this.closest("[aria-roledescription=\"carousel\"]");
        if (pc)
            this.parentCarousel = pc as BasicCarousel;
        else
            throw new Error(`${this}: no carousel parent element.`);

    }
}

export class CarouselControl extends CarouselButton {
    constructor() {
        super();

        if (!this.parentCarousel)
            throw new Error(`${this}: no carousel parent.`);

        this.addEventListener("click", (_event) => {
            const play = this.parentCarousel.handleRotation();

            if (play) {
                this.innerHTML = "<span class=\"fa-solid fa-pause w-6 h-6\"></span><span class=\"sr-only\">Stop slide rotation</span>";
            } else {
                this.innerHTML = "<span class=\"fa-solid fa-play ml-1 w-6 h-6\"></span><span class=\"sr-only\">Start slide rotation</span>";
            }
        });
    }
}

export class CarouselPrevious extends CarouselButton {
    constructor() {
        super();

        this.addEventListener("click", (_event: MouseEvent) => {
            this.parentCarousel.previousSlide(true);
        });
    }
}

export class CarouselNext extends CarouselButton {
    constructor() {
        super();

        this.addEventListener("click", (_event: MouseEvent) => {
            this.parentCarousel.nextSlide(true);
        });
    }
}

export default BasicCarousel;