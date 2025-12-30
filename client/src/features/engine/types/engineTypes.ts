export interface EngineResponse {
  result: number | string | null;
  success: boolean;
  message: string;
  timestamp: Date;
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

export interface EngineCalculationResponse {
  id: number;
  operation_type: string;
  input_data: string;
  result: string | null;
  success: boolean;
  message: string | null;
  created_at: string;
}
