import { Point2D } from '../geometry';
import { Scrollable } from './scrollable';

export interface UIItem extends Scrollable {
    position: Point2D;
    size: Point2D;
    display(): void;
    setPosition(position: Point2D): void;
    container: UIItem;
}