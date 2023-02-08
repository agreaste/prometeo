import {createContext, Dispatch, ReactNode} from "react";

export interface Slide {
    id: string;
    content: ReactNode;
}

export interface CarouselSlice {
    slides: Slide[];
    active: number;
    activeId: (state: CarouselSlice) => string;
    autoplay: boolean;
}

type RegisterSlide = { type: "slide/register", payload: Slide };
type UnregisterSlide = { type: "slide/unregister", payload: Slide };
type SelectSlide = { type: "slide/select", payload: number };
type StartSlideshow = { type: "slideshow/start" };
type StopSlideshow = { type: "slideshow/stop" };
type ShowNextSlide = { type: "slide/next" };
type ShowPreviousSlide = { type: "slide/previous" };

export type CarouselAction =
    RegisterSlide
    | UnregisterSlide
    | SelectSlide
    | StartSlideshow
    | StopSlideshow
    | ShowNextSlide
    | ShowPreviousSlide;

export const carouselReducer = (state: CarouselSlice, action: CarouselAction) => {
    switch(action.type) {
        case "slide/register":
            return {
                ...state,
                slides: [
                    ...state.slides,
                    action.payload
                ]
            };
        case "slide/unregister":
            return {
                ...state,
                slides: state.slides.filter(({id}) => id !== action.payload.id)
            };
        case "slide/select":
            return {
                ...state,
                active: Math.abs(action.payload) % state.slides.length
            };
        case "slide/next":
            return  {
                ...state,
                active: Math.min(state.active + 1, state.slides.length - 1)
            };
        case "slide/previous":
            return  {
                ...state,
                active: Math.max(state.active - 1, 0)
            };
        case "slideshow/start":
            return {
                ...state,
                autoplay: true
            };
        case "slideshow/stop":
            return {
                ...state,
                autoplay: false
            };
    }
};

export const initialCarouselState: CarouselSlice = {
    slides: [],
    active: 0,
    autoplay: false,
    activeId: ({slides, active}) => {
        return slides[active]?.id;
    }
};

export const CarouselContext = createContext(initialCarouselState);
export const CarouselDispatchContext = createContext<Dispatch<CarouselAction>>((a: CarouselAction) => void a);