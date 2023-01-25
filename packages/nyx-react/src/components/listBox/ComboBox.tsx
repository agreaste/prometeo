import {
    useRef,
    useState,
    KeyboardEvent,
    FocusEventHandler, HTMLAttributes, ReactElement, RefObject, useMemo, useEffect
} from "react";
import mergeProps from "../../utils/mergeProps";
import {FormComponent} from "../../utils/FormComponent";
import {DumbListBox, DumbListBoxProps} from "./ListBox";
import Option from "./Option";
import useArrowNav from "../../hooks/useArrowNav";

interface ComboBoxProps<T = string> extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    label: string | RefObject<HTMLElement>;
    placeholder?: string;
    listWrapClassName?: string;
    children: ReactElement<DumbListBoxProps<T>>;
}

export type IComboBox<T> = FormComponent<ComboBoxProps, T>;

// This interface has no utility outside this module, it is just needed to pass displayName
interface ComboBoxComponent<T = string> {
    (props: IComboBox<T>, context: never): ReactElement | null;
    displayName?: string | undefined;
}

let ComboBox: ComboBoxComponent<unknown> = <T extends any = string>({
    label,
    className,
    children,
    onChange,
    placeholder
}: IComboBox<T>) => {
    const triggerRef = useRef<HTMLButtonElement>(null);

    const idPrefix = useRef(Math.random());

    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);

    const pairs = useMemo(() => (children as ReactElement<DumbListBoxProps<T>>).props.children.map(({
        props: {
            value,
            children
        }
    }) => ({label: children, value})), [children]);

    useEffect(() => {
        if(!expanded) console.log("closing popup (somehow??)");
        else console.log("opening popup (somehow??)");
    }, [expanded]);

    useEffect(() => {
        console.log("selected value changed: ", selected);
        if(selected !== null)
            onChange(pairs[selected].value);
        else
            onChange(null);

        console.log("closing popup");
        setExpanded(false);
    }, [selected]);

    const [refs, handler, active, setActive] = useArrowNav<HTMLLIElement>(pairs.length, "vertical");

    const keyHandler = (event: KeyboardEvent<Element>) => {
        switch (event.key) {
            case "Escape":
                if(expanded) {
                    setExpanded(false);
                    if (triggerRef && triggerRef.current)
                        triggerRef.current.focus();
                }
                break;
            default:
            // do nothing
        }

        handler(event);
    };

    const clickCallback = () => {
        console.log("click callback: ", expanded);
        if (!expanded)
            setExpanded(true);
        else {
            console.log("selecting option: ", active);
            setSelected(active);
        }
    };

    const blurHandler: FocusEventHandler = ({relatedTarget, currentTarget}) => {
        if (!currentTarget.contains(relatedTarget))
            setExpanded(false);
    };

    const localOnChange = (arg: T) => {
        const selectedPair = pairs.findIndex(({value}) => value === arg);

        if (selectedPair) {
            setSelected(selectedPair);
        }

        if (triggerRef.current)
            triggerRef.current.focus();
    };

    // TODO:
    // there must be a way to remap elements without recreating them (hopefully)
    const list = useMemo(() => mergeProps(children, {
        tabIndex: -1,
        key: idPrefix.current,
        id: idPrefix.current + "_listbox",
        onChange: localOnChange,
        onClick: () => {
            if(active === selected)
                setExpanded(false);
            else
                setSelected(active);
        },
        children: children.props.children.map(({props}, i) => <Option
            key={i}
            {...props}
            ref={refs[i]}
            id={`${idPrefix.current}_option_${i}`}
            selected={selected === i}
            data-active={i === active}
            style={(i === active ? { outline: "5px auto -webkit-focus-ring-color" } : undefined)}
            onMouseOver={() => setActive(i)}
        />)
    }), [children, onChange, selected, active]);

    const selectedLabel = useMemo(() => selected !== null ? pairs[selected].label : placeholder, [selected, pairs]);

    const labelling = useMemo( () => typeof label === "string"
        ? {"aria-label": label}
        : {"aria-labelledby": label.current?.id}, [label]);

    const activeDescendant = useMemo(() => expanded ? `${idPrefix.current}_option_${active}` : undefined, [active, expanded]);

    return (<div className={className} onKeyDown={(event) => {
        switch (event.key) {
            case "ArrowUp":
            case "ArrowDown":
                event.preventDefault();
                break;
        }
    }} onBlur={blurHandler}>
        <button {...labelling}
            role="combobox"
            aria-haspopup="listbox" aria-controls={idPrefix.current + "_listbox"} aria-expanded={expanded}
            aria-activedescendant={activeDescendant}
            ref={triggerRef} onClick={clickCallback}
            onKeyUp={keyHandler}>
            {selectedLabel}
        </button>
        {expanded && list}
    </div>);
};

ComboBox.displayName = "ComboBox";

export default ComboBox = Object.assign(ComboBox, {asListBox: DumbListBox, Option});
