import _ from "lodash";

export const getTopDataEntries = (data, id, size = 10) =>
  Object.entries(_.groupBy(data, id))
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, size);
