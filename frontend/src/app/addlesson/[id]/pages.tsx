'use client';

import React from 'react';
import PageBuilderCanvas from './PageBuilderCanvas';

const Page = ({ params }: { params: { id: string } }) => {
  return <PageBuilderCanvas />;
};

export default Page;