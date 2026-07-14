import { Button } from "@/components/ui/button";
import { mapLevelLog } from "@/lib/mapLevelLog";
import { utcToUserHour } from "@/lib/utcToUserHour";
import { cn } from "@/lib/utils";
import { LogData } from "@/services/logs/list-logs";
import { X } from "lucide-react";
import { NavigationDatailLogs } from "./navigation";
import { ResumoLog } from "./resume";

interface LogDetailProps {
  selectedLog: LogData | null,
  handleSelectLog: (value: LogData | null) => void
}

export function LogDetail({handleSelectLog, selectedLog}: LogDetailProps) {
  return(
    <div 
      className={`transition-all duration-300 ease-in-out overflow-hidden border-gray-600/40 rounded ${
        selectedLog 
          ? "w-1/4 opacity-100 translate-x-0 ml-4 border" 
          : "w-0 opacity-0 translate-x-8 ml-0 border-0"
      }`}
    >
      <div className="w-full min-w-75 h-full bg-gray-800 p-4 text-white">
        {selectedLog ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 border-b border-gray-600/40 pb-2">
              <div className="flex justify-between items-center ">
                <h3 className="text-xl font-semibold">Detalhes do Log</h3>
                {/* Botão de fechar caso precise deselecionar */}
                <Button variant="ghost" size="icon" onClick={() => handleSelectLog(null)} className="cursor-pointer">
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <span className={cn('m-w-0 p-2 rounded self-start',mapLevelLog[selectedLog.level].className)}>{selectedLog.level}</span>
                <span className="text-gray-500">{utcToUserHour(selectedLog.createdAt, 1)}</span>
              </div>
              <div>
                <NavigationDatailLogs />
              </div>
            </div>
              <div>
                <ResumoLog 
                  log={selectedLog}
                />
              </div>
              <div className="flex flex-col gap-3">
                Ações
                <div className="flex items-center justify-between">
                  <Button className="p-4 rounded bg-transparent text-white border border-gray-500 hover:bg-blue-500/60 hover:text-blue-400">Ver no Trace</Button>
                  <Button className="p-4 rounded bg-transparent text-white border border-gray-500 hover:bg-blue-500/60 hover:text-blue-400">Criar alerta</Button>
                  <Button className="p-4 rounded bg-transparent text-white border border-gray-500 hover:bg-blue-500/60 hover:text-blue-400">Copiar JSON</Button>
                </div>
              </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}