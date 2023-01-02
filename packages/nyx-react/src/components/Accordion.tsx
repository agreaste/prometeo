import {ReactElement, useEffect, KeyboardEvent, RefAttributes} from "react";
import useArrowNav from "../hooks/useArrowNav";
import {IAccordionPanel} from "./AccordionPanel";
import mergeProps from "../utils/mergeProps";

export interface IAccordion {
    children: ReactElement<Omit<IAccordionPanel, "styles">>[];
    styles: {
        wrapper?: string;
        heading?: string;
        panel?: string;
    };
}

const Accordion = ({children, styles: {wrapper, heading, panel}}: IAccordion) => {
    const [refs, handler, active, setActive] = useArrowNav<HTMLButtonElement>(children.length, "vertical");

    useEffect(() => {
        if ([wrapper, heading, panel].some(style => !style))
            console.warn("Accordion component doesn't come with default styles.");
    }, []);

    useEffect(() => {
        if (refs[active] && refs[active].current)
            refs[active].current?.focus();
    }, [active]);

    return <div className={wrapper}>
        {
            children.map((accordionPanel, i) => mergeProps<IAccordionPanel & RefAttributes<HTMLButtonElement>>(accordionPanel, {
                key: i,
                ref: refs[i],
                styles: {heading, panel},
                onKeyDown: (event: KeyboardEvent) => {
                    if (["ArrowUp", "ArrowDown"].includes(event.key))
                        event.preventDefault();
                },
                onKeyUp: (event: KeyboardEvent) => {
                    handler(event);
                },
                onFocus: () => {
                    setActive(i);
                }
            }))
        }
    </div>;
};

export default Accordion;