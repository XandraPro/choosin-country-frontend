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

function CountryEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryCode, setCountryCode] = useState("US");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await getCountryEvents(countryCode);
        console.log("EVENTS:", data);
        setEvents(data || []);
      } catch (error) {
        console.error("Events load error:", error.response?.data || error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [countryCode]);

  return (
    <section className="events-home">
      <div className="events-header">
        <h2>🎤 Country Concerts & Festivals</h2>

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
            const city = event._embedded?.venues?.[0]?.city?.name || "";
            const country = event._embedded?.venues?.[0]?.country?.name || "";
            const date = event.dates?.start?.localDate || "Date TBA";

            return (
              <div className="event-card" key={event.id}>
                {image && <img src={image} alt={event.name} />}
                <h3>{event.name}</h3>
                <p>{date}</p>
                <p>{venue}</p>
                <p>
                  {city}
                  {city && country ? ", " : ""}
                  {country}
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