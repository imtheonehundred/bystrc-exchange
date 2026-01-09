"use client";

import { Search } from "lucide-react";
import { Input } from "./Input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search...", className }: SearchBarProps) {
  return (
    <div className={cn("relative max-w-md w-full", className)}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        icon={<Search className="h-4 w-4" />}
        className="bg-[var(--card-bg)] border-[var(--divider)] focus-visible:ring-gray-500/50 backdrop-blur-sm"
      />
    </div>
  );
}
