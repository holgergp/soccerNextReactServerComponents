import { useDrag } from "react-dnd";
import React, { useState } from "react";
import { ItemTypes, TeamType } from "../LeagueTable/Positions";

interface Props {
  rank: number;
  swapPositions: (sourceTeamId: string, targetTeamId: string) => void;
  team: TeamType;
  updateTeamname: (team: TeamType, updatedText: string) => void;
}

const Team = (props: Props) => {
  const { rank, team, updateTeamname, swapPositions } = props;
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(team.name);

  const dragReturn = useDrag({
    type: ItemTypes.TEAM,
    item: { team },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        return;
      }
      const dragItem = monitor.getItem();
      const dropResult: { team: TeamType } | null = monitor.getDropResult();
      if (dropResult) {
        swapPositions(dragItem.team.id, dropResult.team.id);
      }
    },
  });

  return (
    <div
      ref={dragReturn[1]}
      className="font-bold sortable grid grid-cols-[1fr_9fr_1fr] gap-x-0.5 team"
    >
      <div className="self-start rank">{rank}.</div>{" "}
      {editMode ? (
        <div>
          {" "}
          <input
            value={input}
            onChange={(event) => {
              if (event && event.currentTarget && event.currentTarget.value) {
                console.log(event.currentTarget.value);
                setInput(event.currentTarget.value);
              }
            }}
            onKeyDown={(event) => {
              if (
                event &&
                event.currentTarget &&
                event.currentTarget.value &&
                event.key === "Enter"
              ) {
                setEditMode(false);
                updateTeamname(team, input);
              }
            }}
            className="w-5/6"
          />
        </div>
      ) : (
        <div className="self-center teamname">{team.name}</div>
      )}
      <div className="self-end editButton" onClick={() => setEditMode(true)}>
        <div className="opacity-0 text-gray-600 hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Team;
