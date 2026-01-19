import axiosInstance from "./axiosInstance";

export const getMovies = async () => {
  const response = await axiosInstance.get("/films");
  return response.data.results;
};
