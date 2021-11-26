import { ICityData } from "../../../lib/types";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";
import path from "path";

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error | ICityData>
) {
  const data = await readFile(path.resolve("mocks/cities.json"), "utf8");
  const jsonData = JSON.parse(data);
  const city = jsonData.data.find(
    (item: ICityData) => item.slug === req.query.slug
  );
  if (!city) {
    return res.status(404).json({
      message: "City not found",
    });
  }
  return res.json(city);
}
