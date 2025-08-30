export interface UsersApiResponse {
  users: User[];
  pagination: {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}
export interface UserUpdateData {
  name?: string;
  email?: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}
export interface ValidationError {
  [key: string]: string;
}
export interface ApiErrorResponse {
  status: "fail" | "error";
  message: string;
  errors?: ValidationError;
}
