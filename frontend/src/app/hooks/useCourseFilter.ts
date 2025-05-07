//useCourseFilter.ts
'use client';

import { useState, useMemo } from 'react';

export type Course = {
  title: string;
  lecturer: string;
  description: string;
  totalLessons: number;
  totalExercises: number;
  status: string;
};

export const useCourseFilter = (courses: Course[]) => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'lecturer' | null>(null);
  const [active, setActive] = useState<'Title' | 'Lecturer' | ''>('');

  const toggleSwitchButton = (field: 'Title' | 'Lecturer') => {
    if (active === field) {
      setActive('');
      setSortBy(null);
    } else {
      setActive(field);
      setSortBy(field.toLowerCase() as 'title' | 'lecturer');
    }
  };

  const filteredCourses = useMemo(() => {
    return courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [courses, query]);

  const sortedCourses = useMemo(() => {
    if (!sortBy) return filteredCourses;
    return [...filteredCourses].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
  }, [filteredCourses, sortBy]);

  return {
    query,
    setQuery,
    sortBy,
    setSortBy,
    active,
    setActive,
    toggleSwitchButton,
    sortedCourses,
  };
};
