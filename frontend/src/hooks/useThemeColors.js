import { useThemeStore } from "../store/useThemeStore";

export const useThemeColors = () => {
  return useThemeStore((state) => state.getCurrentThemeColors(state));
};
