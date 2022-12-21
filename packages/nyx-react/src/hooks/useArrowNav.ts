import {createRef, KeyboardEventHandler, RefObject, useCallback, useEffect, useState} from "react";

export default function useArrowNav(itemsLength: number, orientation = "horizontal"): [RefObject<any>[], KeyboardEventHandler, number, () => void] {
    const [refs, setRefs] = useState<RefObject<any>[]>([]);
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

    const arrowHandler: KeyboardEventHandler = ({key}) => {
        switch (orientation) {
            case "vertical":
                switch (key) {
                    case "ArrowUp":
                        setCurrentPosition(previousPosition());
                        break;
                    case "ArrowDown":
                        setCurrentPosition(nextPosition());
                        break;
                    default:

                }
                break;
            default:
                switch (key) {
                    case "ArrowLeft":
                        setCurrentPosition(previousPosition());
                        break;
                    case "ArrowRight":
                        setCurrentPosition(nextPosition());
                        break;
                    default:
                }
        }
    };

    const resetPosition = useCallback(() => {
        setCurrentPosition(0);
    }, [setCurrentPosition, currentPosition])

    return [refs, arrowHandler, currentPosition, resetPosition];
}