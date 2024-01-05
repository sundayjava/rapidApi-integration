import { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-news13.p.rapidapi.com";
const videoUrl = "https://google-search-2.p.rapidapi.com";
// const baseUrl = 'https://google-news13.p.rapidapi.com/search?keyword=facebook&lr=en-US';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Elon Musk");
  const [httpError, setHttpError] = useState("");

  const getResults = async (type) => {
    setIsLoading(true);

    const requestOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "google-news13.p.rapidapi.com",
      },
    };
    const response = await fetch(`${baseUrl}${type}`, requestOptions);

    const data = await response.json();

    if (data.message) {
      setHttpError(data.message);
    }

    console.log(data);

    setResults(data);
    setIsLoading(false);
  };

  const getVideos = async (type) => {
    setIsLoading(true);

    const requestOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6a9023d1camsha89062a570339cep1ae89ejsn35423b6e13a4",
        "X-RapidAPI-Host": "google-search-2.p.rapidapi.com",
      },
    };
    const response = await fetch(`${videoUrl}${type}`, requestOptions);

    const data = await response.json();

    if (data.message) {
      setHttpError(data.message);
    }

    console.log(data);

    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{
        getResults,
        getVideos,
        httpError,
        results,
        searchTerm,
        setSearchTerm,
        isLoading,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
