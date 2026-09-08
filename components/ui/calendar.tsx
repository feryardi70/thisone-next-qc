"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, getDefaultClassNames, useDayPicker, type DayPickerProps, type MonthCaptionProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/**
 * Custom MonthCaption that makes both the month and year clickable.
 * - Clicking the month opens a 3×4 grid to quickly jump to another month.
 * - Clicking the year opens a 3×4 grid to quickly jump to another year.
 */
function MonthYearPickerCaption({
  calendarMonth,
  // displayIndex,
  // children,
  ...divProps
}: MonthCaptionProps & { children?: React.ReactNode }) {
  const { goToMonth } = useDayPicker();
  const [showMonthPicker, setShowMonthPicker] = React.useState(false);
  const [showYearPicker, setShowYearPicker] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const displayedDate = calendarMonth.date;
  const currentYear = displayedDate.getFullYear();
  const currentMonth = displayedDate.getMonth();

  // The base year for the 12-year grid (shows baseYear … baseYear+11)
  const [baseYear, setBaseYear] = React.useState(() => currentYear - (currentYear % 12));

  // Sync baseYear when the displayed year changes externally
  React.useEffect(() => {
    setBaseYear(currentYear - (currentYear % 12));
  }, [currentYear]);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    if (!showMonthPicker && !showYearPicker) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowMonthPicker(false);
        setShowYearPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMonthPicker, showYearPicker]);

  const years = Array.from({ length: 12 }, (_, i) => baseYear + i);

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const handleMonthClick = (monthIdx: number) => {
    goToMonth(new Date(currentYear, monthIdx, 1));
    setShowMonthPicker(false);
  };

  const handleYearClick = (year: number) => {
    goToMonth(new Date(year, currentMonth, 1));
    setShowYearPicker(false);
  };

  const toggleMonthPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowYearPicker(false);
    setShowMonthPicker((v) => !v);
  };

  const toggleYearPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMonthPicker(false);
    setShowYearPicker((v) => !v);
  };

  return (
    <div {...divProps} ref={containerRef}>
      <span className="select-none font-medium flex items-center gap-1.5">
        {/* Month Selector */}
        <span className="relative inline-block">
          <button type="button" onClick={toggleMonthPicker} className="cursor-pointer font-semibold hover:text-primary hover:underline underline-offset-2 transition-colors px-1 py-0.5 rounded hover:bg-accent/50" aria-label="Pilih bulan">
            {monthNames[currentMonth]}
          </button>

          {showMonthPicker && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-2 w-64 rounded-xl border bg-popover p-3.5 shadow-xl animate-in fade-in-0 zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50">
                <span className="text-sm font-semibold text-foreground px-1">Pilih Bulan</span>
                <span className="text-xs text-muted-foreground font-medium">{currentYear}</span>
              </div>
              {/* 3×4 month grid */}
              <div className="grid grid-cols-3 gap-2">
                {monthNames.map((name, idx) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleMonthClick(idx)}
                    className={cn(
                      "h-9 rounded-lg px-2 text-sm font-medium transition-all cursor-pointer flex items-center justify-center",
                      idx === currentMonth ? "bg-primary text-primary-foreground font-semibold shadow-sm" : "hover:bg-accent hover:text-accent-foreground text-foreground/80",
                      idx === new Date().getMonth() && currentYear === new Date().getFullYear() && idx !== currentMonth && "border border-primary/40 font-semibold"
                    )}
                  >
                    {shortMonthNames[idx]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </span>

        {/* Year Selector */}
        <span className="relative inline-block">
          <button type="button" onClick={toggleYearPicker} className="cursor-pointer font-semibold hover:text-primary hover:underline underline-offset-2 transition-colors px-1 py-0.5 rounded hover:bg-accent/50" aria-label="Pilih tahun">
            {currentYear}
          </button>

          {showYearPicker && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-2 w-64 rounded-xl border bg-popover p-3.5 shadow-xl animate-in fade-in-0 zoom-in-95">
              {/* Year range navigation */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50">
                <button type="button" onClick={() => setBaseYear((y) => y - 12)} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-8 rounded-md hover:bg-accent")} aria-label="12 tahun sebelumnya">
                  <ChevronLeft className="size-4" />
                </button>
                <span className="text-sm font-semibold text-foreground">
                  {baseYear} – {baseYear + 11}
                </span>
                <button type="button" onClick={() => setBaseYear((y) => y + 12)} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-8 rounded-md hover:bg-accent")} aria-label="12 tahun berikutnya">
                  <ChevronRight className="size-4" />
                </button>
              </div>
              {/* 3×4 year grid */}
              <div className="grid grid-cols-3 gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearClick(year)}
                    className={cn(
                      "h-9 rounded-lg px-2 text-sm font-medium transition-all cursor-pointer flex items-center justify-center",
                      year === currentYear ? "bg-primary text-primary-foreground font-semibold shadow-sm" : "hover:bg-accent hover:text-accent-foreground text-foreground/80",
                      year === new Date().getFullYear() && year !== currentYear && "border border-primary/40 font-semibold"
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </span>
      </span>
    </div>
  );
}

function Calendar({ className, classNames, showOutsideDays = true, ...props }: DayPickerProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("flex gap-4 flex-col sm:flex-row relative", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn("flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between", defaultClassNames.nav),
        button_previous: cn(buttonVariants({ variant: "ghost" }), "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none", defaultClassNames.button_previous),
        button_next: cn(buttonVariants({ variant: "ghost" }), "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none", defaultClassNames.button_next),
        month_caption: cn("flex items-center justify-center h-(--cell-size) w-full px-(--cell-size) font-medium text-sm select-none", defaultClassNames.month_caption),
        dropdowns: cn("w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5", defaultClassNames.dropdowns),
        dropdown_root: cn("relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md", defaultClassNames.dropdown_root),
        dropdown: cn("absolute bg-popover inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn("select-none font-medium", defaultClassNames.caption_label),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn("text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none", defaultClassNames.weekday),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn("select-none w-(--cell-size)", defaultClassNames.week_number_header),
        week_number: cn("text-[0.8rem] select-none text-muted-foreground", defaultClassNames.week_number),
        day: cn("relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none", defaultClassNames.day),
        range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
        outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        MonthCaption: MonthYearPickerCaption,
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeft className={cn("size-4", className)} {...props} />;
          }
          if (orientation === "right") {
            return <ChevronRight className={cn("size-4", className)} {...props} />;
          }
          return <ChevronRight className={cn("size-4", className)} {...props} />;
        },
      }}
      {...props}
    />
  );
}

export { Calendar };
