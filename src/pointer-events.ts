import registerListener from 'tp-register-listener';
import { EventListenerOptions } from './lib/interface';

const assert = console.assert;
const POINTER_EVENT_TYPE_MOUSE = 1;
const POINTER_EVENT_TYPE_TOUCH = 2;

/**
 * @hidden
 */
export default class PointerEvents {
  private rmTouchStart: Function | null = null;
  private rmTouchMove: Function | null = null;
  private rmTouchEnd: Function | null = null;
  private rmTouchCancel: Function | null = null;

  private rmMouseStart: Function | null = null;
  private rmMouseMove: Function | null = null;
  private rmMouseUp: Function | null = null;

  private bindTouchEnd: any;
  private bindMouseUp: any;

  private lastTouchEvent: number = 0;

  private doc: HTMLDocument = document;

  mouseWait: number = 2 * 1000;
  lastEventType: number = 0;

  constructor(private ele: any,
              private pointerDown: any,
              private pointerMove: any,
              private pointerUp: any,
              private option: EventListenerOptions) {
    assert(ele, 'element can not be null');
    assert(pointerDown, 'pointerDown can not be null');

    this.bindTouchEnd = this.handleTouchEnd.bind(this);
    this.bindMouseUp = this.handleMouseUp.bind(this);

    this.rmTouchStart = registerListener(ele, 'touchstart', this.handleTouchStart.bind(this), option);
    this.rmMouseStart = registerListener(ele, 'mousedown', this.handleMouseDown.bind(this), option);
  }

  private handleTouchStart(ev: any) {
    assert(this.ele, 'element can not be null');
    assert(this.pointerDown, 'pointerDown can not be null');

    this.lastTouchEvent = Date.now() + this.mouseWait;
    this.lastEventType = POINTER_EVENT_TYPE_TOUCH;
    if (!this.pointerDown(ev, POINTER_EVENT_TYPE_TOUCH)) {
      return;
    }
    if (!this.rmTouchMove && this.pointerMove) {
      this.rmTouchMove = registerListener(this.ele, 'touchmove', this.pointerMove, this.option);
    }
    if (!this.rmTouchEnd) {
      this.rmTouchEnd = registerListener(this.ele, 'touchend', this.bindTouchEnd, this.option);
    }
    if (!this.rmTouchCancel) {
      this.rmTouchCancel = registerListener(this.ele, 'touchcancel', this.bindTouchEnd, this.option);
    }
  }

  private handleMouseDown(ev: any) {
    assert(this.ele, 'element can not be null');
    assert(this.pointerDown, 'pointerDown can not be null');

    if (this.lastTouchEvent > Date.now()) {
      console.debug('mousedown event dropped because of previous touch');
      return;
    }
    this.lastEventType = POINTER_EVENT_TYPE_MOUSE;
    if (!this.pointerDown(ev, POINTER_EVENT_TYPE_MOUSE)) {
      return;
    }
    if (!this.rmMouseMove && this.pointerMove) {
      this.rmMouseMove = registerListener(this.doc, 'mousemove', this.pointerMove, this.option);
    }
    if (!this.rmMouseUp) {
      this.rmMouseUp = registerListener(this.doc, 'mouseup', this.bindMouseUp, this.option);
    }
  }

  private handleTouchEnd(ev: any) {
    this.stopTouch();
    this.pointerUp && this.pointerUp(ev, POINTER_EVENT_TYPE_TOUCH);
  }

  private handleMouseUp(ev: any) {
    this.stopMouse();
    this.pointerUp && this.pointerUp(ev, POINTER_EVENT_TYPE_MOUSE);
  }

  private stopTouch() {
    this.rmTouchMove && this.rmTouchMove();
    this.rmTouchEnd && this.rmTouchEnd();
    this.rmTouchCancel && this.rmTouchCancel();

    this.rmTouchMove = this.rmTouchEnd = this.rmTouchCancel = null;
  }

  private stopMouse() {
    this.rmMouseMove && this.rmMouseMove();
    this.rmMouseUp && this.rmMouseUp();

    this.rmMouseMove = this.rmMouseUp = null;
  }

  stop() {
    this.stopTouch();
    this.stopMouse();
  }

  destroy() {
    this.rmTouchStart && this.rmTouchStart();
    this.rmMouseStart && this.rmMouseStart();
    this.stop();
    this.ele = this.pointerUp = this.pointerMove = this.pointerDown = null as any;
    this.rmTouchStart = this.rmMouseStart = null as any;
  }
}
