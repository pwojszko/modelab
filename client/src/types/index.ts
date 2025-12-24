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

