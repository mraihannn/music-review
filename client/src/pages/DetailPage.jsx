import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import musicAPI from "../api/musicAPI";
import { ImSpotify } from "react-icons/im";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { getDetail } from "../store/movie";
import { useDispatch, useSelector } from "react-redux";

export default function DetailPage() {
  const [detail, setDetail] = useState({});
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState("");

  const { spotifyId } = useParams();

  const dispatch = useDispatch();
  // const detail = useSelector((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await musicAPI.get(`/api/music/${spotifyId}`, {
        headers: {
          author: `Bearer ${localStorage.access_token}`,
        },
      });
      setDetail(data);
    };
    // dispatch(getDetail(spotifyId));
    fetchData();
  }, [spotifyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await musicAPI.post(
        `/api/reviews/${spotifyId}`,
        {
          spotifyId,
          rating,
          comment,
        },
        {
          headers: {
            author: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Review added!",
      });
      setDetail((prev) => {
        return { ...prev, reviews: [...prev.reviews, data] };
      });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Somethings Gone Wrong!",
        });
      }
    }
  };

  return (
    // Banner
    <div className="min-h-screen bg-gradient-to-br from-primary to-slate-700">
      <div className="py-10 px-20">
        <div className=" bg-primary rounded-lg p-2 flex gap-2">
          <img
            src={detail?.data?.album?.images[0].url}
            alt="cover"
            className="w-1/3 object-cover object-center"
          />
          <div className="flex-1 p-3 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-7xl font-bold text-white">
              {detail?.data?.name}
            </h1>
            <h1 className="text-lg sm:text-2xl text-white mt-2">
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

        {/* Review Section */}

        <div className=" bg-primary rounded-lg p-2 mt-4">
          <h2 className="text-white text-3xl border-b p-2">
            {detail?.reviews?.length} Reviews
          </h2>

          {/* Form  */}
          <div className="p-2">
            <form onSubmit={handleSubmit}>
              <textarea
                name="comment"
                id=""
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="w-full rounded-lg textarea  resize-none h-20"
              ></textarea>
              <div className="flex justify-between items-center">
                <div className="rating">
                  <input
                    type="radio"
                    name="rating"
                    value={2}
                    checked={rating === 2}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating"
                    value={4}
                    checked={rating === 4}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating"
                    value={6}
                    checked={rating === 6}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating"
                    value={8}
                    checked={rating === 8}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating"
                    value={10}
                    checked={rating === 10}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white mt-2 bg-slate-700 py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Comment */}
          <div className="flex flex-col border-t">
            {detail?.reviews
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((r) => (
                <div
                  key={r.id}
                  className="text-white mt-4 flex gap-2 items-center"
                >
                  <div className="chat chat-start ">
                    <div className="chat-bubble max-w-full">{r.comment}</div>
                  </div>
                  <div className="rating">
                    {[...Array(r.rating / 2)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="mask mask-star-2 bg-orange-400"
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
