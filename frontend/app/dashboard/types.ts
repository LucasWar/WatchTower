export interface LogHistoryForMinute {
  current: number;
  variation: number;
  logs: [
    {
      bucket: string;
      avg_duration: number;
    }
  ]
}