"use client"

import * as React from "react"
import { toast as hotToast } from "react-hot-toast"

export function useToast() {
  return {
    toast: ({ title, description, variant = "default", ...props }: {
      title?: string
      description?: string
      variant?: "default" | "destructive"
    }) => {
      const message = React.createElement(
        "div",
        { className: "grid gap-1" },
        title && React.createElement("div", { className: "text-sm font-semibold" }, title),
        description && React.createElement("div", { className: "text-sm opacity-90" }, description)
      )

      if (variant === "destructive") {
        return hotToast.error(message, {
          duration: 4000,
          style: {
            background: "hsl(var(--destructive))",
            color: "hsl(var(--destructive-foreground))",
            border: "1px solid hsl(var(--destructive))",
          },
        })
      }

      return hotToast.success(message, {
        duration: 4000,
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
      })
    },
    dismiss: (toastId?: string) => {
      hotToast.dismiss(toastId)
    },
  }
} 