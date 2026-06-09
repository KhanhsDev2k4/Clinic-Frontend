"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";

interface DatePickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
}

export function DatePicker(props: DatePickerProps) {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    if (props.value) {
      setDate(props.value);
    }
  }, [props.value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (!d) return;
            setDate(d);
            props.onChange?.(d);
          }}
          disabled={props.disabled}
          required
        />
      </PopoverContent>
    </Popover>
  );
}
