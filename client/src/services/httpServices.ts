import Swal from "sweetalert2";
import apiClient from "./apiClient.ts";

class HttpService<T> {
  apiEndPoint = "";
  constructor(apiEndPoint: string) {
    this.apiEndPoint = apiEndPoint;
  }
  
  getOne = async (id: string) => {
    const { data } = await apiClient.get<T>(`${this.apiEndPoint}/${id}`);
    return data;
  }
  
  getAll = async () => {
    const { data } = await apiClient.get<T[]>(this.apiEndPoint);
    return data;
  }
  
  create = async (entity: T) => {
    const { data } = await apiClient.post<T>(`${this.apiEndPoint}`, entity);
    return data;
  }
  
  update = async (id: string, entity: T) => {
    const { data } = await apiClient.patch<T>(`${this.apiEndPoint}/${id}`, entity);
    return data;
  }
  
  delete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
    
    if (result.isConfirmed) {
      await apiClient.delete(`${this.apiEndPoint}/${id}`);
    }
  }
}

const createService = <T>(apiEndPoint: string) => new HttpService<T>(apiEndPoint);

export default createService;
