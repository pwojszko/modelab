export type ServiceResponse<T> = {
  data: T | null;
  success: boolean;
  message: string;
};
