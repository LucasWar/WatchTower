'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRight, FileArchive, Filter, Search, X } from "lucide-react";
import { useLogsController } from "./logs-controller";
import { utcToUserHour } from "@/lib/utcToUserHour";
import { mapLevelLog } from "@/lib/mapLevelLog";
import { Pagination } from "@/app/_components/pagination";
import { LogDetail } from "./_components/details-log";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/app/_components/search-bar";

export default function LogsPage() {
  const {logs, handleChangeCurrentPage, filters, handleSelectLog, selectedLog} = useLogsController()

  return(
    <>
      <DashboardHeader />
      <div className="flex flex-col mx-5 mt-12 overflow-x-hidden">
        <div className="flex flex-col mb-5">
          <div className="flex items-center gap-2  text-white">
            <FileArchive />
            <span className="text-3xl">Logs</span>
          </div>
          <span className="text-sm text-gray-400">Pesquise, filtre e explore os logs da sua aplicação.</span>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="flex bg-primary-color items-center px-5 py-6 gap-3 border border-gray-600/40 rounded">
              <div className="relative w-full">
                <Search className="absolute top-2 left-2 text-gray-500 w-5 h-5"/>
                <Input className="pl-10 bg-primary-color border border-gray-400 h-9 rounded text-gray-300 focus-visible:none"/>
              </div>
              <Button className="h-10 bg-secondary-color border border-gray-400 text-gray-300">
                <Filter className="flex"/>
                Filtros
              </Button>
              <Button className="h-10 bg-secondary-color border border-gray-400 text-gray-300">
                <Filter className="flex"/>
                Filtros
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-600 hover:bg-gray-600">
                  <TableHead>TIMESTAMP</TableHead>
                  <TableHead>SERVICE</TableHead>
                  <TableHead>MODULE</TableHead>
                  <TableHead className="flex items-center justify-center">LEVEL</TableHead>
                  <TableHead>ACTION</TableHead>
                  <TableHead>MESSAGE</TableHead>
                  <TableHead>TRACE ID</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
                <TableBody className="text-sm text-gray-300">
                  {logs && 
                      logs.data.map((log) => (
                        <TableRow key={log.id} onClick={() => handleSelectLog(log)} className="cursor-pointer">
                          <TableCell className="font-medium">
                            {utcToUserHour(log.createdAt, 1)}
                          </TableCell>
                          <TableCell>
                            {log.service}
                          </TableCell>
                          <TableCell>
                            <div className="truncate">
                              {log.module}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={cn("flex items-center justify-center p-1", mapLevelLog[log.level].className)}>
                              {log.level}
                            </div>
                          </TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.message}</TableCell>
                          <TableCell className="text-blue-400">{log.traceId}</TableCell>
                          <TableCell className="flex justify-end"><ChevronRight /></TableCell>
                        </TableRow>
                      )) 
                    
                  }
                </TableBody>
            </Table>
            {logs && logs.pagination.total > 1 &&
              <Pagination 
                currentPage={filters.page}
                onPageChange={handleChangeCurrentPage}
                totalPages={logs.pagination.total}
              />
            }
          </div>
          <LogDetail 
            handleSelectLog={handleSelectLog}
            selectedLog={selectedLog!}
          />
        </div>
      </div>
    </>
  )
}