import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const SingleMovie = () => {
  const [data, setDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const fetchavailabliity = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "731a1fd9e1msh78768f93ed2f6adp186cf5jsndcbf5a2c4252",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://streaming-availability.p.rapidapi.com/get/ultra?country=ca&output_language=en&tmdb_id=movie/${id}`,
      options
    );
    const datas = await response.json();
    console.log("Availability =>", datas);
  };
  const getDate = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5b7315fd732e53a22c34ad6cb3b4a6b0&language=en-US`
    );
    const datas = await response.json();
    setLoading(false);
    setDate(datas);
  };
  useEffect(() => {
    getDate();
    fetchavailabliity();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) {
    return (
      <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scrollbar scrollbar-track-gray-400/20 scroll-smooth scrollbar-thumb-[#F7AB0A]/80 z-0">
        <div className="flex justify-center h-full items-center">
          <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[rgb(36,36,36)] rounded-full border-2 border-[rgb(36,36,36)]"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        class="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-2 flex hover:drop-shadow-2xl cursor-pointer"
        key={data?.id}
        //   onClick={() => {
        //     onMovieClick(data?.id);
        //   }}
      >
        <div class="h-48 overflow-visible w-1/2">
          <img
            class="rounded-3xl shadow-lg bg-contain h-48"
            src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
            alt=""
          />
        </div>
        <div class="flex flex-col w-1/2 space-y-4  justify-start items-center">
          <div class="flex justify-between items-start">
            <h2 class="text-md font-bold text-black">{data?.title}</h2>
            <div class="bg-yellow-400 font-bold rounded-xl ml-2 p-2">
              {data?.vote_average}
            </div>
          </div>
          <div>
            <div class="text-sm text-gray-400">Release Date</div>
            <div class="text-lg text-gray-800">{data?.release_date}</div>
          </div>
          <p class=" text-gray-900 max-h-40 overflow-y-hidden">
            {data?.overview}{" "}
            {/* <span className=" text-blue-700 cursor-pointer">
                    Read More ...
                  </span> */}
          </p>
          {/* <div class="flex text-2xl font-bold text-a">$83.90</div> */}
        </div>
      </div>
    );
  }
};

export default SingleMovie;
