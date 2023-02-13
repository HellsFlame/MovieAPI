import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
const NowPlaying = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const onMovieClick = (id) => {
    console.log(id);
    navigate("/movie/" + id);
  };
  const getData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=5b7315fd732e53a22c34ad6cb3b4a6b0&language=en-US&page=${page}`
    );
    const datas = await response.json();
    setData(datas);
    setLoading(false);
  };
  const BackPage = () => {
    if (page == 1) {
      return;
    }
    setPage((previousValue) => previousValue - 1);
    getData();
  };
  const ForwardPage = () => {
    setPage(page + 1);
    getData();
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log("data", data);
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
      <div className="bg-[rgb(36,36,36)] text-white h-full snap-y snap-mandatory flex flex-col z-0  flex justify-center items-center">
        <div className="container grid grid-cols-4 space-x-2 space-y-2">
          {/* <div className="bg-white w-40 h-40"></div> */}
          {/* <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"> */}
          {/* <div class="py-3 sm:max-w-xl sm:mx-auto"> */}
          {data?.results?.map((item) => (
            <div
              class="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-2 flex hover:drop-shadow-2xl cursor-pointer"
              key={item?.id}
              onClick={() => {
                onMovieClick(item?.id);
              }}
            >
              <div class="h-48 overflow-visible w-1/2">
                <img
                  class="rounded-3xl shadow-lg bg-contain h-48"
                  src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                  alt=""
                />
              </div>
              <div class="flex flex-col w-1/2 space-y-4  justify-start items-center">
                <div class="flex justify-between items-start">
                  <h2 class="text-md font-bold text-black">{item?.title}</h2>
                  <div class="bg-yellow-400 font-bold rounded-xl ml-2 p-2">
                    {item?.vote_average}
                  </div>
                </div>
                <div>
                  <div class="text-sm text-gray-400">Release Date</div>
                  <div class="text-lg text-gray-800">{item?.release_date}</div>
                </div>
                <p class=" text-gray-900 max-h-40 overflow-y-hidden">
                  {item?.overview.slice(0, 50)}{" "}
                  <span className=" text-blue-700 cursor-pointer">
                    Read More ...
                  </span>
                </p>
                {/* <div class="flex text-2xl font-bold text-a">$83.90</div> */}
              </div>
            </div>
          ))}
          {/* <div class="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-2 flex ">
            <div class="h-48 overflow-visible w-1/2">
              <img
                class="rounded-3xl shadow-lg"
                src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1LRLLWGvs5sZdTzuMqLEahb88Pc.jpg"
                alt=""
              />
            </div>
            <div class="flex flex-col w-1/2 space-y-4">
              <div class="flex justify-between items-start">
                <h2 class="text-xl font-bold text-black">
                  Sweet Tooth: El niño ciervo
                </h2>
                <div class="bg-yellow-400 font-bold rounded-xl p-2">7.2</div>
              </div>
              <div>
                <div class="text-sm text-gray-400">Series</div>
                <div class="text-lg text-gray-800">2019</div>
              </div>
              <p class=" text-gray-400 max-h-40 overflow-y-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div class="flex text-2xl font-bold text-a">$83.90</div>
            </div>
          </div> */}
          {/* </div> */}
          {/* </div> */}
          {/* <div className="bg-white w-10 h-10"></div>
          <div className="bg-white w-10 h-10"></div>
          <div className="bg-white w-10 h-10"></div> */}
          {/* <div className="bg-white w-10 h-10"></div> */}
        </div>
        <div className="text-white flex h-[80px] items-center justify-around space-x-5">
          <div>
            <ArrowBackIosIcon
              className={
                " text-blue-600 cursor-pointer !h-[50px] !w-[50px]" +
                `${page == 1 ? " text-gray-600  cursor-default" : ""}`
              }
              onClick={BackPage}
            />
          </div>
          <div>
            <ArrowForwardIosIcon
              className=" text-blue-600 cursor-pointer !h-[50px] !w-[50px]"
              onClick={ForwardPage}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default NowPlaying;
