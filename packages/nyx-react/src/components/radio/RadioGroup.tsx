import {
    useEffect,
    useRef,
    HTMLAttributes,
    ReactElement, RefAttributes, useState, RefObject, useMemo,
} from "react";
import useArrowNav from "../../hooks/useArrowNav";
import Radio, {IRadio} from "./Radio";
import mergeProps, {isComponent} from "../../utils/mergeProps";
import {FormComponent} from "../../utils/FormComponent";

interface RadioGroupProps<T = string> extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    label: string | RefObject<HTMLElement>;
    orientation?: "horizontal" | "vertical";
    children: ReactElement<IRadio<T>> | ReactElement<IRadio<T>>[];
}

export type IRadioGroup<T> = FormComponent<RadioGroupProps<T>, T>;

let RadioGroup = <T extends any = string>({label, children, orientation, onChange, ...props}: IRadioGroup<T>) => {
    const groupRef = useRef<HTMLDivElement>(null);
    const items = ("length" in children ?  children.flat() : [children]).filter(child => isComponent(child, Radio));
    const [selected, setSelected] = useState<number | null>(null);
    const values = useMemo(() => items.map((item) => item.props.value), [items]);

    const [refs, handler, active, setActive] = useArrowNav<HTMLElement>(items.length, orientation);

    useEffect(() => {
        if ("length" in children && !children.every(item => isComponent(item, Radio)) || !items.length)
            console.warn("RadioGroup component can only accept <Radio/> elements as children");
    });

    useEffect(() => {
        if (groupRef.current && groupRef.current.contains(document.activeElement) && refs[active]) {
            refs[active].current?.focus();
            setSelected(active);
        }

    }, [active, refs, setSelected]);

    useEffect(() => {
        if(selected !== null) {
            onChange(values[selected]);
        }
    }, [selected]);

    const labelling: Pick<IRadioGroup<T>, "aria-label" | "aria-labelledby"> = typeof label === "string"
        ? {"aria-label": label}
        : {"aria-labelledby": label.current?.id};

    return (<div ref={groupRef} {...labelling} role="radiogroup" onKeyUp={handler} {...props}>
        {items && items.map((el, i) => mergeProps<IRadio<T> & RefAttributes<HTMLElement>>(el, {
            key: i,
            ref: refs[i],
            selected: i === selected,
            tabIndex: i === active ? 0 : -1,
            onClick: () => {
                setActive(i);
                setSelected(i);
            },
            onKeyUp: ({key}) => {
                switch (key) {
                    case " ":
                    case "Enter":
                        setActive(i);
                        setSelected(i);
                        break;
                }
            }
        }))}
    </div>);
};

export default RadioGroup = Object.assign(RadioGroup, {Radio});
