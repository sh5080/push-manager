type ColorType = "green" | "red" | "blue" | "yellow" | "gray";

interface ChipColorStyle {
  background: string;
  text: string;
}

export const getChipColorStyle = (color: ColorType): ChipColorStyle => {
  const styles: Record<ColorType, ChipColorStyle> = {
    green: { background: "bg-green-100", text: "text-green-800" },
    red: { background: "bg-red-100", text: "text-red-800" },
    blue: { background: "bg-blue-100", text: "text-blue-800" },
    yellow: { background: "bg-yellow-100", text: "text-yellow-800" },
    gray: { background: "bg-gray-100", text: "text-gray-800" },
  };

  return styles[color];
};

export const getYNChipStyle = (value?: "Y" | "N") => {
  const { background, text } = getChipColorStyle(
    value === "Y" ? "green" : "gray"
  );
  return `${background} ${text}`;
};
