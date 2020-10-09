import HttpClientBase from './HttpClientBase';
import { URL_BASE, URL_CONFIG } from './Config';

class BookService extends HttpClientBase {
  private static instance: BookService;

  constructor() {
    super(URL_BASE);
  }

  public static getInstance(): BookService {
    this.instance = BookService.instance || new BookService();
    return this.instance;
  }

  public getBookContent = (id: String): Promise<IBookPageContentResponse> => {
    return this.axiosInstance
      .get<{ result: IBookPageContentResponse }>(`${URL_CONFIG.getTodoList}${id}`)
      .then(response => response.data.result);
  }
}

export interface IBookPageContentResponse {
  book_id: String;
  page_content: String | IBookPageElementResponse[];
}

export interface IBookPageElementResponse {
  id: String;
  block_type: String;
  content: String | IBookPageElementResponse[];
  parent_id?: String | null;
  position: String;
  theme_color?: String | null;
}

export default BookService.getInstance();
