import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoreSearch,
  getRecommendations,
  searchMusic,
} from "../store/movieRecommedations";

export default function HomePage() {
  const [input, setInput] = useState("");
  // const [music, setMusic] = useState([]);
  const music = useSelector((state) => state.movieRecommendations.search);
  // const [hasMore, setHasMore] = useState(true);
  const hasMore = useSelector((state) => state.movieRecommendations.hasMore);
  // const [offset, setOffset] = useState(0);
  // const offset = useSelector((state) => state.movieRecommendations.offset);

  const [value] = useDebounce(input, 1500);

  const dispatch = useDispatch();
  const recommendations = useSelector(
    (state) => state.movieRecommendations.data
  );

  const loading = useSelector((state) => state.movieRecommendations.movie);

  useEffect(() => {
    dispatch(getRecommendations());
  }, []);

  useEffect(() => {
    if (value) {
      dispatch(searchMusic(value));
    }
  }, [value]);

  const fetchMoreData = async () => {
    dispatch(getMoreSearch(input));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-slate-700">
      <div className="py-10 px-10 sm:px-20">
        <div>
          <h1 className="text-xl sm:text-4xl font-medium text-white">
            Recommendations For You
          </h1>
          <div className="flex flex-wrap gap-3 mt-4">
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              recommendations?.map((song) => (
                <Link key={song.id} to={`/detail/${song.id}`}>
                  <Card song={song} />
                </Link>
              ))
            )}
          </div>
        </div>
        <div className="mt-3">
          <h1 className="text-xl sm:text-4xl font-medium text-white">Search</h1>
          <input
            type="text"
            placeholder="Type any song"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full mt-4 rounded-lg input"
          />

          <InfiniteScroll
            dataLength={music.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className="text-white">Loading...</h4>}
          >
            <div className="flex flex-wrap mt-4 gap-3">
              {music.map((song) => (
                <Link key={song.id} to={`/detail/${song.id}`}>
                  <Card song={song} />
                </Link>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
