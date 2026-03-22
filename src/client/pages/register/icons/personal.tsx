import * as React from "react";

type PersonalProps = React.SVGProps<SVGSVGElement>;

const Personal: React.FC<PersonalProps> = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.8346 17.5V15.8333C15.8346 13.9924 14.3423 12.5 12.5013 12.5H7.5013C5.66035 12.5 4.16797 13.9924 4.16797 15.8333V17.5"
      stroke="#1E67FF"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66797 5.83333C6.66797 7.67305 8.16159 9.16667 10.0013 9.16667C11.841 9.16667 13.3346 7.67305 13.3346 5.83333C13.3346 3.99362 11.841 2.5 10.0013 2.5C8.16159 2.5 6.66797 3.99362 6.66797 5.83333V5.83333"
      stroke="#1E67FF"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Personal;