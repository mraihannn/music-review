import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import musicAPI from "../api/musicAPI";
import { ImSpotify } from "react-icons/im";

export default function DetailPage() {
  const [detail, setDetail] = useState({});

  const { spotifyId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await musicAPI.get(`/api/music/${spotifyId}`, {
        headers: {
          author: `Bearer ${localStorage.access_token}`,
        },
      });
      setDetail(data);
    };
    fetchData();
  }, [spotifyId]);

  console.log(detail);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-slate-700">
      <div className="py-10 px-20">
        <div className="w-full h-fit bg-primary rounded-lg p-2 flex gap-2">
          <img
            src={detail?.data?.album?.images[0].url}
            alt="cover"
            className="h-full w-1/3 object-cover object-center"
          />
          <div className="flex-1 p-3 flex flex-col justify-center">
            <h1 className="text-7xl font-bold text-white">
              {detail?.data?.name}
            </h1>
            <h1 className="text-2xl text-white mt-2">
              {detail?.data?.artists[0].name}
            </h1>
            <a
              href={detail?.data?.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-400 w-fit mt-8 py-2 px-4 rounded-full font-semibold flex items-center justify-between gap-2 flex-row-reverse"
            >
              <p>
                Play on <span className="font-bold">Spotify</span>
              </p>
              <ImSpotify size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
