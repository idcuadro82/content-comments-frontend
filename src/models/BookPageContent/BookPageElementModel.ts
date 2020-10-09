import { IBookPageElementResponse } from '../../services/BookService';
import pageElementTypeMap from '../utils/PageElementTypesMap';

export default class BookPageElementModel {
  id: String;
  blockType?: String;
  content: String | BookPageElementModel[];
  parentId?: String | null;
  position?: String | null;
  themeColor?: String | null;

  constructor(id: String) {
    this.id = id;
    this.content = '';
  }

  static resolveContent(content: IBookPageElementResponse[]): BookPageElementModel[] {
    return content.map((element: IBookPageElementResponse) => {
      let newBookPageElement = new BookPageElementModel(element.id);
      newBookPageElement.mapFromResponse(element);
      return newBookPageElement;
    });
  }

  public mapFromResponse(bookElementContent: IBookPageElementResponse) {
    const {
      block_type,
      content,
      parent_id,
      position,
      theme_color,
    } = bookElementContent;

    this.blockType = pageElementTypeMap.get(block_type);
    this.parentId = parent_id || null;
    this.position = position || null;
    this.themeColor = theme_color || null;
    this.content =  (Array.isArray(content)) ? BookPageElementModel.resolveContent(content) : content;
  }
}
