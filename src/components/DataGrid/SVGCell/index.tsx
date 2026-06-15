import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

interface SVGCell extends ICellRendererParams {
  svg: string;
}
const SVGCell = (props: SVGCell) => {
  return (
    <div className="flex gap-4 items-center h-full py-1">
      <div
        className="bg-white w-[2.5rem] h-[2.5rem] flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: props.svg }}
      ></div>
    </div>
  );
};

export default SVGCell;
