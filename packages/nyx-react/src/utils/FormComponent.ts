export type FormComponent<ComponentType, FormValue> =( ComponentType extends Pick<HTMLElement, "onchange">
    ? Omit<ComponentType, "onchange">
    : ComponentType) & ComponentType & { onChange: (arg: FormValue) => void};