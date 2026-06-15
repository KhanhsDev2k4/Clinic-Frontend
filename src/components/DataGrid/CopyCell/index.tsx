import { ICellRendererParams } from 'ag-grid-community';
import React, { useEffect, useRef, useState } from 'react';
import CopyIcon from 'assets/svg/copy.svg';
import CheckIcon from 'assets/svg/check.svg';
import { uuid } from 'utils/common';
interface CopyCellProps extends ICellRendererParams {}

const CopyCell = (props: CopyCellProps) => {
  const buttonId = useRef(uuid());
  const [isCopied, setIsCopied] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>();
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-full items-center flex gap-2">
      <div className="line-clamp-1 flex-1">{props.value}</div>
      <button
        id={buttonId.current}
        type="button"
        data-tooltip-id="base-tooltip"
        data-tooltip-content="copy"
        onClick={() => {
          navigator.clipboard.writeText(props.value).then(() => {
            setIsCopied(true);
            if (timer.current) {
              clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
              setIsCopied(false);
              timer.current = null;
            }, 500);
          });
        }}
        className="h-5 w-5 bg-gray-200 hover:bg-gray-100 rounded-md flex items-center justify-center"
      >
        {isCopied ? (
          <CheckIcon width={14} height={14} className="text-green-500" />
        ) : (
          <CopyIcon width={14} height={14} />
        )}
      </button>
    </div>
  );
};

export default CopyCell;
