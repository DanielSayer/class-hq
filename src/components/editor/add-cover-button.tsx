"use client";

import { Camera } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { type BackgroundId, backgrounds } from "@/lib/backgrounds";
import { cn } from "@/lib/utils";
import { useState } from "react";

type AddCoverButtonProps = {
  handleCoverChange: (id: BackgroundId) => void;
};

export const AddCoverButton = ({ handleCoverChange }: AddCoverButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePickCover = (id: BackgroundId) => {
    handleCoverChange(id);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button>
          <Camera /> Add Cover
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-md" align="start">
        <div className="grid grid-cols-4 gap-4">
          {backgrounds.map((x) => (
            <Button key={x} asChild onClick={() => handlePickCover(x)}>
              <div
                className={cn(
                  "h-16 w-16 cursor-pointer overflow-hidden rounded bg-cover transition-all duration-150 hover:scale-105",
                  x,
                )}
              />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
