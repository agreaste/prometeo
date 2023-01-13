import {FC, HTMLAttributes} from "react";

export type ISlide = HTMLAttributes<HTMLDivElement>;

const Slide: FC<ISlide> = ({children, ...props}: ISlide) => {
    return <div role={"group"} aria-roledescription={"slide"} {...props}>
        {children}
    </div>;
};

Slide.displayName = "Slide";

export default Slide;