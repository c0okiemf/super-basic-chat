import { useEffect, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

export const useThemedStyles = <StylesType>(
  getStyles: (colorScheme: ColorSchemeName) => StylesType
) => {
  const colorScheme = useColorScheme();
  const [styles, setStyles] = useState(getStyles(colorScheme));

  useEffect(() => {
    setStyles(getStyles(colorScheme));
  }, [colorScheme]);

  return styles;
};
