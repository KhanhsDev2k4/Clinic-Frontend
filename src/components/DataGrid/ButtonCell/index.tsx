import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import Trash from 'assets/svg/trash-2.svg';
import Edit from 'assets/svg/edit-2.svg';
import Eye from 'assets/svg/eye.svg';
import Setting from 'assets/svg/settings.svg';

interface ButtonCell extends ICellRendererParams {
  buttons?: Array<{
    render: React.ReactNode;
    onClick: (data?: any) => void;
    hide?: (data?: any) => boolean;
    disabled?: (data?: any) => boolean;
  }>;
}
const ButtonCell = (props: ButtonCell) => {
  return (
    <div className="flex gap-4 items-center h-full py-1">
      {props.buttons?.map((item, idx) => {
        if (item.hide?.(props.data)) {
          return null;
        }
        return (
          <button
            type="button"
            className="h-full"
            key={idx}
            disabled={item.disabled?.(props.data)}
            onClick={() => item.onClick(props.data)}
          >
            {item.render}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonCell;

const VariantMap = {
  success: 'bg-green-200 hover:bg-green-100 text-green-500',
  info: 'bg-blue-200 hover:bg-blue-100 text-blue-500',
  warning: 'bg-yellow-200 hover:bg-yellow-100 text-yellow-500',
  error: 'bg-red-200 hover:bg-red-100 text-red-500',
  default: 'bg-primary-200 hover:bg-primary-100 text-primary-500',
};

export const TrashIcon = () => {
  return (
    <div className="bg-red-200 hover:bg-red-100 text-red-500 w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-lg">
      <Trash className="hover:cursor-pointer" />
    </div>
  );
};

export const EditIcon = () => {
  return (
    <div className="bg-blue-200 hover:bg-blue-100 text-blue-500 w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-lg">
      <Edit className="hover:cursor-pointer" />
    </div>
  );
};

export const ViewIcon = () => {
  return (
    <div className="bg-purple-200 hover:bg-purple-100 text-purple-500 w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-lg">
      <Eye className="hover:cursor-pointer" />
    </div>
  );
};

export const SettingIcon = () => {
  return (
    <div className="bg-blue-200 hover:bg-blue-100 text-blue-500 w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-lg">
      <Setting className="hover:cursor-pointer" />
    </div>
  );
};

export const LabelButton = (props: {
  label: string;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
}) => {
  return (
    <div
      className={` ${
        VariantMap[props.variant || 'default']
      } px-2 h-[3.4rem] text-[1.2rem] leading-[1.2rem] flex items-center justify-center rounded-lg`}
    >
      {props.label}
    </div>
  );
};
