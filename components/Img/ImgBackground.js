import Image from "next/image";
import React from "react";

function ImgBackground() {
  return (
    <div className="absolute top-0 left-0 min-h-screen w-full z-[-10]">
      <Image
      src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt="Picture of the author"
      unoptimized={true}
      layout="fill"
      objectFit="cover"

    />
    </div>
  );
}

export default ImgBackground;
