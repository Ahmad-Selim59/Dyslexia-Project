// getting initials
// for example, John Doe ==> JD
const GetInitialsFromName = (name) => {
  const letters = String(name)
    .split(" ")
    .map((i) => i.charAt(0));
  return letters.join("");
};

export default GetInitialsFromName;
