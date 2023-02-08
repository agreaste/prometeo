import {
    FC,
    HTMLAttributes,
    useRef,
    useEffect, useContext, useReducer
} from "react";
import Slide from "./Slide";
import {CarouselContext, CarouselDispatchContext, carouselReducer, initialCarouselState} from "./context";

export interface ICarousel extends HTMLAttributes<HTMLDivElement> {
    delay?: number;
    initialAutoplay?: boolean;
    onAutoplayChange?: (value: boolean) => void;
}

const Carousel: FC<ICarousel> = ({
    delay = 5000,
    children,
    initialAutoplay = false,
    onAutoplayChange,
    ...props
}: ICarousel) => {
    const [state, dispatch] = useReducer(carouselReducer, {...initialCarouselState, autoplay: initialAutoplay});
    const autoplayRef = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
        if(state.autoplay) {
            autoplayRef.current = setInterval(() => {
                dispatch({
                    type: "slide/select",
                    payload: state.active + 1
                });
            }, delay);
        } else {
            if(autoplayRef.current)
                clearInterval(autoplayRef.current);
        }

        if(onAutoplayChange)
            onAutoplayChange(state.autoplay);

        return () => {
            if(autoplayRef.current)
                clearInterval(autoplayRef.current);
        };
    }, [state.autoplay]);

    return <CarouselContext.Provider value={state}>
        <CarouselDispatchContext.Provider value={dispatch}>
            <div {...props} role={"group"} aria-roledescription={"carousel"}>
                {children}
            </div>
        </CarouselDispatchContext.Provider>
    </CarouselContext.Provider>;
};

Carousel.displayName = "Carousel";

export const SlideWrapper = ({children, ...props}: HTMLAttributes<HTMLDivElement>) => {
    const {autoplay} = useContext(CarouselContext);
    return <div {...props} aria-atomic={"false"} aria-live={autoplay ? "off" : "polite"}>
        {children}
    </div>;
};

interface CarouselButton extends Exclude<HTMLAttributes<HTMLButtonElement>, "aria-label"> {
    "aria-label": string;
}

const NextButton: FC<CarouselButton> = (props) => {
    const dispatch = useContext(CarouselDispatchContext);

    const clickCallback = () => {
        dispatch({
            type: "slide/next"
        });
    };

    return <button {...props} onClick={clickCallback}/>;
};

NextButton.displayName = "NextButton";

const BackButton: FC<CarouselButton> = (props) => {
    const dispatch = useContext(CarouselDispatchContext);

    const clickCallback = () => {
        dispatch({
            type: "slide/previous"
        });
    };

    return <button {...props} onClick={clickCallback}/>;
};

BackButton.displayName = "BackButton";

const PlayButton: FC<CarouselButton> = (props) => {
    const {autoplay} = useContext(CarouselContext);
    const dispatch = useContext(CarouselDispatchContext);

    const clickCallback = () => {
        dispatch({
            type: autoplay ? "slideshow/stop" : "slideshow/start"
        });
    };

    return <button {...props} onClick={clickCallback}/>;
};

PlayButton.displayName = "PlayButton";

export default Object.assign(Carousel, {NextButton, BackButton, PlayButton, SlideWrapper, Slide});