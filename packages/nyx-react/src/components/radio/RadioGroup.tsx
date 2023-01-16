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

interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    label: string | RefObject<HTMLElement>;
    orientation?: "horizontal" | "vertical";
    children: ReactElement<IRadio>[];
}

export type IRadioGroup = FormComponent<RadioGroupProps, never>;

let RadioGroup = ({label, children, orientation, onChange, ...props}: IRadioGroup) => {
    const groupRef = useRef<HTMLDivElement>(null);
    const items = children.flat().filter(child => isComponent(child, Radio));
    const [selected, setSelected] = useState<number | null>(null);
    const values = useMemo(() => items.map((item) => item.props.value), [items]);

    const [refs, handler, active, setActive] = useArrowNav<HTMLElement>(items.length, orientation);

    useEffect(() => {
        if (!children.every(item => isComponent(item, Radio)))
            console.warn("RadioGroup component can only accept <Radio/> elements as children");
    });

    useEffect(() => {
        if (groupRef.current && groupRef.current.contains(document.activeElement) && refs[active]) {
            refs[active].current?.focus();
            setSelected(active);
        }

    }, [active, refs]);

    useEffect(() => {
        const value = typeof selected === "number" ? values[selected] : null;
        onChange(value);
    }, [selected, values]);

    const labelling: Pick<IRadioGroup, "aria-label" | "aria-labelledby"> = typeof label === "string"
        ? {"aria-label": label}
        : {"aria-labelledby": label.current?.id};

    return (<div ref={groupRef} {...labelling} role="radiogroup" onKeyUp={handler} {...props}>
        {items && items.map((el, i) => mergeProps<IRadio & RefAttributes<HTMLElement>>(el, {
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
