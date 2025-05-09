import React from "react";

type CourseImageProps = {
  imageUrl: string;
  imageDescription: string;
  style?: React.CSSProperties;
  // height?: string;
  // width?: string;
};

// let width: string = "w-[75%]";
// let height: string = "h-auto";

export default function CourseImage({ imageUrl, imageDescription, style }: CourseImageProps) {
  return (
    <div className="flex flex-col justify-center my-8 items-center text-center">
      <img
        src={imageUrl}
        alt={imageDescription}
        // className={`${width} ${height} rounded-lg shadow-lg fill`}
        className={`rounded-lg shadow-lg fill`}
        style={style}
      />
      <div className="mt-2 text-sm text-neutral-600">
        {imageDescription}
      </div>
    </div>
  );
}
