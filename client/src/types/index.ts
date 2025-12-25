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

// Root types
export interface RootResponse {
  message: string;
  version: string;
  docs: string;
}

export interface HealthResponse {
  status: string;
}

