export type FormComponent<ComponentType, FormValue> = (ComponentType extends Pick<HTMLElement, "onchange">
    ? Omit<ComponentType, "onchange">
    : ComponentType) & { onChange: (arg: FormValue | null) => void };