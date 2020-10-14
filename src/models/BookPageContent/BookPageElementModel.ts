import { IBookPageElementResponse } from '../../services/BookService';
import PageElementTypeMap from '../utils/PageElementTypesMap';

export default class BookPageElementModel {
  id: string;
  blockType: string;
  content: string | BookPageElementModel[];
  parentId?: string | null;
  position?: string | null;
  themeColor?: string;

  constructor(id: string) {
    this.id = id;
    this.blockType = '';
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

    this.blockType = PageElementTypeMap.get(block_type);
    this.parentId = parent_id || null;
    this.position = position || null;
    this.themeColor = theme_color || '';
    this.content =  (Array.isArray(content)) ? BookPageElementModel.resolveContent(content) : content || '';
  }
}
