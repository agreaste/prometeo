import {
    useEffect,
    useRef,
    useCallback,
    useState,
    KeyboardEvent,
    FocusEventHandler, HTMLAttributes, ReactElement, RefAttributes, FC, forwardRef, RefObject
} from "react";
import useArrowNav from "../../hooks/useArrowNav";
import mergeProps, {isComponent} from "../../utils/mergeProps";
import Option, {IOption} from "./Option";
import {FormComponent} from "../../utils/FormComponent";
import useExtractComponent from "../../hooks/useExtractComponent";

interface ListBox extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    label: string | RefObject<HTMLElement>;
    placeholder?: string;
    initialValue?: never;
    children: ReactElement<IOption | ListBoxButton>[];
}

export type IListBox = FormComponent<ListBox, never>;

let ListBox: FC<IListBox> = ({
    label,
    className,
    placeholder,
    children
}: IListBox) => {
    const listRef = useRef<HTMLUListElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const idPrefix = useRef(Math.random());

    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    const items = children.flat().filter((child) => isComponent(child, Option)) as ReactElement<IOption>[];

    const [refs, handler, active, resetActive] = useArrowNav<HTMLLIElement>(items.length + 1, "vertical");

    const id = useCallback((index: number) => idPrefix.current + "__option__" + index, [idPrefix]);

    useEffect(() => {
        if (expanded && active >= 0 && refs[active])
            refs[active].current?.focus();
    }, [expanded, active, refs]);

    const openCallback = () => {
        resetActive(0);
        setExpanded(true);
    };

    const triggerButton = useExtractComponent(children, Button, {
        ref: triggerRef,
        onClick: openCallback,
        role: "combobox",
        "aria-expanded": expanded,
        "aria-activedescendant": expanded ? id(active) : undefined,
        ...(typeof label === "string"
            ? {"aria-label": label}
            : {"aria-labelledby": label.current?.id}),
        children: selected !== null ? items[selected].props.children : placeholder
    }, [expanded, active, label, selected]);

    const keyHandler = (event: KeyboardEvent<Element>) => {
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

    const clickHandler = (i: number | null) => {
        setExpanded(false);
        setSelected(i);
        triggerRef?.current?.focus();
    };

    const keydownHandler = useCallback((event: KeyboardEvent<Element>, i: number | null) => {
        switch (event.key) {
            case " ":
            case "Enter":
                setExpanded(false);
                setSelected(i);
                event.preventDefault();
                event.stopPropagation();
                triggerRef?.current?.focus();
                break;
        }
    }, [triggerRef]);

    return (<div className={className} onKeyDown={(event) => {
        switch (event.key) {
            case "ArrowUp":
            case "ArrowDown":
                event.preventDefault();
                break;
        }
    }}>
        {
            triggerButton
        }
        {expanded &&
            <ul ref={listRef} role="listbox"
                onBlur={blurHandler}
                tabIndex={-1}
                onKeyUp={keyHandler}>
                <Option key={0} id={id(0)} ref={refs[0]} name={""} onClick={() => clickHandler(null)}
                    onKeyDownCapture={(event: KeyboardEvent<Element>) => keydownHandler(event, null)}
                    value={null}>{placeholder}</Option>
                {
                    items && items.map((el: ReactElement<IOption>, i: number) => mergeProps<IOption & RefAttributes<HTMLElement>>(el, {
                        key: i + 1,
                        ref: refs[i + 1],
                        selected: i === selected,
                        id: id(i + 1),
                        onKeyDownCapture: (event: KeyboardEvent<Element>) => keydownHandler(event, i),
                        onClick: () => clickHandler(i)
                    }))
                }
            </ul>}
    </div>);
};

ListBox.displayName = "ListBox";

type ListBoxButton = HTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ListBoxButton>((props: ListBoxButton, ref) => {
    return <button {...props} role={"combobox"} aria-haspopup="listbox" ref={ref}/>;
});

Button.displayName = "ListBox.Button";

export default ListBox = Object.assign(ListBox, {Option, Button});
