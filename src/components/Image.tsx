import React from "react";

type ImageSize =
  | 16
  | 24
  | 32
  | 48
  | 64
  | 96
  | 128
  | "square"
  | "1by1"
  | "4by3"
  | "3by2"
  | "16by9"
  | "2by1"
  | "5by4"
  | "5by3"
  | "3by1"
  | "4by5"
  | "3by4"
  | "2by3"
  | "3by5"
  | "9by16"
  | "1by2"
  | "1by3";

// https://github.com/couds/react-bulma-components/blob/master/src/components/image/image.js
interface ImageModifierProps {
  src?: string;
  alt?: string;
  size?: ImageSize;
  fallback?: string;
}
interface ImageProps /*ModifierProps,*/
  extends ImageModifierProps,
    Partial<Omit<React.ComponentPropsWithoutRef<"figure">, "unselectable">> {
  className?: string;
  style?: {};
}

export default function Image(props: ImageProps) {
  return (
    <figure className={`image ${props.className}`}>
      <img src={props.src} alt={props.alt} {...props} />
    </figure>
  );
}
