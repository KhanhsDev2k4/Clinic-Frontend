"use client";
import React, { Ref, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { BodyScrollEvent, GridApi, GridReadyEvent, ViewportChangedEvent } from "ag-grid-community";
import clsx from "clsx";
import Pagination from "@/components/Pagination";
import "./style.scss";
import NoRowsOverlay from "@/components/NoRowsOverlay";
import Spinner from "@/components/Spinner";
interface DataGridProps extends AgGridReactProps {
  onScrollToBottom?: () => void;
  loading?: boolean;
  color?: "dark";
  innovationTheme?: boolean;
  className?: string;
  paginationProps?: {
    totalCount: number;
    totalPage: number;
    pageNum: number;
    onChange: (page: number) => void;
  };
}
export interface DataGridHandle {
  api?: GridApi;
  showLoadingOverlay: () => void;
  hideOverlay: () => void;
}
const DataGrid = forwardRef(
  (
    props: DataGridProps,
    ref:
      | ((instance: DataGridHandle) => void)
      | React.MutableRefObject<DataGridHandle | null | undefined>
      | Ref<DataGridHandle | null | undefined>
      | null
  ) => {
    const { defaultColDef, onGridReady, gridOptions, onScrollToBottom, ...rest } = props;
    const [gridInit, setGridInit] = useState<boolean>(false);
    const scrollOffset = 0.95;
    const containerRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef(false);
    const dataGridRef = useRef<{ api?: GridApi }>({});

    useImperativeHandle(
      ref,
      () => ({
        api: dataGridRef.current.api,
        showLoadingOverlay: () => {
          dataGridRef.current.api?.showLoadingOverlay();
          loadingRef.current = true;
        },
        hideOverlay: () => {
          dataGridRef.current.api?.hideOverlay();
          loadingRef.current = false;
        },
      }),
      [gridInit]
    );

    const onBodyScroll = async (event: BodyScrollEvent) => {
      if (event.direction === "vertical") {
        if (dataGridRef.current.api) {
          const { bottom, top } = dataGridRef.current.api.getVerticalPixelRange();
          const displayedCount = dataGridRef.current.api.getDisplayedRowCount();
          const rowHeight = dataGridRef.current.api.getSizesForCurrentTheme().rowHeight;
          const height = displayedCount * rowHeight || 1;
          const ratio = bottom / height;

          if (ratio > scrollOffset) {
            if (onScrollToBottom && !loadingRef.current) {
              loadingRef.current = true;

              onScrollToBottom();
            }
          }
        }
      }
    };

    const onViewportChanged = (event: ViewportChangedEvent) => {
      if (containerRef.current && event.lastRow !== -1) {
        const agBodyViewport: HTMLElement = containerRef.current.querySelector(
          ".ag-body-viewport"
        ) as HTMLElement;
        if (agBodyViewport) {
          if (agBodyViewport.scrollHeight <= agBodyViewport.clientHeight) {
            if (onScrollToBottom && !loadingRef.current) {
              onScrollToBottom();
              loadingRef.current = true;
            }
          }
        }
      }
    };

    const handleGridReady = (event: GridReadyEvent) => {
      dataGridRef.current.api = event.api;
      setGridInit(true);
      setTimeout(() => {
        onGridReady?.(event);
      });
    };

    useEffect(() => {
      if (gridInit) {
        if (props.loading) {
          dataGridRef.current.api?.showLoadingOverlay();
          loadingRef.current = true;
        } else {
          dataGridRef.current.api?.hideOverlay();
          loadingRef.current = false;
        }
      }
    }, [props.loading, gridInit]);

    return (
      <div
        className={clsx(
          "flex flex-col w-full h-full data-grid-container overflow-x-scroll",
          props.className
        )}
      >
        <div
          className={clsx("ag-theme-quartz h-full data-grid px-[1.6rem]", props.color, {
            "innovation-theme": props.innovationTheme,
          })}
          ref={containerRef}
        >
          <AgGridReact
            onGridReady={handleGridReady}
            onBodyScroll={onBodyScroll}
            onViewportChanged={onViewportChanged}
            defaultColDef={{
              resizable: false,
              minWidth: 60,
              ...defaultColDef,
              headerValueGetter: (params) => {
                return params.colDef.headerName ? params.colDef.headerName : "";
              },
            }}
            scrollbarWidth={8}
            suppressDragLeaveHidesColumns
            suppressCellFocus
            suppressRowHoverHighlight
            animateRows={false}
            noRowsOverlayComponent={NoRowsOverlay}
            loadingOverlayComponent={Spinner}
            {...rest}
          />
        </div>
        {props.paginationProps && <Pagination pagination={props.paginationProps} />}
      </div>
    );
  }
);
DataGrid.displayName = "DataGrid";
export default DataGrid;
