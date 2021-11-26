import useSWR from "swr";
import City from "../../components/City";
import Container from "../../components/Container";
import { ICityData } from "../../lib/types";

export default function LandPage() {
  const { data } = useSWR("/api/cities");

  const cities: ICityData[] = data?.data ?? [];

  return (
    <main className="py-8">
      <Container>
        <div className="space-y-4">
          {cities.map((city) => (
            <City key={city.name} city={city} />
          ))}
        </div>
      </Container>
    </main>
  );
}
