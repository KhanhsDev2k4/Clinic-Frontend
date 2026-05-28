"use client";

import { DoctorCard } from "@/components/SpecialtyDialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { DoctorProfileResponse } from "@/interface/response";
import { useFetchPublicDoctor } from "@/hooks/public/usePublicDoctor";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DoctorListFilter } from "@/components/LandingPage/Doctors/config";
import _ from "lodash";

const COLUMNS = {
  default: 2,
  sm: 2,
  md: 3,
  lg: 4,
};

const getColumnCount = (width: number) => {
  if (width >= 1024) return COLUMNS.lg;
  if (width >= 768) return COLUMNS.md;
  return COLUMNS.default;
};

interface DoctorGridProps {
  filter: DoctorListFilter;
  onTotalChange?: (total: number) => void;
}

const DoctorGrid = ({ filter, onTotalChange }: DoctorGridProps) => {
  const [items, setItems] = useState<DoctorProfileResponse[]>([]);
  const [columnCount, setColumnCount] = useState(2);

  const hasMore = useRef<boolean>(true);
  const querying = useRef<boolean>(false);
  const pageRef = useRef<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const fetchList = useFetchPublicDoctor();

  const requestData = async () => {
    if (querying.current || !hasMore.current) return;
    querying.current = true;

    try {
      const payload = _.merge({}, filter, { page: pageRef.current });
      const pageNewItems = await fetchList.trigger(payload);
      const newItems = pageNewItems?.body?.data;

      if (!newItems?.length) {
        hasMore.current = false;
      } else {
        setItems((prev) => [...prev, ...newItems]);
        pageRef.current += 1;
      }
    } finally {
      querying.current = false;
    }
  };

  const refreshData = async () => {
    setItems([]);
    hasMore.current = true;
    querying.current = false;
    pageRef.current = 0;
    onTotalChange?.(0);
    await requestData();
  };

  useEffect(() => {
    refreshData();
  }, [filter]);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setColumnCount(getColumnCount(entry.contentRect.width));
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rows = Math.ceil(items.length / columnCount);

  const virtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 280,
    overscan: 3,
  });

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 200;
    if (nearBottom) requestData();
  }, [requestData]);

  if (!items.length && !querying.current) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
          <span className="text-3xl">🔍</span>
        </div>
        <p className="text-gray-500 font-medium">No doctors found</p>
        <p className="text-sm text-gray-400">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="flex flex-col h-full flex-1 overflow-hidden pb-8"
    >
      <div
        ref={gridRef}
        className="relative overflow-y-auto"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columnCount;
          const rowItems = items.slice(startIndex, startIndex + columnCount);

          return (
            <div
              key={virtualRow.key}
              ref={virtualizer.measureElement}
              data-index={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                className="grid gap-5 pb-5"
                style={{
                  gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                }}
              >
                {rowItems.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} onBook={() => {}} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!hasMore.current && items.length > 0 && (
        <p className="text-center text-sm text-gray-400 py-6">Đã hiển thị tất cả bác sĩ</p>
      )}
    </div>
  );
};

export default DoctorGrid;
