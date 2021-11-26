import { ICityData } from "../lib/types";
import { formatDate } from "../utils";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

type Props = {
  city: ICityData;
};

const City: React.FC<Props> = ({ city }) => {
  const router = useRouter();

  const onClickJoin = useCallback(() => {
    router.push(`/land/${city.slug}`);
  }, [city.slug, router]);

  return (
    <div className="flex justify-between items-end p-6 border-2 border-gray-300">
      <div className="space-y-4">
        <div>
          <span>
            {formatDate(city.startDate)} - {formatDate(city.endDate)}
          </span>
        </div>
        <h3>{city.name}</h3>
        <div>
          <span>{city.country}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Button onClick={onClickJoin} outline>
          Join
        </Button>
        <div className="mt-2">
          <span>{city.slotLeft} slots left</span>
        </div>
      </div>
    </div>
  );
};

export default City;
