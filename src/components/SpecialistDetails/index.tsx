import React from 'react';

import FaQ from './FaQ';
import CTA from './CTA';
import Doctors from './Doctors';
import Process from './Process';
import Reviews from './Reviews';
import Overview from './Overview';
import Services from './Services';
import Equipment from './Equipment';
import Breadcrumb from './Breadcrumb';
import RelatedSpecialties from './Related';
import CommonDiseases from './CommonDiseases';
import BannerDetailsSpecialist from './Banner';

const SpecialistDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BannerDetailsSpecialist />
      <Breadcrumb />
      <Overview />
      <Doctors />
      <Services />
      <Equipment />
      <Process />
      <CommonDiseases />
      <FaQ />
      <Reviews />
      <RelatedSpecialties />
      <CTA />
    </div>
  );
};

export default SpecialistDetails;
