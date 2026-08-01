import { cn } from "@/lib/utils";

/**
 * Horizontal, swipeable, snap-scrolling carousel on mobile that becomes a
 * normal grid on md+ screens. Wrap card items with `scrollItem` on their
 * outermost element so they size correctly in both modes.
 */
export function CardScroller({
  children,
  cols = "md:grid-cols-3",
  className,
}: {
  children: React.ReactNode;
  cols?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Mobile: edge-to-edge horizontal snap scroller.
        // scroll-pl keeps the first card aligned with the page padding on snap.
        "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 scroll-pl-5",
        // md+: switch to a static grid
        "md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:scroll-pl-0 md:[scroll-snap-type:none]",
        cols,
        className
      )}
    >
      {children}
    </div>
  );
}

// Apply to each direct child of CardScroller.
export const scrollItem =
  "w-[80%] shrink-0 snap-start sm:w-[47%] md:w-auto md:shrink";
