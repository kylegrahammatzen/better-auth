import React from "react";
import { cn } from "@/lib/utils";
import { X } from 'lucide-react';

interface CodeTabProps {
  fileName: string;
  isActive: boolean;
  brightnessLevel?: number;
  onClick: () => void;
  onClose: () => void;
  className?: string;
}

const brightnessLevels = [
	"bg-background",
	"bg-background-200", //
	"bg-background-300",
	"bg-background-400",
	"bg-background-500",
	"bg-background-600",
	"bg-background-700",
];

export function CodeTab({
  fileName,
  isActive,
  brightnessLevel = 0,
  onClick,
  onClose,
  className,
}: CodeTabProps) {
 const activeBrightnessClass = isActive
		? brightnessLevels[brightnessLevel % brightnessLevels.length]
		: "bg-muted";

  const textColor = isActive ? "text-foreground" : "text-muted-foreground";
	const borderColor = isActive
		? "border-t-foreground"
		: "border-t-transparent hover:bg-background/50";

  return (
    <div
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium border-t-2 cursor-pointer transition-colors duration-200",
        "min-w-[120px]",
        activeBrightnessClass,
        textColor,
        borderColor,
        className
      )}
      onClick={onClick}
    >
      <span className="truncate flex-grow">{fileName}</span>
      <button
        className="ml-2 text-muted-foreground hover:text-foreground transition-colors duration-200 flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

