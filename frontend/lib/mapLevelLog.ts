import { LevelLog } from "@/app/(main)/dashboard/types";

export const mapLevelLog: Record<LevelLog, {className: string}> = {
  DEBUG: {className: "text-purple-500 bg-purple-500/10"},
  INFO: {className: "text-green-400 bg-green-400/10"},
  WARN: {className: "text-yellow-300 bg-yellow-300/10"},
  ERROR: {className: "text-orage-500 bg-orage-500/10"},
  FATAL: {className: "text-red-500 bg-red-500/10"},
}