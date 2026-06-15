'use client';
import React from 'react';
import NoDataIcon from 'assets/svg/no-data.svg';
import clsx from 'clsx';
import { useTranslation } from 'app/i18n/client';

interface NoRowsOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

const NoRowsOverlay = (props: NoRowsOverlayProps) => {
  const { t } = useTranslation();

  return (
    <div
      {...props}
      className={clsx(
        'flex flex-col flex-1 items-center justify-center h-full py-[2rem] 2xl:py-[3rem] mt-[5rem]',
        props.className,
      )}
    >
      <NoDataIcon className="w-[6rem] h-[6rem]" />
      <div className="text-[#898BAB] text-[1.4rem] font-[500]">
        {t('common.empty.noData')}
      </div>
    </div>
  );
};

export default NoRowsOverlay;
