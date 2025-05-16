export interface HttpResponse {
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}

export interface HttpRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
  params?: any;
  query?: any;
  body?: any;
  userId?: number;
}