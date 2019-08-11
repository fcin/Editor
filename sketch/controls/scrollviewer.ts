import { Scrollbar } from "./scrollbar";
import { Point2D } from "../geometry";
import { Consts } from "../sketch";
import { UIItem } from "../abstractions/uiItem";

export class ScrollViewer {
    position: Point2D;
    size: Point2D;
    scrollbar: Scrollbar;
    items: UIItem[] = [];
    lastPositionY: number;
    direction: number;
    
    constructor(position: Point2D, size: Point2D) {
        this.position = position;
        this.size = size;
        this.scrollbar = new Scrollbar(new Point2D(position.x, position.y), new Point2D(50, 10), size.y);
        this.lastPositionY = 0;
        this.direction = 1;
        Consts.mediator.on('onMouseDragged', (position: Point2D) => {
            let visualPosition = new Point2D(position.x - (Consts.p.windowWidth / 2),
                                                position.y - (Consts.p.windowHeight / 2));
            
            if(Consts.p.mouseIsPressed && this.scrollbar.intersects(visualPosition))
            {
                let oldValue = visualPosition.y;
                let oldMax = Consts.p.windowHeight;
                let oldMin = 0;
                let newMax = this.scrollbar.maxHeight;
                let newMin = 0;

                if(oldMax - oldMin === 0)
                    return;

                let newValue = (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + visualPosition.y;
                if(newValue > this.size.y)
                    newValue = this.size.y;
                if(newValue < 0)
                    newValue = 0;

                this.direction = newValue >= this.lastPositionY ? 1 : -1;
                this.lastPositionY = newValue;

                console.log(this.direction);

                if(this.direction > 0)
                    this.scrollbar.setHeight(newValue);
                else
                    this.scrollbar.setHeight((this.scrollbar.size.y - newValue) * -1);
                this.scrollItems();
            }
        });
    }

    display() : void {
        Consts.p.push();
        Consts.p.fill('#333');
        Consts.p.rect(this.position.x, this.position.y, this.size.x, this.size.y);
        Consts.p.pop();
        this.scrollbar.display();
    }

    addItem(item: UIItem) {
        this.items.push(item);
    }

    private scrollItems() {
        this.items.forEach(item => {
            let container = item.container;
            let containerSizeY = container.size.y;
            let scale = this.scrollbar.currentHeight / this.size.y;

            let newY = (containerSizeY * scale);
            
            item.scroll(new Point2D(0, newY * this.direction));
        });
    }
}