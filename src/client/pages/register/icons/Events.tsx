import * as React from "react";

type SVGComponentProps = React.SVGProps<SVGSVGElement>;

const Events = (props: SVGComponentProps) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.33464 4.16666H16.668C17.5884 4.16666 18.3346 4.91285 18.3346 5.83332V14.1667C18.3346 15.0871 17.5884 15.8333 16.668 15.8333H3.33464C2.41416 15.8333 1.66797 15.0871 1.66797 14.1667V5.83332C1.66797 4.91285 2.41416 4.16666 3.33464 4.16666V4.16666"
      stroke="#1E67FF"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.66797 8.33334H18.3346"
      stroke="#1E67FF"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Events;
