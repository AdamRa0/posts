import useFetchImage from "@hooks/useFetchImage";
import React from "react";

type BannerComponentProps = {
  imagePath: string;
  altText: string;
};

export default function BannerComponent({
  imagePath,
  altText,
}: BannerComponentProps): React.JSX.Element {
  const banner = useFetchImage(imagePath);

  return <img src={banner} alt={altText} />;
}
