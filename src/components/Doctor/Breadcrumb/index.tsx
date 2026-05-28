import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DoctorBreadcrumbProps {
  items: BreadcrumbItem[];
}

const DoctorBreadcrumb: React.FC<DoctorBreadcrumbProps> = ({ items }) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-[100rem] mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <a href={item.href} className="hover:text-blue-600">
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-900 font-semibold">{item.label}</span>
              )}
              {index < items.length - 1 && <ChevronRight className="w-4 h-4" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorBreadcrumb;
