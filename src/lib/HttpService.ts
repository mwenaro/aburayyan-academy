export class HttpService {
  private basePath: string;
  private defaultHeaders: HeadersInit;

  constructor(basePath: string = "", defaultHeaders: HeadersInit = {}) {
    this.basePath = basePath;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };
  }

  private async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string = "",
    data?: any,
    customHeaders: HeadersInit = {}
  ): Promise<T> {
    const url = `${this.basePath}/${endpoint}`;
    const headers = { ...this.defaultHeaders, ...customHeaders };

    const response = await fetch(url, {
      method,
      headers,
      body:
        method === "GET" || method === "DELETE"
          ? undefined
          : JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  private async handleResponse(response: Response) {
    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
      const errorBody = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();
      throw { status: response.status, message: errorBody };
    }

    return contentType?.includes("application/json")
      ? response.json()
      : response.text();
  }

  async get<T>(
    endpoint: string = "",
    params?: Record<string, string>,
    headers?: HeadersInit
  ): Promise<T> {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return this.request("GET", `${endpoint}${queryString}`, undefined, headers);
  }

  async post<T>(
    endpoint: string = "",
    data: any,
    headers?: HeadersInit
  ): Promise<T> {
    return this.request("POST", endpoint, data, headers);
  }

  async put<T>(
    endpoint: string = "",
    data: any,
    headers?: HeadersInit
  ): Promise<T> {
    return this.request("PUT", endpoint, data, headers);
  }

  async delete<T>(endpoint: string = "", headers?: HeadersInit): Promise<T> {
    return this.request("DELETE", endpoint, undefined, headers);
  }
}
