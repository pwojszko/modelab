// User types
export interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
}

export interface UserCreate {
  email: string;
  full_name: string;
  password: string;
}

// Item types
export interface Item {
  id: number;
  title: string;
  description?: string;
  price: number;
  owner_id: number;
  created_at: string;
}

export interface ItemCreate {
  title: string;
  description?: string;
  price: number;
}

export interface ItemUpdate {
  title?: string;
  description?: string;
  price?: number;
}

// Engine types
export interface EngineResponse {
  result: number | string | null;
  success: boolean;
  message: string;
}

export interface AddRequest {
  a: number;
  b: number;
}

export interface MultiplyRequest {
  a: number;
  b: number;
}

export interface FactorialRequest {
  n: number;
}

export interface ProcessStringRequest {
  text: string;
}

export interface SumArrayRequest {
  numbers: number[];
}

