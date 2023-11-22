export function checkWinOrLose(correct, wrong, word) {
  let status = "win";

  // Check if all letters are correct
  word?.split("")?.forEach((letter) => {
    if (!correct?.includes(letter)) {
      status = "";
    }
  });

  // Check if wrong letters are more than 3
  if (wrong?.length === 3) status = "lose";

  return status;
}
