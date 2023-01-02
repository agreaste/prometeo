import {createRef, KeyboardEventHandler, RefObject, useEffect, useState} from "react";

export default function useArrowNav<HT>(itemsLength: number, orientation = "horizontal"): [RefObject<HT>[], KeyboardEventHandler, number, (pos:number) => void] {
    const [refs, setRefs] = useState<RefObject<HT>[]>([]);
    const [currentPosition, setCurrentPosition] = useState(0);

    useEffect(() => {
        setRefs(Array(itemsLength)
            .fill(null)
            .map((_, i) => refs[i] || createRef()));

    }, [itemsLength]);

    const nextPosition = () => {
        return Math.min(currentPosition + 1, itemsLength - 1);
    };

    const previousPosition = () => {
        return Math.max(0, currentPosition - 1);
    };

    const arrowHandler: KeyboardEventHandler = (event) => {
        switch (orientation) {
            case "vertical":
                switch (event.key) {
                    case "ArrowUp":
                        event.preventDefault();
                        setCurrentPosition(previousPosition());
                        break;
                    case "ArrowDown":
                        event.preventDefault();
                        setCurrentPosition(nextPosition());
                        break;
                    default:

                }
                break;
            default:
                switch (event.key) {
                    case "ArrowLeft":
                        event.preventDefault();
                        setCurrentPosition(previousPosition());
                        break;
                    case "ArrowRight":
                        event.preventDefault();
                        setCurrentPosition(nextPosition());
                        break;
                    default:
                }
        }
    };

    return [refs, arrowHandler, currentPosition, setCurrentPosition];
}