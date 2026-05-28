import React from 'react';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = () => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-[100rem] mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">
            Trang chủ
          </a>
          <ChevronRight className="w-4 h-4" />
          <a href="/chuyen-khoa" className="hover:text-blue-600">
            Chuyên khoa
          </a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-semibold">Tim mạch</span>
        </div>
      </div>
    </div>
  );
};
export default Breadcrumb;
