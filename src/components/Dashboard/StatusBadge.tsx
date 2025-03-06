
import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "in-stock" | "out-of-stock" | "low-stock";
  count?: number;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, count, className }) => {
  const statusConfig = {
    "in-stock": {
      text: `In Stock${count ? ` (${count})` : ""}`,
      className: "bg-positive/15 text-positive",
    },
    "low-stock": {
      text: `Low Stock${count ? ` (${count})` : ""}`,
      className: "bg-warning/15 text-warning",
    },
    "out-of-stock": {
      text: `Out of Stock`,
      className: "bg-negative/15 text-negative",
    },
  };

  const { text, className: statusClassName } = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
        statusClassName,
        className
      )}
    >
      {text}
    </div>
  );
};

export default StatusBadge;
