export class HttpService {
  private basePath: string;

  // The constructor
  constructor(basePath: string = "") {
    this.basePath = basePath;
  }

  // Helper method to handle the response
  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // GET method
  async get<T>(endpoint: string = ""): Promise<T> {
    const url = `${this.basePath}/${endpoint}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return this.handleResponse(response);
  }

  // POST method
  async post<T>(endpoint: string = "", data: any): Promise<T> {
    const url = `${this.basePath}/${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // PUT method
  async put<T>(endpoint: string = "", data: any): Promise<T> {
    const url = `${this.basePath}/${endpoint}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // DELETE method
  async delete<T>(endpoint: string = ""): Promise<T> {
    const url = `${this.basePath}/${endpoint}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return this.handleResponse(response);
  }
}
