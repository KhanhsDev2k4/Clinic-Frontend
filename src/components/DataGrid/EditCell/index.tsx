import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import EditIcon from 'assets/svg/edit-3.svg';

interface EditCellProps extends ICellRendererParams {
  onEdit(data?: Record<string, unknown>): void;
}

const EditCell = (props: EditCellProps) => {
  return (
    <div className="w-full h-full items-center flex gap-2">
      <div className="line-clamp-1 flex-1">
        {props.formatValue?.(props.value) ?? String(props.data)}
      </div>
      <button
        type="button"
        data-tooltip-id="base-tooltip"
        data-tooltip-content="edit  "
        onClick={() => props.onEdit?.(props.data)}
        className="h-5 w-5 bg-gray-200 hover:bg-gray-100 rounded-md flex items-center justify-center"
      >
        <EditIcon width={14} height={14} />
      </button>
    </div>
  );
};

export default EditCell;
