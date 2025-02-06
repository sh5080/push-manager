export const getYNChipText = (
  value?: "Y" | "N",
  trueText = "동의",
  falseText = "미동의"
) => {
  return value === "Y" ? trueText : falseText;
};
