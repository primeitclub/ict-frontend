import * as React from "react";

type UploadProps = React.SVGProps<SVGSVGElement>;

const Upload = (props: UploadProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.0015 13V21M4.0015 14.899C1.96644 12.8198 1.42965 9.69852 2.65317 7.0589C3.87668 4.41927 6.60539 2.81164 9.50727 3.02077C12.4091 3.22991 14.8791 5.2122 15.7115 8H17.5015C19.4839 7.99977 21.2329 9.29679 21.8083 11.1938C22.3837 13.0908 21.6499 15.1409 20.0015 16.242"
      stroke="#13304F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 17L12 13L16 17"
      stroke="#13304F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Upload;
