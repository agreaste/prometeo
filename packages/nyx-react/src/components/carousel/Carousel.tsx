import {
    FC,
    HTMLAttributes,
    ReactElement,
    useMemo,
    useState,
    useRef,
    useEffect
} from "react";
import Slide, {ISlide} from "./Slide";
import {isComponent} from "../../utils/mergeProps";
import useExtractComponent, {useExtractComponents} from "../../hooks/useExtractComponent";

export interface ICarousel extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children: ReactElement<ISlide | ControlComponent>[];
    delay?: number;
    initialAutoplay?: boolean;
    playCallback?: () => void;
    slideWrapperClass?: string;
}

const isCallable = (fn: (() => void) | undefined): fn is () => void => (fn as () => void).apply !== undefined;

const Carousel: FC<ICarousel> = ({initialAutoplay = false, playCallback, delay = 5000, slideWrapperClass = "", children, ...props}: ICarousel) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [manageAutoplay, setManageAutoplay] = useState(initialAutoplay);
    const slides = useExtractComponents(children, Slide);
    const autoPlayId = useRef<null | NodeJS.Timer>(null);

    const nextClick = () => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1));
    const backClick = () => setActiveSlide(Math.max(0, activeSlide - 1));
    const playClick = () => {
        if (isCallable(playCallback)) {
            playCallback();
            setManageAutoplay(!manageAutoplay);
        }
    };

    // timer change on play click
    useEffect(() => {
        if (playCallback && manageAutoplay) {
            autoPlayId.current = setInterval(() => {
                setActiveSlide((activeSlide + 1) % slides.length); // cyclic slide rotation
            }, delay);
        } else if (autoPlayId.current) {
            clearInterval(autoPlayId.current);
        }

        return () => void (autoPlayId.current && clearInterval(autoPlayId.current));
    }, [manageAutoplay, playCallback, activeSlide]);

    const nextButton = useExtractComponent(children, NextButton, {onClick: nextClick});
    const backButton = useExtractComponent(children, BackButton, {onClick: backClick});
    const playButton = useExtractComponent(children, PlayButton, {
        onClick: playCallback ? playClick : undefined,
    });

    useEffect(() => {
        if (!nextButton) console.warn("Carousel is missing next button");
        if (!backButton) console.warn("Carousel is missing back button");
        if (playCallback && !playButton) console.warn("Carousel is missing play button");
    }, [nextButton, backButton, playButton]);

    return <div {...props} role={"group"} aria-roledescription={"carousel"}>
        {playCallback && playButton} {backButton} {nextButton}
        <div aria-atomic={"false"} aria-live={manageAutoplay ? "off" : "polite"} className={slideWrapperClass}>
            {slides[activeSlide]}
        </div>
    </div>;
};

Carousel.displayName = "Carousel";

type CarouselButton = HTMLAttributes<HTMLButtonElement>;
type CarouselNavigation = CarouselButton;

interface CarouselPlay extends Exclude<CarouselButton, "aria-label"> {
    "aria-label": string;
}

const NextButton: FC<CarouselNavigation> = (props) => {
    return <button {...props}/>;
};

NextButton.displayName = "NextButton";

const BackButton: FC<CarouselNavigation> = (props) => {
    return <button aria-label={"Next slide"} {...props}/>;
};

BackButton.displayName = "BackButton";

const PlayButton: FC<CarouselPlay> = (props) => {
    return <button {...props}/>;
};

type ControlComponent = typeof NextButton | typeof BackButton | typeof PlayButton;

PlayButton.displayName = "PlayButton";

export default Object.assign(Carousel, {NextButton, BackButton, PlayButton});