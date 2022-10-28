import React, { useMemo } from "react";
import { useDrop } from "react-dnd";
import Team from "../Team/Team";
import PropTypes from "prop-types";
import { ItemTypes, TeamType } from "../LeagueTable/Positions";
import classNames from "classnames";

interface Props {
  rank: number;
  swapPositions: (sourceTeamId: string, targetTeamId: string) => void;
  team: TeamType;
  updateTeamname: (team: TeamType, updatedText: string) => void;
}

const positionCSSClass = (positionNumber: number) => {
  if (positionNumber === 1) {
    return "bg-green-400";
  }
  if (positionNumber <= 3) {
    return "bg-green-100";
  }
  if (positionNumber <= 6) {
    return "bg-cyan-400";
  }
  if (positionNumber <= 15) {
    return "bg-pink-100";
  }
  if (positionNumber === 16) {
    return "bg-red-200";
  } else {
    return "bg-red-600";
  }
};

const Position = (props: Props) => {
  const team = props.team;
  const rank = props.rank;
  const updateTeamname = props.updateTeamname;
  const swapPositions = props.swapPositions;
  const tabellenClass = useMemo(() => positionCSSClass(rank), [rank]);
  const dropReturn = useDrop({
    accept: ItemTypes.TEAM,
    drop: () => ({ team }),
  });
  const classes = classNames(
    "border-solid border-2 rounded-md border-slate-400 md:w-1/2 lg:w-1/6 pt-1 pb-1 position " +
      tabellenClass
  );

  return (
    <div className={classes} style={{ cursor: "pointer" }} ref={dropReturn[1]}>
      <Team
        team={team}
        rank={rank}
        updateTeamname={updateTeamname}
        swapPositions={swapPositions}
      />
    </div>
  );
};

Position.propTypes = {
  rank: PropTypes.number.isRequired,
  swapPositions: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
  updateTeamname: PropTypes.func.isRequired,
};

export default Position;
