import { useEffect, useState } from "react";
import musicAPI from "../api/musicAPI";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [music, setMusic] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await musicAPI.get("/api/music/search", {
        params: {
          q: input,
          limit: 10,
          offset: 0,
        },
        headers: {
          author: `Bearer ${localStorage.access_token}`,
        },
      });
      setMusic(data);
    };

    fetchData();
  }, [input]);

  console.log(music);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-slate-700">
      <div className="py-10 px-20">
        <h1 className="text-4xl font-medium text-white">Search</h1>
        <input
          type="text"
          placeholder="Type any song"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full mt-4 p-1 rounded-lg"
        />
        <div className="flex flex-wrap mt-4 gap-3">
          {music?.tracks?.items.map((item) => (
            <div
              key={item.id}
              className="bg-primary text-white w-52  h-fit rounded-lg p-2"
            >
              <div className="w-full h-4/5 ">
                <img
                  src={item.album.images[0].url}
                  className="w-full h-full rounded-lg object-cover object-center"
                  alt="artist"
                />
              </div>
              <h3 className="font-medium mt-1">{item.name}</h3>
              <p className="text-xs ">{item.artists.map((a) => a.name)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
