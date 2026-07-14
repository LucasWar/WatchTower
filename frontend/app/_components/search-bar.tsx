"use client";

import {
  Search,
  Clock3,
  Database,
  Cpu,
  Server,
  Wifi,
  ChevronRight,
  UserPen,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  handleSetRangeTime?: (value: string) => void;
  statusSocket?: boolean;
}

export function DashboardHeader({handleSetRangeTime, statusSocket}: DashboardHeaderProps) {
  
  const { signout } = useAuth()

  return (
    <header className="flex h-16 items-center gap-4 bg-primary-color px-6 min-w-full justify-between">

      {/* Pesquisa */}
      <div className="flex gap-4 justify-center items-center w-4/5">
        <div className="relative w-full">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search Logs, TraceID, Message..."
            className="pl-10 bg-secondary-color border border-primary-color h-11 text-gray-300 focus-visible:none"
          />

        </div>

        {/* Time Range */}
        {handleSetRangeTime && 
          <Select defaultValue="150 minutes">

            <SelectTrigger className="w-2/3 text-gray-300 h-10! border-none bg-secondary-color">

              <Clock3 className="mr-2 h-4 w-4" />

              <SelectValue />

            </SelectTrigger>

            <SelectContent position="popper" className="bg-primary-color text-gray-400" align="center">

              <SelectItem value="150 minutes" onClick={() => handleSetRangeTime('150 minutes')}>Ultimas 2 horas</SelectItem>

              <SelectItem value="15m" onClick={() => handleSetRangeTime('15 minutes')}>Ultimos 15 minutos</SelectItem>

              <SelectItem value="30m" onClick={() => handleSetRangeTime('30 minutes')}>Ultimos 30 minutos</SelectItem>

              <SelectItem value="1h" onClick={() => handleSetRangeTime('60 minutes')}>Ultima 1 hora</SelectItem>

              <SelectItem value="24h" onClick={() => handleSetRangeTime('2 hours')}>Ultimas 24 horas</SelectItem>

            </SelectContent>

          </Select>
        }
        
      </div>
      {/* Connection */}
      <div className="flex gap-6 text-gray-300">
        <div className="flex items-center gap-2 text-sm">

          <Wifi className="h-3.5 w-3.5 text-green-500 fill-green-500" />

          <span className="text-green-500">Connected</span>

        </div>

        {/* Redis */}

        <div className="flex items-center gap-2 text-sm">

          <Server className="h-3.5 w-3.5 text-red-500" />

          Redis

        </div>

        {/* Database */}

        <div className="flex items-center gap-2 text-sm">

          <Database className="h-3.5 w-3.5 text-green-500" />

          DB

        </div>

        {/* Workers */}

        <div className="flex items-center gap-2 text-sm">

          <Cpu className="h-3.5 w-3.5 text-yellow-500" />

          Workers

        </div>

        {/* Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-9 w-9">

              <AvatarImage src="/avatar.png" />

              <AvatarFallback>LW</AvatarFallback>

            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex justify-between items-center" onSelect={() => signout()}>
              Logout
              <ChevronRight />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between items-center">
              Perfil
              <UserPen />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}