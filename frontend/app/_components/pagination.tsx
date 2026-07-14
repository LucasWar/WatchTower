"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  /** Quantidade máxima de botões de páginas exibidos */
  maxVisiblePages?: number;

  canGoPrevious?: boolean;
  canGoNext?: boolean;
  canGoFirst?: boolean;
  canGoLast?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,

  maxVisiblePages = 3,

  canGoPrevious = currentPage > 1,
  canGoNext = currentPage < totalPages,
  canGoFirst = currentPage > 1,
  canGoLast = currentPage < totalPages,
}: PaginationProps) {
  function generatePages(): number[] {
    if (totalPages <= maxVisiblePages) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    const half = Math.floor(maxVisiblePages / 2);

    let start = currentPage - half;
    let end = currentPage + half;

    // Caso maxVisiblePages seja par
    if (maxVisiblePages % 2 === 0) {
      end--;
    }

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    }

    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    }

    return Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
  }

  const pages = generatePages();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          disabled={!canGoFirst}
          onClick={() => currentPage !== 1 && onPageChange(1)}
          className="bg-primary-color"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="bg-primary-color"
          disabled={!canGoPrevious}
          onClick={() =>
            currentPage > 1 && onPageChange(currentPage - 1)
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2 min-w-35 justify-center">
          {pages.map((page) => (
            <Button
              key={page}
              className="h-9 min-w-9 p-0 bg-primary-color"
              variant={page === currentPage ? "default" : "outline"}
              onClick={() =>
                page !== currentPage && onPageChange(page)
              }
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          size="icon"
          variant="outline"
          disabled={!canGoNext}
          onClick={() =>
            currentPage < totalPages &&
            onPageChange(currentPage + 1)
          }
          className="bg-primary-color active:bg-blue-500/40 active:text-blue-400"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          disabled={!canGoLast}
          onClick={() =>
            currentPage !== totalPages &&
            onPageChange(totalPages)
          }
          className="bg-primary-color"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}