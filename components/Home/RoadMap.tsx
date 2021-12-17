import clsx from "clsx";
import SvgCheck from "../Icons/SvgCheck";
import Container from "../UI/Container";
import styles from "./RoadMap.module.css";
import Image from "next/image";

const RoadMap = () => {
  const phases = [
    {
      title: "Phase 1",
      goals: ["Seed Round", "Private Sale", "Landing"],
      className: "left-0 top-[-180px]",
    },
    {
      title: "Phase 2",
      goals: ["Close Beta Launch", "Market Place v1", "Pool"],
      className: "top-[-10px] right-[-140px]",
    },
    {
      title: "Phase 3",
      goals: ["Open Beta", "Guild"],
      className: "left-[220px] top-[220px]",
    },
    {
      title: "Phase 4",
      goals: ["Side-chain", "New Feature", "Game"],
      className: "bottom-[0px] right-[-140px]",
    },
  ];
  return (
    <div className={clsx(styles.background, "pt-32 relative")} id="section-roadmap">
      <div className="hidden px-4 py-20 mt-20 md:px-6 lg:px-8 xl:px-10 lg:block">
        <Container>
          <div className="flex flex-col items-center">
            <div className="space-y-8 text-center text-white">
              <h3 className="font-bold uppercase text-[40px]">Roadmap</h3>
              <p className="mx-auto">
                We believe artists need to be compensated for every sale,not just the first one!
              </p>
            </div>

            {/* DESKTOP */}
            <div className="relative flex mt-44">
              <Image
                src="/assets/images/landing/bg-roadmap.png"
                height={839 * 1.1}
                width={797 * 1.1}
                alt="bg-lines"
              />
              {phases.map((phase, index) => (
                <div
                  className={clsx(
                    styles["phase-container"],
                    "absolute mt-16 py-12 px-8 rounded-xl w-[270px] h-[270px]",
                    phase.className
                  )}
                  key={index}
                >
                  <div className="flex items-center flex-1 space-x-4">
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-white lg:text-2xl xl:text-3xl text-[28px]">
                        {phase.title}
                      </span>
                      <div className="w-20 ml-4 lg:hidden" />
                      <div className="lg:hidden ml-0.5" />
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 md:mt-5 lg:mt-6">
                    {phase.goals.map((goal, i) => (
                      <li className="text-white text-[18px] flex items-center space-x-3" key={i}>
                        <SvgCheck className="w-[18px] h-[18px]" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default RoadMap;
