import { TeamType } from "../../components/LeagueTable/Positions";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  nextApiRequest: NextApiRequest,
  nextApiResponse: NextApiResponse<TeamType[]>
) {
  fetch(
    "https://soccer-solid.netlify.app/.netlify/functions/soccer-data-function"
  )
    .then((res) => res.json())
    .then((res) => nextApiResponse.status(200).json(res))
    .catch(() => nextApiResponse.status(500));
}
