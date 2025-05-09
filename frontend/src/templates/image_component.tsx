import React from "react";
import Image from 'next/image';

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
      <Image
        src={imageUrl} // path relative to the public folder
        alt={imageDescription}
        width={typeof style?.height === 'number' ? style?.height : 100} // Use the height as number or default to 100
        height={typeof style?.height === 'number' ? style?.height : 100} // Use the height as number or default to 100
      />

      <div className="mt-2 text-sm text-neutral-600">
        {imageDescription}
      </div>
    </div>
  );
}
