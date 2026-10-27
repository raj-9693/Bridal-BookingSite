import Reveal from "../Reveal.jsx";
import Photo from "../Photo.jsx";

// a = { name, role, bio, image, years ("9 yrs"), tags[] }
export default function ArtistCard({ a, index }) {
  return (
    <Reveal delay={(index % 4) * 90} className="artist">
      <div className="artist-img">
        <Photo src={a.image} alt={`${a.name}, ${a.role}`} hue={12 + index * 11} />
        {a.years && <span className="artist-years">{a.years}</span>}
      </div>
      <div className="artist-body">
        <p className="artist-role">{a.role}</p>
        <h3>{a.name}</h3>
        <p className="artist-bio">{a.bio}</p>
        <ul className="artist-tags">
          {a.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </Reveal>
  );
}
