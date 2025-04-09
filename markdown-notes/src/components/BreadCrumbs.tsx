import React from 'react';

interface BreadCrumbsProps {
  notebook: string;
  folder: string;
  file: string;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  notebook,
  folder,
  file
}) => {
  return (
    <div className="bread-crumbs">
      <p>{`${notebook} > ${folder} > ${file}`}</p>
    </div>
  );
};

export default BreadCrumbs;
