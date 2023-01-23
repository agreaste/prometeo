import {
    useRef,
    useState,
    KeyboardEvent,
    FocusEventHandler, HTMLAttributes, ReactElement, RefObject, useMemo, ReactNode
} from "react";
import mergeProps from "../../utils/mergeProps";
import {FormComponent} from "../../utils/FormComponent";
import {ListBoxProps} from "./ListBox";

interface ComboBoxProps<T = string> extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    label: string | RefObject<HTMLElement>;
    placeholder?: string;
    listWrapClassName?: string;
    children: ReactElement<ListBoxProps<T>>;
}

export type IComboBox<T> = FormComponent<ComboBoxProps, T>;

const ComboBox = <T extends any = string>({
    label,
    className,
    children,
    onChange,
    placeholder
}: IComboBox<T>) => {
    const listRef = useRef<HTMLUListElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const idPrefix = useRef(Math.random());

    const [expanded, setExpanded] = useState(false);
    const pairs  = (children as ReactElement<ListBoxProps<T>>).props.children.map(({props: {value, children}}) => ({label: children, value}));
    const [selected, setSelected] = useState<{label: ReactNode, value: T} | undefined>(undefined);

    const keyHandler = (event: KeyboardEvent<Element>) => {
        switch (event.key) {
            case "ArrowUp":
            case "Escape":
                setExpanded(false);
                if (triggerRef && triggerRef.current)
                    triggerRef.current.focus();
                break;
            default:
            // do nothing
        }
    };

    const blurHandler: FocusEventHandler = ({relatedTarget, currentTarget}) => {
        if (!currentTarget.contains(relatedTarget))
            setExpanded(false);
    };

    const localOnChange = (arg: T) => {
        const selectedPair = pairs.find(({value}) =>  value === arg);

        if(selectedPair) {
            setSelected(selectedPair);
            onChange(selectedPair.value);
        }

        if (triggerRef.current)
            triggerRef.current.focus();
    };

    const list = useMemo(() => mergeProps(children, {
        key: idPrefix.current,
        id: idPrefix.current + "_listbox",
        ref: listRef,
        onBlur: blurHandler,
        onChange: localOnChange
    }), [children, onChange, listRef]);

    const openCallback = () => {
        setExpanded(true);
    };

    const labelling = (typeof label === "string"
        ? {"aria-label": label}
        : {"aria-labelledby": label.current?.id});

    return (<div className={className} onKeyDown={(event) => {
        switch (event.key) {
            case "ArrowUp":
            case "ArrowDown":
                event.preventDefault();
                break;
        }
    }}>
        <button {...labelling} role={"combobox"} aria-haspopup="listbox" ref={triggerRef} onClick={openCallback}>
            {selected ? selected.label : placeholder}
        </button>
        {expanded && <div key={idPrefix.current} onKeyDown={keyHandler}>
            {list}
        </div>}
    </div>);
};

export default ComboBox;
