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

  public getBookContent = (id: string): Promise<IBookPageContentResponse> => {
    return this.axiosInstance
      .get<{ result: IBookPageContentResponse }>(`${URL_CONFIG.getTodoList}${id}`)
      .then(response => response.data.result);
  }
}

export interface IBookPageContentResponse {
  book_id: string;
  page_content: string | IBookPageElementResponse[];
}

export interface IBookPageElementResponse {
  id: string;
  block_type: string;
  content: string | IBookPageElementResponse[];
  parent_id?: string | null;
  position: string;
  theme_color?: string | null;
}

export default BookService.getInstance();
