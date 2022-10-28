import { Handler } from "@netlify/functions";
import { SAMPLE_LEAGUE_TABLE } from "../../components/SampleData";

const handler: Handler = async (event) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify(SAMPLE_LEAGUE_TABLE),
    };
  } else {
    return { statusCode: 405 };
  }
};
export { handler };
