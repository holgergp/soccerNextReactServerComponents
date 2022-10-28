export interface TeamType {
  name: string;
  id: string;
}

export const ItemTypes = {
  TEAM: "team",
};

const findTeamIndex = (teamId: string, positions: TeamType[]): number =>
  positions.findIndex((team) => team.id === teamId);

const findTeam = (
  teamId: string,
  positions: TeamType[]
): TeamType | undefined => positions.find((team) => team.id === teamId);

export const recalculateSwappedPositions = (
  sourceTeamId: string,
  targetTeamId: string,
  currentPositions: TeamType[]
): TeamType[] => {
  const fromIndex = currentPositions.findIndex(
    (team) => team.id === sourceTeamId
  );
  const toIndex = currentPositions.findIndex(
    (team) => team.id === targetTeamId
  );

  if (fromIndex !== toIndex) {
    const updatedItems = currentPositions.slice();
    updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
    return updatedItems;
  }
  return currentPositions;
};

export const recalculatePositionsWithRenamedTeam = (
  team: TeamType,
  updatedText: string,
  currentPositions: TeamType[]
): TeamType[] => {
  const teamIndex = findTeamIndex(team.id, currentPositions);
  const updatedItems = currentPositions.slice();
  updatedItems.splice(teamIndex, 1, {
    name: updatedText,
    id: team.id,
  });
  return updatedItems;
};
