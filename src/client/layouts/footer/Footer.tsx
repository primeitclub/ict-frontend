"use client";

import { useNavigate, NavLink } from "react-router-dom";
import Logo2 from "../headers/Logo/Logo2";
import PrimeITClub from "../../../assets/PrimeITClub.svg";
import PrimeCollege from "../../../assets/PrimeCollege.svg";
import SectionContainer from "../../components/sectionContainer";
import { useVersion } from "../../routes/VersionContext";

export const Footer = () => {
  const navigate = useNavigate();
  const { getPath } = useVersion();

  const pages = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/teams", label: "Teams" },
    { path: "/sponsors", label: "Sponsors" },
    { path: "/contributors", label: "Contributors" },
  ];

  return (
    <SectionContainer
      width="navbar"
      className="px-4 sm:px-6 !pt-20"
      as="footer"
    >
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:items-start lg:gap-0">
        <div className="relative w-full lg:w-auto">
          <div
            className="flex flex-col items-center cursor-pointer lg:items-start"
            onClick={() => navigate(getPath("/"))}
          >
            <div className="flex flex-col items-center lg:items-start w-[164px]">
              <Logo2 size="lg" className="h-9 sm:h-11 md:h-16 lg:h-20" />
              <p className="mt-2 text-lg font-semibold font-mona bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent text-center lg:text-left">
                Fusion Of Tech Talent & Creativity
              </p>
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`
        absolute right-4 top-1/2 -translate-y-1/2 
        flex items-center justify-center w-10 h-10 
        rounded-full bg-gradient-to-tr from-[#007AFF] to-[#DBF5FF] 
        lg:hidden
      `}
            aria-label="Back to top"
          >
            <svg
              width="17"
              height="22"
              viewBox="0 0 17 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.2599 2.58691L8.2599 21.2298M8.2599 2.58691L15.251 8.32318M8.2599 2.58691L1.26883 8.32318"
                stroke="white"
                strokeWidth="4"
              />
            </svg>
          </button>
        </div>

        <div className="text-center lg:text-left ">
          <h1 className="text-[#50A6FE] font-sans font-semibold sm:text-xl text-lg">
            Contact Us
          </h1>
          <ul className="lg:mt-[16px] text-sm lg:text-base">
            <li>+123 45 6 789</li>
          </ul>
          <ul className="lg:mt-[16px] text-sm lg:text-base">
            <li>itclub.prime@prime.edu.np</li>
          </ul>
        </div>
        <div className="text-center lg:text-left ">
          <h1 className="text-[#50A6FE] font-sans font-semibold sm:text-xl text-lg">
            Connect
          </h1>
          <div>
            <ul className="mt-[5px] flex flex-row lg:flex-col gap-6 lg:gap-3 justify-center lg:justify-start list-none p-0 m-0">
              {" "}
              <li>
                <a
                  href="#"
                  className="lg:mt-[17px] flex items-center gap-[10px]"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <g clipPath="url(#clip0_3050_1079)">
                        <path
                          fill="#fff"
                          fillRule="evenodd"
                          d="M9.969.303q2.704.03 4.886 1.33a9.76 9.76 0 0 1 3.472 3.493q1.29 2.195 1.321 4.916-.075 3.723-2.348 6.359c-1.514 1.757-3.454 2.845-5.462 3.262v-6.959h1.898l.43-2.734H11.29V8.18a1.56 1.56 0 0 1 .331-1.03q.345-.438 1.215-.461h1.736V4.294q-.038-.012-.71-.095a14 14 0 0 0-1.53-.096q-1.734.009-2.745.98-1.01.97-1.031 2.809V9.97H6.369v2.734h2.188v6.959c-2.466-.417-4.405-1.505-5.92-3.262Q.366 13.765.29 10.04q.03-2.72 1.321-4.915a9.76 9.76 0 0 1 3.473-3.494Q7.264.335 9.969.303"
                          clipRule="evenodd"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_3050_1079">
                          <path fill="#fff" d="M0 0h20v20H0z"></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span className="hidden lg:inline">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="lg:mt-[5px] flex items-center gap-[12px] "
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <rect width="20" height="20" fill="#fff" rx="10"></rect>
                      <path
                        fill="#020919"
                        fillRule="evenodd"
                        d="M10 4.388c-1.524 0-1.715.007-2.313.034s-1.006.122-1.363.261a2.75 2.75 0 0 0-.993.647 2.75 2.75 0 0 0-.648.994c-.138.357-.233.765-.26 1.362-.028.599-.034.79-.034 2.314s.006 1.715.033 2.314c.028.597.123 1.005.261 1.362.144.369.336.682.648.994.311.312.624.504.993.647.357.139.765.233 1.363.26.598.028.79.034 2.313.034s1.715-.006 2.314-.033c.597-.027 1.005-.122 1.362-.261.369-.143.682-.335.994-.647s.504-.625.647-.994c.139-.357.234-.765.261-1.362.027-.599.034-.79.034-2.314s-.007-1.715-.034-2.314c-.027-.597-.122-1.005-.26-1.362a2.75 2.75 0 0 0-.648-.994 2.75 2.75 0 0 0-.994-.647c-.357-.139-.765-.234-1.362-.26-.599-.028-.79-.035-2.314-.035M8.13 10a1.87 1.87 0 1 0 3.74 0 1.87 1.87 0 0 0-3.74 0m-1.011 0a2.882 2.882 0 1 1 5.763 0 2.882 2.882 0 0 1-5.763 0m5.877-2.322a.673.673 0 1 0 0-1.347.673.673 0 0 0 0 1.347"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <span className="hidden lg:inline">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="lg:mt-[5px] flex items-center gap-[12px] "
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <circle cx="10" cy="10" r="10" fill="white" />
                      <path
                        fill="#020919"
                        d="M6.93 14.025H5.053V8.023H6.93zM5.94 7.272h-.015c-.68 0-1.12-.459-1.12-1.041 0-.594.455-1.041 1.146-1.041.692 0 1.116.447 1.131 1.04.004.58-.436 1.042-1.142 1.042m8.489 6.752h-2.127v-3.103c0-.812-.33-1.368-1.064-1.368-.56 0-.871.376-1.014.736-.053.128-.045.308-.045.492v3.243H8.072s.026-5.5 0-6h2.108v.943c.124-.414.796-1 1.871-1 1.334 0 2.379.864 2.379 2.72z"
                      />
                    </svg>{" "}
                  </span>{" "}
                  <span className="hidden tracking-wide lg:inline">
                    LinkedIn
                  </span>
                </a>
              </li>
            </ul>
          </div>{" "}
        </div>

        <div className="text-center lg:text-left">
          <div className="flex flex-row items-center gap-2 lg:gap-[18px]">
            <p className="font-normal text-[14px] lg:text-[16px]">
              Organized by:
            </p>
            <img
              src={PrimeITClub}
              alt="Prime IT Club Logo"
              className="h-6 lg:h-auto"
            />
          </div>
          <div className="flex flex-row items-center gap-2 lg:gap-[18px] mt-[27px]">
            <p className="font-normal text-[14px] lg:text-[16px]">
              Supported By:
            </p>
            <img
              src={PrimeCollege}
              alt="Prime College"
              className="h-6 lg:h-auto"
            />
          </div>
        </div>
      </div>

      <div className="mt-9 border-[0.8px] border-[#353535]"></div>

      <div className="flex flex-col items-center w-full gap-6 lg:flex-row lg:justify-between mt-9 lg:gap-0">
        <nav className="flex flex-wrap justify-center w-full gap-4 font-sans text-md font-semibold lg:justify-start lg:gap-8 lg:text-lg lg:w-auto">
          {pages.map(({ label, path }) => (
            <NavLink
              key={`${label}-${path}`}
              to={getPath(path)}
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-blue-400"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="items-center justify-center hidden w-full gap-2 text-sm font-semibold lg:flex hover:text-blue-400 lg:w-auto font-hubot"
          aria-label="Back to top"
        >
          Back to Top
          <span
            className="flex items-center justify-center 
w-10 h-10 lg:w-14 lg:h-14 
rounded-full bg-gradient-to-tr from-[#007AFF] to-[#DBF5FF]"
          >
            <svg
              width="17"
              height="22"
              viewBox="0 0 17 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.2599 2.58691L8.2599 21.2298M8.2599 2.58691L15.251 8.32318M8.2599 2.58691L1.26883 8.32318"
                stroke="white"
                strokeWidth="4"
              />
            </svg>
          </span>
        </button>
      </div>

      <div className="relative mt-8 overflow-hidden text-center">
        <h1
          className="font-extrabold whitespace-nowrap  bg-[linear-gradient(to_bottom,#FFFFFF_0%,#DBF5FF_10%,#007AFF_50%,#04143B_100%)]  bg-clip-text text-transparent
                 text-[clamp(24px,14vw,190px)] leading-tight"
        >
          ICT MEETUP
        </h1>
        {/* h-[3em] sm:h-[5em] md:h-[7em] lg:h-[12em] */}
        <div
          className="absolute bottom-0 left-0 w-full
              h-[clamp(45px,12vw,800px)]
               bg-gradient-to-t from-[#020919] to-transparent pointer-events-none"
        ></div>
      </div>

      <div className="my-6 mb-12 text-xs text-center text-[#FFFFFF] lg:text-sm font-regular font-sans">
        <p>© 2026 ICT Meetup V8 | Prime IT Club, Prime College</p>
      </div>
    </SectionContainer>
  );
};
