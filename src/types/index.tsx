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
