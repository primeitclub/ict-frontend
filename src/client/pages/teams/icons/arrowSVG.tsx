import type { SVGProps } from "react";

interface ArrowSVGProps extends SVGProps<SVGSVGElement> {
  useSolidStroke?: boolean; // toggle between gradient and solid color
  solidStrokeColor?: string; // default to #DBF5FF
}

const ArrowSVG = ({
  useSolidStroke = false,
  solidStrokeColor = "#DBF5FF",
  ...props
}: ArrowSVGProps) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.54698 3.35557C7.57397 3.15192 7.43076 2.96495 7.22711 2.93796L3.90845 2.49814C3.7048 2.47115 3.51783 2.61436 3.49084 2.81801C3.46385 3.02166 3.60706 3.20863 3.81071 3.23562L6.76063 3.62657L6.36968 6.57649C6.34269 6.78014 6.4859 6.96711 6.68955 6.9941C6.8932 7.02109 7.08017 6.87788 7.10716 6.67423L7.54698 3.35557ZM2.73828 6.70752L2.96446 7.00281L7.40442 3.602L7.17824 3.3067L6.95206 3.01141L2.5121 6.41223L2.73828 6.70752Z"
      fill={useSolidStroke ? solidStrokeColor : "url(#paint0_linear)"}
    />
    <circle
      cx={4.95953}
      cy={4.95953}
      r={4.72336}
      stroke={useSolidStroke ? solidStrokeColor : "url(#paint1_linear)"}
      strokeWidth={0.472332}
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1={3.04232}
        y1={7.10446}
        x2={7.48228}
        y2={3.70364}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBF5FF" />
        <stop offset={1} stopColor="#51A7FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1={1.45299}
        y1={7.50225}
        x2={8.71792}
        y2={2.05355}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBF4FF" />
        <stop offset={1} stopColor="#51A7FE" />
      </linearGradient>
    </defs>
  </svg>
);

export default ArrowSVG;
