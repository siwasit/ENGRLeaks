import React from "react";

type CourseImageProps = {
    imageUrl: string;
    imageDescription: string;
  };
  
export default function CourseImage({ imageUrl, imageDescription }: CourseImageProps) {
  return (
    <div className="flex flex-col justify-center my-8 items-center text-center">
      <img
        src={imageUrl}
        alt="Course Image"
        className="w-[75%] h-auto rounded-lg shadow-lg"
      />
      <div className="mt-2 text-sm text-neutral-600">
        {imageDescription}
      </div>
    </div>
  );
}
  