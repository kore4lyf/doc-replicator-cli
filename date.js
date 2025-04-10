// Function to get ordinal suffix for a day
const getOrdinal = (day) => {
  day = parseInt(this.day)
  const suffixes = ["th", "st", "nd", "rd"];
  const value = day % 100;
  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
}

const setDate = (d, m, y) => {
  return {
    day: d,
    ordinalDay: getOrdinal(this.day),
    month: m,
    year: y
  }
}

module.exports = {setDate}