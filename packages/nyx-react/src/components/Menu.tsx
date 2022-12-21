import {
    Children,
    forwardRef,
    useState,
    useEffect,
    useRef,
    useCallback,
    PropsWithChildren,
    KeyboardEventHandler, MutableRefObject
} from "react";
import useArrowNav from "../hooks/useArrowNav.js";
import MenuItem from "./MenuItem.js";

export interface IMenu {
    cta: string;
    styles: {
        wrapper?: string;
        trigger?: string;
        container?: string;
        item?: string;
    };
}

const Menu = forwardRef<HTMLElement, PropsWithChildren<IMenu>>(({cta, children, styles = {}, ...props}, ref) => {
    const {wrapper = "", trigger = "", container = "", item = ""} = styles;
    const triggerRef = ref as MutableRefObject<any>;
    const menuRef = useRef(null);
    const idPrefix = useRef(Math.random());
    const items = Children.toArray(children);

    const [expanded, setExpanded] = useState(false);
    const [refs, handler, active, resetActive] = useArrowNav(items.length, "vertical");

    const id = useCallback((index: number) => idPrefix.current + "__item__" + index, [idPrefix]);

    useEffect(() => {
        if ([wrapper, trigger, container, item].some(style => !style))
            console.warn("Menu component doesn't come with default styles.")
    }, [])

    useEffect(() => {
        if (expanded && active >= 0 && refs[active])
            refs[active].current.focus();
    }, [expanded, active, refs]);


    const openCallback = () => {
        resetActive();
        setExpanded(true);
    };

    const keyHandler: KeyboardEventHandler = (event) => {
        switch (event.key) {
            case "ArrowUp":
                if (active > 0) {
                    break;
                }
            case "Escape":
                setExpanded(false)
                triggerRef.current.focus();
                break;
            default:
            // do nothing
        }

        handler(event);
    };

    return (<div className={wrapper}>
        <button
            {...props}
            className={trigger}
            ref={triggerRef}
            aria-haspopup="menu"
            aria-expanded={expanded}
            onClick={openCallback}
            onKeyUp={({key}) => {
                if (key === "ArrowDown")
                    setExpanded(true);
            }}>{cta}</button>
        {expanded && <div ref={menuRef} role="menu"
                          onBlur={({relatedTarget, currentTarget}) => {
                              if (!currentTarget.contains(relatedTarget))
                                  setExpanded(false);
                          }}
                          tabIndex={-1}
                          className={container}
                          onKeyUp={keyHandler}>
            {items && items.map((el, i) => <MenuItem
                tabIndex={-1}
                key={i}
                ref={refs[i]}
                id={id(i)}
                onClick={() => {
                    setExpanded(false);
                }}
                className={[item].join(" ")}>
                {el}
            </MenuItem>)}
        </div>}
    </div>);
});

export default Menu;