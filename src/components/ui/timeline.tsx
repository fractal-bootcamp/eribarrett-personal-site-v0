"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface TimelineItem {
  date: string;
  title: string;
  description?: string | null;
  href?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  initialCount?: number;
  dateFormat?: Intl.DateTimeFormatOptions;
  className?: string;
  showMoreText?: string;
  showLessText?: string;
  dotClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
  buttonVariant?: "default" | "outline" | "ghost" | "link";
  buttonSize?: "default" | "sm" | "lg";
  animationDuration?: number;
  animationDelay?: number;
  showAnimation?: boolean;
}

function DesktopTimelineEntry({
  item,
  dotClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
}: {
  item: TimelineItem;
  dotClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
}) {
  return (
    <div className="border-2 border-black border-opacity-70 rounded-lg p-4 bg-black bg-opacity-10 shadow-lg hover:border-white hover:border-opacity-50 hover:shadow-md transition-all">
      <Link
        href={item.href || "#"}
        className={cn(
          "group hidden grid-cols-9 items-center md:grid",
          !item.href && "pointer-events-none"
        )}
      >
        <dl className="col-span-2">
          <dt className="sr-only">Date</dt>
          <dd
            className={cn(
              "text-base font-medium text-black dark:text-white transition-colors group-hover:text-gray-800 dark:group-hover:text-gray-200",
              dateClassName
            )}
          >
            <time dateTime={item.date}>
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </dd>
        </dl>
        <div className="col-span-7 flex items-center">
          <div className="relative ml-4">
            <div
              className={cn("h-16 border-l border-gray-600 pr-8", lineClassName)}
            />
            <div
              className={cn(
                "absolute -left-1 top-[1.6875rem] flex h-5 w-5 items-center justify-center rounded-full bg-lime-500 transition-colors group-hover:bg-lime-600",
                !item.icon && "h-2.5 w-2.5",
                dotClassName
              )}
            >
              {item.icon && (
                <div className="h-3 w-3 text-black">{item.icon}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3
              className={cn(
                "text-xl font-medium tracking-tight text-black dark:text-white transition-colors group-hover:text-gray-800 dark:group-hover:text-gray-200",
                titleClassName
              )}
            >
              {item.title}
            </h3>
            {item.description && (
              <p
                className={cn(
                  "text-sm text-gray-800 dark:text-gray-200 group-hover:text-gray-700 dark:group-hover:text-gray-300",
                  descriptionClassName
                )}
              >
                {item.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

function MobileTimelineEntry({
  item,
  dotClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
}: {
  item: TimelineItem;
  dotClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
}) {
  return (
    <div className="border-2 border-black border-opacity-70 rounded-lg p-4 bg-black bg-opacity-25 shadow-lg hover:border-gray-800 hover:shadow-md transition-all md:hidden">
      <Link
        href={item.href || "#"}
        className={cn(
          "flex items-center space-x-4 rounded-lg transition-colors bg-muted/10 active:bg-muted/20",
          !item.href && "pointer-events-none"
        )}
      >
        <div className="relative">
          <div className={cn("h-16 border-l border-gray-600", lineClassName)} />
          <div
            className={cn(
              "absolute -left-1 top-5 flex h-5 w-5 items-center justify-center rounded-full bg-lime-500",
              !item.icon && "h-2.5 w-2.5",
              dotClassName
            )}
          >
            {item.icon && (
              <div className="h-3 w-3 text-black">{item.icon}</div>
            )}
          </div>
        </div>
        <div>
          <dl>
            <dt className="sr-only">Date</dt>
            <dd
              className={cn(
                "text-sm font-medium text-gray-800 dark:text-gray-200",
                dateClassName
              )}
            >
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </dd>
          </dl>
          <h3
            className={cn(
              "text-lg font-medium tracking-tight text-black dark:text-white",
              titleClassName
            )}
          >
            {item.title}
          </h3>
          {item.description && (
            <p
              className={cn(
                "text-sm text-gray-800 dark:text-gray-200",
                descriptionClassName
              )}
            >
              {item.description}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}

export function Timeline({
  items,
  initialCount = 5,
  className,
  showMoreText = "Show More",
  showLessText = "Show Less",
  dotClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
  buttonVariant = "ghost",
  buttonSize = "sm",
  animationDuration = 0.3,
  animationDelay = 0.1,
  showAnimation = true,
}: TimelineProps) {
  const [showAll, setShowAll] = useState(false);
  const sortedItems = items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const initialItems = sortedItems.slice(0, initialCount);
  const remainingItems = sortedItems.slice(initialCount);

  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      <div>
        <ul className="space-y-8">
          {initialItems.map((item, index) => (
            <motion.li
              key={index}
              initial={showAnimation ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animationDuration,
                delay: index * animationDelay,
              }}
            >
              <DesktopTimelineEntry
                item={item}
                dotClassName={dotClassName}
                lineClassName={lineClassName}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                dateClassName={dateClassName}
              />
              <MobileTimelineEntry
                item={item}
                dotClassName={dotClassName}
                lineClassName={lineClassName}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                dateClassName={dateClassName}
              />
            </motion.li>
          ))}
          <AnimatePresence>
            {showAll &&
              remainingItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: animationDuration,
                    delay: index * animationDelay,
                  }}
                >
                  <DesktopTimelineEntry
                    item={item}
                    dotClassName={dotClassName}
                    lineClassName={lineClassName}
                    titleClassName={titleClassName}
                    descriptionClassName={descriptionClassName}
                    dateClassName={dateClassName}
                  />
                  <MobileTimelineEntry
                    item={item}
                    dotClassName={dotClassName}
                    lineClassName={lineClassName}
                    titleClassName={titleClassName}
                    descriptionClassName={descriptionClassName}
                    dateClassName={dateClassName}
                  />
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>
      </div>
      {remainingItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className="gap-2 bg-lime-600 hover:bg-lime-700 text-white font-medium"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? showLessText : showMoreText}
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
