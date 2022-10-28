import LeagueTable from "../components/LeagueTable/LeagueTable";
import React from "react";
import { TeamType } from "../components/LeagueTable/Positions";
import { GetStaticProps, NextPage } from "next";

interface Props {
  positions: TeamType[];
}

const Home: NextPage<Props> = (props) => {
  return (
    <div className="text-center w-full">
      <h1 className="text-2xl pb-2 pt-2 font-bold">
        Kickertabelle zum Selberstecken
      </h1>
      <LeagueTable positions={props.positions} />
    </div>
  );
};

export default Home;
// This function gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch("https://soccer-next.netlify.app/.netlify/functions/soccer-data-function");
  const positions = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      positions,
    },
  };
};
