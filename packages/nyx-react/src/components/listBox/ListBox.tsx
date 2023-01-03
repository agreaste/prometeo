import {
    useEffect,
    useRef,
    useCallback,
    useState,
    useMemo,
    PropsWithChildren,
    KeyboardEventHandler,
    FocusEventHandler
} from "react";
import useArrowNav from "../../hooks/useArrowNav";

export interface IListBox<T> {
    styles: {
        label?: string;
        wrapper?: string;
        trigger?: string;
        container?: string;
        item?: string;
    };

    name: string;
    placeholder: string;
    initialValue?: T;
    options: Array<IOption<T>>;
}

export interface IOption<T> {
    label: string;
    value: T;
}

const ListBox = <T extends never>({name, placeholder, options, styles = {}}: PropsWithChildren<IListBox<T>>) => {
    const {wrapper = "", trigger = "", container = "", item = "", label = ""} = styles;
    const listRef = useRef<HTMLUListElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const idPrefix = useRef(Math.random());

    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState<IOption<T> | null>(null);
    const fullOptions = useMemo(() => [null, ...options], [options]);
    const cta = useMemo(() => selected ? selected.label : placeholder ?? "Seleziona un'opzione", [selected]);

    const [refs, handler, active, resetActive] = useArrowNav<HTMLLIElement>(fullOptions.length, "vertical");

    const id = useCallback((index: number) => idPrefix.current + "__option__" + index, [idPrefix]);

    useEffect(() => {
        if ([wrapper, container, item].some(style => !style))
            console.warn("ListBox component doesn't come with default styles.");
    }, []);

    useEffect(() => {
        if (expanded && active >= 0 && refs[active])
            refs[active].current?.focus();
    }, [expanded, active, refs]);

    const openCallback = () => {
        resetActive(0);
        setExpanded(true);
    };

    const keyHandler: KeyboardEventHandler = (event) => {
        switch (event.key) {
            case "ArrowUp":
                if (active > 0) {
                    break;
                }
            case "Escape":
                setExpanded(false);
                if (triggerRef && triggerRef.current)
                    triggerRef.current.focus();
                break;
            default:
            // do nothing
        }

        handler(event);
    };

    const blurHandler: FocusEventHandler = ({relatedTarget, currentTarget}) => {
        if (!currentTarget.contains(relatedTarget))
            setExpanded(false);
    };

    return (<div className={wrapper} onKeyDown={(event) => {
        switch (event.key) {
            case "ArrowUp":
            case "ArrowDown":
                event.preventDefault();
                break;
        }
    }}>
        <p id={idPrefix.current + "_label"} className={label}>{name}</p>
        <button
            className={trigger}
            ref={triggerRef}
            role={"combobox"}
            aria-haspopup="listbox"
            aria-expanded={expanded}
            aria-labelledby={idPrefix.current + "_label"}
            onClick={openCallback}>{cta}</button>
        {expanded &&
            <ul ref={listRef} role="listbox"
                onBlur={blurHandler}
                tabIndex={-1}
                className={container}
                onKeyUp={keyHandler}>
                {fullOptions.map((el, i) => <li
                    role={"option"}
                    tabIndex={-1}
                    key={i}
                    ref={refs[i]}
                    id={id(i)}
                    onKeyDownCapture={(event) => {
                        switch (event.key) {
                            case " ":
                            case "Enter":
                                setSelected(fullOptions[i]);
                                setExpanded(false);
                                event.preventDefault();
                                event.stopPropagation();
                                triggerRef?.current?.focus();
                                break;
                        }
                    }}
                    onClick={() => {
                        setSelected(fullOptions[i]);
                        setExpanded(false);
                    }}
                    aria-selected={el === selected}
                    className={[item].join(" ")}>
                    {el ? el.label : placeholder ?? "Seleziona un'opzione"}
                </li>)}
            </ul>}
    </div>);
};

export default ListBox;
