import React, { useEffect } from "react";
import { useResultContext } from "../contexts/ResultContextProvider";
import { useLocation } from "react-router-dom";
import { Loading } from "./Loading";
import ReactPlayer from "react-player";

const Results = () => {
  const { getResults, getVideos, httpError, results, searchTerm, isLoading } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === '/videos' || location.pathname === '/images') {
        getVideos(`${location.pathname}?query=elon musk&num=40&lr=en-US`);
      }else{
        getResults(`/search?keyword=${searchTerm}&limit=40&lr=en-US`);
      }
      // getResults(`/search?keyword=${searchTerm}&limit=40&lr=en-US`)
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  if (httpError) {
    return (
      <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
       <p>{httpError}</p>
      </div>
    );
  }

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.items && results?.items?.map(({ newsUrl, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={newsUrl} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {newsUrl.length > 30 ? newsUrl.substring(0, 30) : newsUrl}
                </p>
              <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                {title}
              </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.image_results && results?.image_results?.map(
            ({ image, link, title }, index) => (
              <a
                className="sm:p-3 p-5"
                href={link}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                <img src={image} alt={title} loading="lazy" />
                <p className="w-36 break-words text-sm mt-2">{title}</p>
              </a>
            )
          )}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.items && results?.items?.map(({ newsUrl, title, publisher, timestamp}) => (
            <div key={timestamp} className="md:w-2/5 w-full">
              <a href={newsUrl} target="_blank" rel="noreferrer" className="hover:underline">
                
              <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                {title}
              </p>
              <div className="flex gap-4">
                <a href={publisher} target="_blank" rel="noreferrer">
                  {publisher}
                </a>
              </div>
              </a>
            </div>
          ))}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap">
          {results?.video_results && results?.video_results?.map(({link}, index)=>(
            <div key={index} className="p-2">
              <ReactPlayer url={link} controls width='355px' height='200px'/>
            </div>
          ))}
        </div>
      );

    default:
      return 'ERROE'
  }
};

export default Results;
