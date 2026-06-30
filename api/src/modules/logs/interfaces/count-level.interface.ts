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
