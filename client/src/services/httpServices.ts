import apiClient from "./apiClient.ts";

class HttpService<T> {
  apiEndPoint = ""
  constructor(apiEndPoint: string) {
    this.apiEndPoint = apiEndPoint;
  }
  
  getOne = (id: string) => {
    return apiClient.get<T>(`${this.apiEndPoint}/${id}`);
  }
  
  getAll = () => {
    return apiClient.get<T[]>(this.apiEndPoint);
  }
  
  create = (entity: T) => {
    return apiClient.post<T>(`${this.apiEndPoint}`, entity);
  }
  
  update = (id: string, entity: T) => {
    return apiClient.patch<T>(`${this.apiEndPoint}/${id}`, entity);
  }
  
  delete = (id: string) => {
    return apiClient.delete<T>(`${this.apiEndPoint}/${id}`);
  }
}

const createService = (apiEndPoint: string) => new HttpService(apiEndPoint);

export default createService;
