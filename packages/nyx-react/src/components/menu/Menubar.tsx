import {Children, useEffect, useRef, useCallback, PropsWithChildren} from "react";
import useArrowNav from "../../hooks/useArrowNav";
import MenuItem from "./MenuItem";

export interface IMenubar {
    styles: {
        wrapper?: string;
        container?: string;
        item?: string;
    };
}

const Menubar = ({children, styles = {}}: PropsWithChildren<IMenubar>) => {
    const {wrapper = "", container = "", item = ""} = styles;
    const menuRef = useRef<HTMLDivElement>(null);
    const idPrefix = useRef(Math.random());
    const items = Children.toArray(children);

    const [refs, handler, active] = useArrowNav<HTMLElement>(items.length);

    const id = useCallback((index: number) => idPrefix.current + "__item__" + index, [idPrefix]);

    useEffect(() => {
        if ([wrapper, container, item].some(style => !style))
            console.warn("Menubar component doesn't come with default styles.");
    }, []);

    useEffect(() => {
        if (menuRef.current && menuRef.current.contains(document.activeElement) && active >= 0 && refs[active])
            refs[active].current?.focus();
    }, [active, refs]);

    return (<div className={wrapper} onKeyDown={(event) => {
        switch (event.key) {
            case "ArrowUp":
            case "ArrowDown":
                event.preventDefault();
                break;
        }
    }}>
        <div ref={menuRef} role="menubar" className={container} onKeyUp={handler}>
            {items && items.map((el, i) => <MenuItem
                key={i}
                tabIndex={!i ? i : -1}
                ref={refs[i]}
                id={id(i)}
                className={[item].join(" ")}>
                {el}
            </MenuItem>)}
        </div>
    </div>);
};

export default Menubar;
