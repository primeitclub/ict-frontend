import SectionContainer from "../../../../shared/layouts/sectionContainer";

export const EventDetailBanner = () => {
  return (
    <div className="bg-[linear-gradient(0deg,#0a2050_0%,#0a1a3a_60%,#020919_100%)] min-h-[320px] items-center flex">
      <SectionContainer className="w-full px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-3">
          {/* Workshop Label */}
          <span
            className="text-base font-semibold tracking-wide"
            style={{ color: "#39BFF2" }}
          >
            Workshop
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-[40px] font-semibold text-primary leading-tight">
            Mastering Component-Driven Architecture
          </h1>

          {/* Tagline */}
          <p className="text-base md:text-xl text-primary">
            I always forget peoples face, but in your case, I'll be glad to make
            an exception ;)
          </p>

          {/* Meta Row */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mt-1">
            {/* Date */}
            <div className="flex items-center gap-2 text-white text-base md:text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="24"
                fill="none"
                viewBox="0 0 22 24"
              >
                <path
                  fill="#F5F7FA"
                  stroke="#F5F7FA"
                  strokeWidth="1.839"
                  d="M19.896 22.621a.97.97 0 0 1-.535.149H1.987a.96.96 0 0 1-.53-.149zm-18.829-.39a.96.96 0 0 1-.147-.529V3.744a.97.97 0 0 1 .147-.534zM16.512.92c.037 0 .051.005.053.006l.007.004q.005.003.018.014v.001l.016.018.001.004q.002.005.002.03V2.67h2.752c.2 0 .376.047.542.154H1.45a.95.95 0 0 1 .538-.154H4.74V.996q0-.024.003-.031l.001-.006.001-.002q.002-.003.014-.017v.001l.02-.015.001-.002h.001l.007-.002.03-.002c.036 0 .051.005.054.006l.007.004.018.015.015.017h.001l.001.005.002.03V2.67h11.519V.996l.002-.031q0-.004.002-.005V.958l.015-.017q.014-.014.018-.015l.004-.002V.923l.005-.001zm3.77 2.28a.96.96 0 0 1 .154.544v17.958a.95.95 0 0 1-.155.54z"
                ></path>
              </svg>
              <span>October 24, 2026</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 text-white text-base md:text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                style={{ color: "#8a9bb5" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.5 9a3 3 0 0 1 5 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>NPR 500 /per team</span>
            </div>

            {/* Registration Status */}
            <div className="flex items-center gap-2 text-base md:text-xl">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: "#22c55e" }}
              />
              <span style={{ color: "#4ade80" }}>Registration Open</span>
            </div>
          </div>
        </div>

        {/* CTA Button — full width on mobile, auto on desktop */}
        <div className="w-full md:w-auto md:flex-shrink-0 md:ml-8">
          <button
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#3571F0" }}
          >
            Register Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </SectionContainer>
    </div>
  );
};
