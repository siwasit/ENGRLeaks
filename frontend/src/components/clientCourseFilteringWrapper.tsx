// components/ClientCourseFilteringWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const CourseFilteringSection = dynamic(() => import('@/components/course_filtering_section'), {
  ssr: false,
});

export default function ClientCourseFilteringWrapper() {
  return <CourseFilteringSection />;
}
