export interface RootResponse {
  message: string;
  version: string;
  docs: string;
}

export interface Health {
  status: string;
  timestamp: Date;
}
