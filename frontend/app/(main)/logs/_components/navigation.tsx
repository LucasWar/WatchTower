"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  "Resumo",
  "Metadata",
  "Contexto",
  "Trace",
];

export function NavigationDatailLogs() {
  const [active, setActive] = useState("Resumo");

  return (
    <div className="flex items-center justify-between gap-1 border-b border-border pb-2">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className="relative px-3 py-1.5 text-sm font-medium cursor-pointer"
        >
          {active === item && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-md bg-blue-500/40"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
            />
          )}

          <span
            className={cn(
              "relative z-10",
              active === item
                ? "text-blue-400"
                : "text-muted-foreground"
            )}
          >
            {item}
          </span>
        </button>
      ))}
    </div>
  );
}