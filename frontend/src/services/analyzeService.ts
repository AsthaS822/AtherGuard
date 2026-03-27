import { callAPI } from "./api";

export const analyzeContent = async (url: string) => {
  return callAPI("/analyze", { url });
};
