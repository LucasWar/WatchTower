export interface ErrorRateResponse {
  bucket: string;
  total_logs: bigint | number;
  error_logs: bigint | number;
  error_rate: string;
}
