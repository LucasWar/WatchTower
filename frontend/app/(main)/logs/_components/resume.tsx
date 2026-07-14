import { mapLevelLog } from "@/lib/mapLevelLog"
import { cn } from "@/lib/utils"
import { LogData } from "@/services/logs/list-logs"

interface ResumoLogProps {
  log: LogData
}

export function ResumoLog({log}:ResumoLogProps) {
  return(
    <>
      <div className="grid grid-cols-2 gap-y-3 w-full">
        <span className="font-medium text-muted-foreground">Service</span>
        <span>{log.service}</span>

        <span className="font-medium text-muted-foreground">Module</span>
        <span>{log.module}</span>

        <span className="font-medium text-muted-foreground">Action</span>
        <span>{log.action}</span>

        <span className="font-medium text-muted-foreground">Level</span>
        <span className={cn("justify-self-start rounded px-2 py-1", mapLevelLog[log.level].className)}>{log.level}</span>

        <span className="font-medium text-muted-foreground">Trace ID</span>
        <span className="break-all text-blue-400">{log.traceId}</span>
        
        <span className="font-medium text-muted-foreground truncate">External User ID</span>
        <span className="text-blue-400">{log.externalUserId}</span>

        <span className="font-medium text-muted-foreground">Environment</span>
        <span>{log.environment}</span>

        <span className="font-medium text-muted-foreground">Message</span>
        <span className="break-all">{log.message}</span>
      </div>
      <div className="flex flex-col gap-2 min-w-75">
        <span className="font-medium text-muted-foreground">Metadata</span>
        <pre className="max-h-96 overflow-y-auto rounded-md bg-secondary-color p-3 text-xs whitespace-pre-wrap break-all">
          {JSON.stringify(log.metadata, null, 2)}
        </pre>
      </div>
    </>
  )
}