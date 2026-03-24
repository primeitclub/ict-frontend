import * as React from "react";

type SVGComponentProps = React.SVGProps<SVGSVGElement>;

const Academic: React.FC<SVGComponentProps> = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.8503 9.10167C18.1552 8.96715 18.3507 8.66388 18.3473 8.33062C18.3438 7.99735 18.1421 7.69819 17.8345 7.57L10.692 4.31667C10.2526 4.11627 9.74799 4.11627 9.30865 4.31667L2.16699 7.56667C1.86382 7.69944 1.66797 7.99904 1.66797 8.33C1.66797 8.66096 1.86382 8.96056 2.16699 9.09333L9.30865 12.35C9.74799 12.5504 10.2526 12.5504 10.692 12.35L17.8503 9.10167M18.3337 8.33333V13.3333"
      stroke="#1E67FF"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 10.4167V13.3333C5 14.7131 7.24042 15.8333 10 15.8333C12.7596 15.8333 15 14.7131 15 13.3333V10.4167"
      stroke="#1E67FF"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Academic;
