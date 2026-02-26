import axios from "axios";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export const getTopNewsIds = async () => {
  const { data } = await axios.get(`${BASE_URL}/topstories.json`);
  return data;
};

export const getNewsById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/item/${id}.json`);
  return data;
};

export const getCommentById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/item/${id}.json`);
  return data;
};
