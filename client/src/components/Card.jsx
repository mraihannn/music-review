export default function Card({ song }) {
  return (
    <div
      key={song.id}
      className="bg-primary text-white w-full sm:w-52  h-fit rounded-lg p-2"
    >
      <div className="w-full h-4/5 ">
        <img
          src={song.album.images[0].url}
          className="w-full h-full rounded-lg object-cover object-center"
          alt="artist"
        />
      </div>
      <h3 className="font-medium mt-1">{song.name}</h3>
      <p className="text-xs ">{song.artists.map((a) => a.name)}</p>
    </div>
  );
}
