export enum LevelLog {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export interface FindCountLevelResponse {
  count: bigint | number;
  level: LevelLog;
}



export interface LogHistoryForMinute {
  current: number;
  variation: number;
  logs: {
      bucket: string;
      total_logs: number;
    }[];
}

export interface FindAvgLatencyResponse {
  bucket: string;
  p95_latency: number;
};

export interface FindAvgLatencyResponse {
  bucket: string;
  p95_latency: number;
};

export interface ErrorRateInterface {
  summary: {
    current: number,
    variationPercent: number,
    variationPoints: number
  },
  chart:
    {
      bucket: string,
      total_logs: number,
      error_logs: number,
      error_rate: number
    }[],
}

export interface CountErrorLogsTotalLogsResponse {
  bucket_time: string;
  total_logs: number;
  error_logs: number;
}

export interface Metrics {
  logsForMin: LogHistoryForMinute,
  errorRate: ErrorRateInterface,
  latency: FindAvgLatencyResponse[]
  countLevel: FindCountLevelResponse[]
  totalLogsAndErro: CountErrorLogsTotalLogsResponse[]
}