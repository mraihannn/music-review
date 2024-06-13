import { useEffect, useState } from "react";
import musicAPI from "../api/musicAPI";
import { useDebounce } from "use-debounce";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendations } from "../store/movie";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [music, setMusic] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const [value] = useDebounce(input, 1500);

  const dispatch = useDispatch();
  const recommendations = useSelector((state) => state.data);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getRecommendations());
    // const fetchRecommendations = async () => {
    //   const { data } = await musicAPI.get("/api/music/recommendations", {
    //     headers: {
    //       author: `Bearer ${localStorage.access_token}`,
    //     },
    //   });
    //   setRecommendations(data.data.tracks.items);
    // };
    // fetchRecommendations();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await musicAPI.get("/api/music/search", {
        params: {
          q: value,
          limit: 10,
          offset: 0,
        },
        headers: {
          author: `Bearer ${localStorage.access_token}`,
        },
      });
      if (data.tracks.items.length > 0) {
        setMusic(data.tracks.items);
        setOffset(10);
      } else {
        setHasMore(false);
      }
    };

    setMusic([]);
    fetchData();
  }, [value]);

  const fetchMoreData = async () => {
    const { data } = await musicAPI.get("/api/music/search", {
      params: {
        q: input,
        limit: 10,
        offset: offset,
      },
      headers: {
        author: `Bearer ${localStorage.access_token}`,
      },
    });
    if (data.tracks.items.length > 0) {
      setMusic((prevMusic) => [...prevMusic, ...data.tracks.items]);
      setOffset((prevOffset) => prevOffset + 10);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-slate-700">
      <div className="py-10 px-20">
        <div>
          <h1 className="text-4xl font-medium text-white">
            Recommendations For You
          </h1>
          <div className="flex flex-wrap gap-3 mt-4">
            {recommendations?.map((song) => (
              <Link key={song.id} to={`/detail/${song.id}`}>
                <Card song={song} />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <h1 className="text-4xl font-medium text-white">Search</h1>
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
