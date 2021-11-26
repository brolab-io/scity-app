import { useMemo } from "react";
import useSWR from "swr";
import City from "../../components/City";
import Container from "../../components/Container";
import { ICityData } from "../../lib/types";

export default function LandPage() {
  const { data } = useSWR("/api/cities");

  const cities: ICityData[] = data?.data ?? [];

  const bg1Style = useMemo(
    () => ({
      backgroundImage: `url(/images/backgrounds/bg-1.svg)`,
    }),
    []
  );

  return (
    <div style={bg1Style} className="p-4 lg:p-10 pt-6 lg:pt-20">
      <Container>
        <div className="rounded-xl bg-dark-gray bg-opacity-80 p-10 space-y-4">
          {cities.map((city) => (
            <City key={city.name} city={city} />
          ))}
        </div>
      </Container>
    </div>
  );
}
