declare class Two {
  type: Two.Types;

  width: number;
  height: number;
  constructor(params?: TwoConstructionParams);
  appendTo(element: HTMLElement);

  makeLine(x1: number, y1: number, x2: number, y2: number): Two.Shape;
  makeRectangle(x: number, y: number, width: number, height: number): Two.Shape;
  makeRoundedRectangle(x: number, y: number, width: number, height: number, radius: number): Two.Shape;
  makeCircle(x: number, y: number, radius: number): Two.Shape;
  makeEllipse(x: number, y: number, width: number, height: number): Two.Shape;

  makeCurve(x1: number, y1: number, open: boolean): Two.Shape;
  makeCurve(x1: number, y1: number, x2: number, y2: number, open: boolean): Two.Shape;
  makeCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, open: boolean): Two.Shape;

  makePolygon(x1: number, y1: number, x2: number, y2: number, open: boolean): Two.Polygon;
  makeGroup(objects: Array<any>): Two.Group;

  bind(event: Two.Events, callback: (arg?: Array<any>) => void): Two;
  bind(event: string, callback: (arg?: Array<any>) => void): Two;
  unbind(event: Two.Events, callback: (arg?: Array<any>) => void): Two;
  unbind(event: string, callback: (arg?: Array<any>) => void): Two;

  play();
  pause();
  update();
  render();
  add(shape: Two.Shape);
  remove();
  clear();

}

declare module Two {
  enum Types {
    webgl,
    svg,
    canvas,
  }

  enum Events {
    play,
    pause,
    update,
    render,
    resize,
    change,
    remove,
    insert,
  }

  class Vector {
    x: number;
    y: number;
    constructor(x?, y?);
    set(x: number, y: number);
    copy(v): Vector;
    position(v): Vector;
  }

  class LogicalShape {
    translation: Two.Vector;
    rotation: number; // radian
    scale: number;

    visible: boolean;

    parent: Two.Group;
    vertices: Collection;
  }

  export class Shape extends LogicalShape {
    parent: Two.Group;

    stroke: string; // color
    fill: any; // color
    linewidth: number;
    opacity: number; // 0-1

    /** http://www.w3.org/TR/SVG/images/painting/linecap.svg */
    cap: string;
    /** http://www.w3.org/TR/SVG/images/painting/linejoin.svg */
    join: string;
    miter: number;

    noStroke();
    noFill();
    subdivide();
    remove();
  }

  class Polygon extends Shape {
    vertices: Collection;
  }

  class Group extends LogicalShape {
    children: Array<any>
  }

  class Texture {
    url: string;
    scale: number;
    image: HTMLImageElement;
    constructor(url);
  }

  class Text extends Shape {
    value: string;
    x: number;
    y: number;
    size: number;
    weight: string;
    leading: number;
    className: string;
    constructor(value, x, y);
    clone(): Text;
  }

  interface Collection extends Array<any> { }
}

interface TwoConstructionParams {
  type?: Two.Types;
  width?: number;
  height?: number;
  autostart?: boolean;
  fullscreen?: boolean;
}
