"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FindAvgLatencyResponse, LevelLog } from "../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ListLogsResponse } from "@/services/logs/list-logs";
import { utcToUserHour } from "@/lib/utcToUserHour";
import { mapLevelLog } from "@/lib/mapLevelLog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination } from "@/app/_components/pagination";
import { cn } from "@/lib/utils";

interface TableLogsProps {
  onLatencys?: FindAvgLatencyResponse[];
  onLogs: ListLogsResponse | undefined;
  onCurrentPage: number;
  onChangePage: (value: number) => void;
  onSetLevel: (value: LevelLog) => void
}

export default function TableLogs({onLatencys, onLogs, onChangePage, onCurrentPage, onSetLevel}: TableLogsProps) {
  return (
    <Card className="max-h-90 bg-primary-color text-gray-300 sm:min-h-45">
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg">Real time events </CardTitle>
        <div className="flex justify-center items-center gap-5 mr-10">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="bg-secondary-color border border-white p-2 flex rounded justify-center items-center gap-2">
                by Level
                <ChevronDown className="w-5 h-5"/>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-primary-color text-white">
              <DropdownMenuItem onSelect={() => onSetLevel(LevelLog.DEBUG)}>Debug</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onSetLevel(LevelLog.INFO)}>Info</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onSetLevel(LevelLog.WARN)}>Warn</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onSetLevel(LevelLog.ERROR)}>Error</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onSetLevel(LevelLog.FATAL)}>Fatal</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="bg-secondary-color border border-white p-2 flex rounded justify-center items-center ">
                Service
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="w-full h-screen">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-600 hover:bg-gray-600">
              <TableHead className="w-36">TIMESTAMP</TableHead>
              <TableHead className="w-36">SERVICE</TableHead>
              <TableHead className="w-48">MODULE</TableHead>
              <TableHead className="w-36">LEVEL</TableHead>
              <TableHead className="w-50">ACTION</TableHead>
              <TableHead>MESSAGE</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm">
            {onLogs && 
                onLogs.data.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                      {utcToUserHour(log.createdAt, 1)}
                    </TableCell>
                    <TableCell>
                      {log.service}
                    </TableCell>
                    <TableCell>
                      <div className="w-48 truncate">
                        {log.module}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn(mapLevelLog[log.level].className, "bg-transparent")}>
                        {log.level}
                      </div>
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell className="flex justify-end"><ChevronRight /></TableCell>
                  </TableRow>
                )) 
              
            }
          </TableBody>
        </Table>
        {onLogs && onLogs.pagination.total > 1 &&
          <Pagination 
            currentPage={onCurrentPage}
            onPageChange={onChangePage}
            totalPages={onLogs.pagination.total}
          />
        }
      </CardContent>
    </Card>
  )
}
