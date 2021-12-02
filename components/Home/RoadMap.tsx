import SvgCircleWithRing from "../Icons/SvgCircleWithRing";
import SvgTripleCircle from "../Icons/SvgTripleCircle";
import Container from "../UI/Container";

const RoadMap = () => {
  const phases = [
    {
      title: "Phase 1",
      goals: ["Seed Round", "Private Sale", "Landing"],
    },
    {
      title: "Phase 2",
      goals: ["Close Beta Launch", "Market Place v1", "Pool"],
    },
    {
      title: "Phase 3",
      goals: ["Open Beta", "Guild"],
    },
    {
      title: "Phase 4",
      goals: ["Side-chain", "New Feature", "Game"],
    },
  ];
  return (
    <div className="px-4 py-20 mt-20 md:px-6 lg:px-8 xl:px-10">
      <Container>
        <div className="flex flex-col items-center">
          <div className="space-y-6 text-center text-white">
            <h3 className="text-xl font-extrabold lg:text-2xl xl:text-3xl 2xl:text-4xl">Roadmap</h3>
            <p className="mx-auto w-80">
              We believe artists need to be compensated for every sale,not just the first one!
            </p>
          </div>
          <div className="flex flex-wrap justify-around w-full py-12 lg:py-16 xl:py-24">
            {phases.map((phase, index) => (
              <div className="mt-16" key={index}>
                <div className="flex items-center space-x-4">
                  <SvgCircleWithRing className="w-16 h-16" />
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-pink lg:text-2xl xl:text-3xl">
                      {phase.title}
                    </span>
                    {index !== phases.length - 1 ? <SvgTripleCircle className="h-6 ml-4" /> : null}
                  </div>
                </div>
                <ul className="pl-20 mt-4 list-disc list-outside md:mt-5 lg:mt-6">
                  {phase.goals.map((goal, i) => (
                    <li className="font-semibold text-white" key={i}>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RoadMap;
