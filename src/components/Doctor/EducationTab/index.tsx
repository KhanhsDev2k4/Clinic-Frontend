import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

import TimelineItem from '../TimelineItem';

interface Education {
  year: string;
  school: string;
  degree: string;
}

interface WorkHistory {
  year: string;
  place: string;
  position: string;
}

interface EducationTabProps {
  education: Education[];
  workHistory: WorkHistory[];
}

const EducationTab: React.FC<EducationTabProps> = ({ education, workHistory }) => {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quá trình đào tạo</h3>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <TimelineItem
              key={i}
              icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
              year={edu.year}
              title={edu.degree}
              subtitle={edu.school}
              isLast={i === education.length - 1}
              color="blue"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quá trình công tác</h3>
        <div className="space-y-4">
          {workHistory.map((work, i) => (
            <TimelineItem
              key={i}
              icon={<Briefcase className="w-6 h-6 text-green-600" />}
              year={work.year}
              title={work.position}
              subtitle={work.place}
              isLast={i === workHistory.length - 1}
              color="green"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default EducationTab;
