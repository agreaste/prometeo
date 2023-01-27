import {createContext, Dispatch, ReactNode} from "react";

export interface IOption<T = string> {
    id: string;
    label: string;
    value: T;
    content: ReactNode
}

type PopupType = "listbox" | "grid" | "tree" | "dialog";

export interface ComboBoxSlice<T = string> {
    options: IOption<T>[];
    active?: string;
    selected?: string;
    expanded: boolean;
    popupType?: PopupType;
    popupId?: string;
    selectedContent: (state: ComboBoxSlice<T>) => ReactNode;
    selectedOption: (state: ComboBoxSlice<T>) => IOption<T>;
}

type RegisterOption = { type: "option/register", payload: IOption<unknown>};
type UnregisterOption = { type: "option/unregister", payload: IOption<unknown>};
type ActivateOption = { type: "option/activate", payload: string };
type SelectOption = { type: "option/select", payload: string };
type RegisterPopup = { type: "popup/register", payload: { popup: PopupType, id: string } };
type OpenPopup = { type: "popup/open" };
type ClosePopup = { type: "popup/close" };

export type ComboBoxAction =
    RegisterOption
    | UnregisterOption
    | ActivateOption
    | SelectOption
    | RegisterPopup
    | OpenPopup
    | ClosePopup;

export const comboBoxReducer = <T extends any = string>(state: ComboBoxSlice<T>, action: ComboBoxAction) => {
    const {type} = action;
    switch (type) {
        case "option/register":
            if(state.options.some(({id}) => id === action.payload.id))
                return state;
            return {
                ...state,
                options: [
                    ...state.options,
                    action.payload
                ]
            };
        case "option/unregister":
            return {
                ...state,
                options: state.options.filter((option) => option !== action.payload)
            };
        case "option/activate":
            return {
                ...state,
                active: action.payload,
            };
        case "option/select":
            return {
                ...state,
                selected: action.payload,
                expanded: false
            };
        case "popup/register":
            return {
                ...state,
                popupType: action.payload.popup,
                popupId: action.payload.id
            };
        case "popup/open":
            return {
                ...state,
                expanded: true,
                active: state.selected ? state.selected : state.options[0]?.id
            };
        case "popup/close":
            return {
                ...state,
                expanded: false,
                active: undefined,
            };
    }
};

export const initialComboBoxState: ComboBoxSlice<unknown> = {
    options: [],
    expanded: false,
    selected: undefined,
    active: undefined,
    selectedOption: ({options, selected}) => options.find(({id}) => id === selected) as IOption,
    selectedContent: ({options, selected}) => options.find(({id}) => id === selected)?.content as ReactNode
};

export const ComboBoxContext = createContext<ComboBoxSlice<unknown>>(initialComboBoxState);
export const ComboBoxDispatchContext = createContext<Dispatch<ComboBoxAction>>((a: unknown) => void a);