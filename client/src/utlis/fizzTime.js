export const getFuzzyTime = (nanosec) => {

  var millisec = (nanosec * 1000)

  let res = "";

  const t_second = 1000;
  const t_minute = t_second * 60;
  const t_hour = t_minute * 60;
  const t_day = t_hour * 24;
  const t_week = t_day * 7;
  const t_month = Math.floor(t_day * 30.4);
  const t_year = t_month * 12;

  const now = Date.now();
  const dif = now - millisec;

  const fuzzy_string = (time_ref, time_str) => {
      const fuzzy = Math.floor(dif / time_ref);

      res += `${fuzzy} ${time_str}`;
      if (fuzzy !== 1) res += "s";
      res += " ago";
  };
  if (dif >= t_year) fuzzy_string(t_year, "year");
  else if (dif >= t_month) fuzzy_string(t_month, "month");
  else if (dif >= t_week) fuzzy_string(t_week, "week");
  else if (dif >= t_day) fuzzy_string(t_day, "day");
  else if (dif >= t_hour) fuzzy_string(t_hour, "hour");
  else if (dif >= t_minute) fuzzy_string(t_minute, "minute");
  else if (dif >= t_second) fuzzy_string(t_second, "second");
  else res = "now";

  return res;
};