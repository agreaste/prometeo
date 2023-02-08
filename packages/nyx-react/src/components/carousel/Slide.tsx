import {FC, HTMLAttributes, useContext, useEffect, useRef} from "react";
import {CarouselContext, CarouselDispatchContext} from "./context";

export type ISlide = HTMLAttributes<HTMLDivElement>;

const Slide: FC<ISlide> = ({children, ...props}: ISlide) => {
    const state = useContext(CarouselContext);
    const dispatch = useContext(CarouselDispatchContext);
    const id = useRef(Math.random().toString());

    useEffect(() => {
        dispatch({
            type: "slide/register",
            payload: {
                id: id.current,
                content: children
            }
        });

        return () => {
            dispatch({
                type: "slide/unregister",
                payload: {
                    id: id.current,
                    content: children
                }
            });
        };
    }, []);

    if(id.current !== state.activeId(state))
        return null;

    return <div role={"group"} aria-roledescription={"slide"} {...props}>
        {children}
    </div>;
};

Slide.displayName = "Slide";

export default Slide;