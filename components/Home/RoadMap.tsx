import clsx from "clsx";
import SvgDot from "../Icons/SvgDot";
import styles from "./RoadMap.module.css";
import Image from "next/image";
import Container from "../UI/Container";
import SvgCheck from "../Icons/SvgCheck";
import SvgCheckDone from "../Icons/SvgCheckDone";

const RoadMap = () => {
  const phases = [
    {
      title: "Phase 1",
      goals: ["Seed Round", "Private Sale", "Landing"],
      className: "left-0 top-[-18%]",
      done: true,
    },
    {
      title: "Phase 2",
      goals: ["Close Beta Launch", "Market Place v1", "Pool"],
      className: "top-[2%] right-0",
      done: false,
    },
    {
      title: "Phase 3",
      goals: ["Open Beta", "Guild"],
      className: "left-[24%] top-[26%]",
      done: false,
    },
    {
      title: "Phase 4",
      goals: ["Side-chain", "New Feature", "Game"],
      className: "bottom-0 right-0",
      done: false,
    },
  ];
  return (
    <div className={clsx(styles.background, "relative")} id="section-roadmap">
      <div className="px-4 py-20 mt-20 md:px-6 lg:px-8 xl:px-10">
        <Container>
          <div className="flex flex-col items-center">
            <div className="space-y-8 text-center text-white">
              <h3 className="font-bold uppercase text-[40px]">Roadmap</h3>
              <p className="mx-auto">
                We believe artists need to be compensated for every sale,not just the first one!
              </p>
            </div>

            <div
              className={clsx("relative mt-52 mb-40", "sm:mt-48 sm:mb-20", "md:mb-28", "lg:mb-0")}
            >
              <div className="px-4 lg:hidden">
                <Image
                  src="/assets/images/landing/bg-roadmap-mb.png"
                  height={669 * 1.1}
                  width={328 * 1.1}
                  alt="bg-lines"
                  className="lg:block"
                />
              </div>
              <div
                className={clsx(
                  "absolute -top-1/3 sm:-top-1/4 inset-0 lg:relative flex w-full lg:w-auto flex-col"
                )}
              >
                <div className="hidden pr-28 lg:block">
                  <Image
                    src="/assets/images/landing/bg-roadmap.png"
                    height={975 * 1.1}
                    width={876 * 1.1}
                    alt="bg-lines"
                    className="lg:block"
                  />
                </div>
                {phases.map((phase, index) => (
                  <div
                    className={clsx(
                      styles["phase-container"],
                      "flex flex-col mt-10 py-12 px-8 rounded-xl w-[225px] h-[225px]",
                      "sm:w-[250px] sm:h-[249px]",
                      "lg:w-[270px] lg:h-[282px] lg:absolute lg:mt-16",
                      phase.className,
                      index % 2 === 1 && "self-end"
                    )}
                    key={index}
                  >
                    <div
                      className={clsx(
                        styles.circle,
                        "w-[64px] h-[64px] top-[-32px]",
                        "lg:w-[80px] lg:h-[80px] top-[-40px]",
                        "absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                      )}
                    >
                      {phase.done ? <SvgCheckDone /> : <SvgCheck />}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span className="whitespace-nowrap font-bold text-white text-[18px] lg:text-[28px]">
                          {phase.title}
                        </span>
                        <div className="w-20 ml-4 lg:hidden" />
                        <div className="lg:hidden ml-0.5" />
                      </div>
                    </div>
                    <ul className="mt-4 space-y-3 lg:space-y-4 md:mt-5 lg:mt-6">
                      {phase.goals.map((goal, i) => (
                        <li
                          className="text-white text-[14px] lg:text-[18px] flex items-center space-x-3"
                          key={i}
                        >
                          <SvgDot />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default RoadMap;
