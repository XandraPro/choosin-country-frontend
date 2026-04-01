import { useEffect, useState } from "react";
import { getCountryEvents } from "../services/ticketmaster.service";

const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
  { code: "GB", label: "United Kingdom" },
  { code: "ES", label: "Spain" },
  { code: "AU", label: "Australia" },
  { code: "IE", label: "Ireland" },
  { code: "NZ", label: "New Zealand" },
];

const POPULAR_ARTISTS = [
  "Luke Combs",
  "Morgan Wallen",
  "Chris Stapleton",
  "Lainey Wilson",
  "Kacey Musgraves",
  "Dolly Parton",
  "Ella Langley",
  "Megan Moroney",
];

function CountryEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [countryCode, setCountryCode] = useState("US");
  const [keyword, setKeyword] = useState("country");
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);

        const data = await getCountryEvents({
          countryCode,
          keyword,
          city,
          type,
          size: 12,
        });

        setEvents(data || []);
      } catch (error) {
        console.error("Events load error:", error.response?.data || error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [countryCode, keyword, city, type]);

  const handleArtistClick = (artist) => {
    setKeyword(artist);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCity(cityInput.trim());
  };

  return (
    <section className="events-home">
      <div className="events-header">
        <h2>🎤 Country Concerts & Festivals</h2>
      </div>

      <form className="events-filters" onSubmit={handleSearchSubmit}>
        <select
          className="country-select"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search artist or keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="event-input"
        />

        <input
          type="text"
          placeholder="City"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          className="event-input"
        />

        <select
          className="country-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All events</option>
          <option value="concert">Concerts</option>
          <option value="festival">Festivals</option>
        </select>

        <button type="submit" className="events-search-btn">
          Search events
        </button>
      </form>

      <div className="popular-artists">
        <p>Popular country artists:</p>
        <div className="artist-tags">
          {POPULAR_ARTISTS.map((artist) => (
            <button
              key={artist}
              type="button"
              className={`artist-tag ${keyword === artist ? "active-artist" : ""}`}
              onClick={() => handleArtistClick(artist)}
            >
              {artist}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No country events found right now.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => {
            const image =
              event.images?.find((img) => img.ratio === "16_9")?.url ||
              event.images?.[0]?.url;

            const venue = event._embedded?.venues?.[0]?.name || "Venue TBA";
            const cityName = event._embedded?.venues?.[0]?.city?.name || "";
            const countryName =
              event._embedded?.venues?.[0]?.country?.name || "";
            const date = event.dates?.start?.localDate || "Date TBA";

            return (
              <div className="event-card" key={event.id}>
                {image && <img src={image} alt={event.name} />}
                <h3>{event.name}</h3>
                <p>{date}</p>
                <p>{venue}</p>
                <p>
                  {cityName}
                  {cityName && countryName ? ", " : ""}
                  {countryName}
                </p>

                <a
                  href={event.url}
                  target="_blank"
                  rel="noreferrer"
                  className="event-link-btn"
                >
                  View tickets
                </a>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default CountryEvents;