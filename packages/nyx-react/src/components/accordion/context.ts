import {createContext, ReactNode} from "react";

export interface Slide {
    
}

export interface AccordionSlice {
    slides: Slide[];
    active: number;
    selectedSlide: (state: AccordionSlice) => ReactNode;
}

export const accordionreducer = (state: {}, action: {}) => {
    
};

export const initialAccordionState = {
    
};

export const AccordionContext = createContext(null);
export const AccordionDispatchContext = createContext(null);