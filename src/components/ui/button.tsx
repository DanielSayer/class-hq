"use client";

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { buttonVariants } from "./button-variants";

function Button({
  className,
  variant,
  size,
  asChild = false,
  disableRipple = false,
  isLoading = false,
  loadingContent,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    disableRipple?: boolean;
    isLoading?: boolean;
    loadingContent?: React.ReactNode;
  }) {
  const Comp = asChild ? Slot : "button";
  const [ripples, setRipples] = React.useState<
    { x: number; y: number; key: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disableRipple || isLoading) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples((prev) => [...prev, { x, y, key: Date.now() }]);
  };

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }), "relative")}
      onClick={handleClick}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {loadingContent ?? props.children}
        </>
      ) : (
        props.children
      )}
      {!disableRipple && !isLoading && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {ripples.map(({ x, y, key }) => (
            <motion.span
              key={key}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute rounded-full"
              style={{
                top: y,
                left: x,
                width: "100px",
                height: "100px",
                backgroundColor: "currentColor",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
              onAnimationComplete={() =>
                setRipples((prev) => prev.filter((r) => r.key !== key))
              }
            />
          ))}
        </div>
      )}
    </Comp>
  );
}

export { Button };
