import IPoint from '../utils/IPoint';

const width = 300;
const height = 200;

export interface ICommentEditorParams {
  height: string;
  isRightRendered: boolean;
  isUpRendered: boolean;
  show?: boolean;
  positionX: string;
  positionY: string;
  width: string;
}

export default class BookCommentPopUpModel implements ICommentEditorParams {
  _height: string;
  _id?: string | null;
  _show: boolean;
  _positionX: string;
  _positionY: string;
  _width: string;
  _isRightRendered: boolean;
  _isUpRendered: boolean;

  constructor() {
    this._height = `${BookCommentPopUpModel.popupHeight}px`;
    this._positionX = '0';
    this._positionY = '0';
    this._show = false;
    this._width = `${BookCommentPopUpModel.popupWidth}px`;
    this._isRightRendered = false;
    this._isUpRendered = false;
  }

  resolvePositionRender(params: IPoint, isLast: boolean) {
    const rigthRenderPosition = `${params.x + window.scrollX + 24}px`;
    const leftRenderPosition = `${params.x + window.scrollX - BookCommentPopUpModel.popupWidth - 8}px`;

    const isRenderDown = window.innerHeight > (params.y + BookCommentPopUpModel.popupHeight);
    const renderDown = `${params.y + window.scrollY - 12}px`
    const renderUp = `${params.y + window.scrollY - BookCommentPopUpModel.popupHeight + 24}px`

    this.positionX = isLast ? rigthRenderPosition : leftRenderPosition;
    this.positionY = isRenderDown ? renderDown : renderUp;
    this.isRightRendered = isLast;
    this.isUpRendered = !isRenderDown;
  }

  set height(value: string) {
    this._height = value;
  }

  get height(): string {
    return this._height;
  }

  set id(value: string | null | undefined) {
    this._id = value;
  }

  get id() {
    return this._id;
  }

  set positionX(value: string) {
    this._positionX = value;
  }

  get positionX(): string {
    return this._positionX;
  }

  set positionY(value: string) {
    this._positionY = value;
  }

  get positionY(): string {
    return this._positionY;
  }

  set show(value: boolean) {
    this._show = value;
  }

  get show(): boolean {
    return this._show;
  }

  set width(value: string) {
    this._width = value;
  }

  get width(): string {
    return this._width;
  }

  set isRightRendered(value: boolean) {
    this._isRightRendered = value;
  }

  get isRightRendered(): boolean {
    return this._isRightRendered;
  }

  set isUpRendered(value: boolean) {
    this._isUpRendered = value;
  }

  get isUpRendered(): boolean {
    return this._isUpRendered;
  }

  static get popupWidth() {
    return width;
  }

  static get popupHeight() {
    return height;
  }
}
