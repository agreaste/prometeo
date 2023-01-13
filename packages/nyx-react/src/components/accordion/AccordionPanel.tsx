import {
    Attributes,
    ButtonHTMLAttributes,
    forwardRef,
    PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

export interface IAccordionPanel extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">, Attributes {
    title: string;
    level?: number;
    styles?: {
        heading?: string;
        panel?: string;
    }
}

const AccordionPanel = forwardRef<HTMLButtonElement, PropsWithChildren<IAccordionPanel>>(({
    title,
    level,
    children,
    styles: {heading, panel} = {},
    ...buttonProps
}: PropsWithChildren<IAccordionPanel>, ref) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);
    const headingId = useMemo(() => `accordion__${title}__heading`, [title]);
    const panelId = useMemo(() => `accordion__${title}__panel`, [title]);

    useEffect(() => {
        if(expanded && panelRef.current) {
            panelRef.current.focus();
        }
    }, [expanded]);

    return <>
        <div role={"heading"} aria-level={level} id={headingId} className={heading}>
            <button
                {...buttonProps}
                ref={ref}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setExpanded(!expanded)}>{title}</button>
        </div>
        {expanded && <div ref={panelRef} tabIndex={-1} role={"region"} id={panelId} aria-labelledby={headingId} className={panel}>
            {children}
        </div>}
    </>;
});

AccordionPanel.displayName = "AccordionPanel";

export default AccordionPanel;