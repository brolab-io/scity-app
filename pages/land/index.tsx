import useSWR from "swr";
import City from "../../components/City";
import { ICityData } from "../../lib/types";

export default function LandPage() {
  const { data } = useSWR("/api/cities");

  const cities: ICityData[] = data?.data ?? [];

  return (
    <div className="space-y-4">
      {cities.map((city) => (
        <City key={city.name} city={city} />
      ))}
    </div>
  );
}
