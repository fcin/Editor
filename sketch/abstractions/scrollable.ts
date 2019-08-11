import { Point2D } from "../geometry";

export interface Scrollable {
    /**
     * 
     * @param amount In percentage of the container.
     */
    scroll(amount: Point2D): void;
}