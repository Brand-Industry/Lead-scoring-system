export const OverallAverage = function (data, totalRolesPoints) {
  const totalPointsSum = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalPoints;
  }, 0);
  const promedioGeneral = totalPointsSum / data.length;
  return (promedioGeneral / totalRolesPoints) * 100;
};
