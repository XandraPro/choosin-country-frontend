import { useNavigate } from "react-router-dom"
import "../styles/home.css"
import logo from "../assets/logo.png"

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">

            {/* Hero */}
            <section className="hero">
                <div className="hero-text">
                    <h1>Welcome to Choosin' Country</h1>
                    <p>
                        Your go-to platform for all your favourite country music.
                        Discover, save, enjoy and add comments of your favourite songs.
                    </p>
                    <button onClick={() => navigate("/login")}>
                        Get Started!
                    </button>
                </div>

                <img src={logo} alt="Choosin' Country Logo" className="hero-logo" />
            </section>

            {/* Mission */}
            <section className="section">
                <h2>Our Mission</h2>
                <p>
                    We bring together the best music country experience with the pleasure of discovery new songs, personalization and community.
                </p>
            </section>

            {/* Features */}
            <section className="features">
                <div className="feature-card">
                    <h3>🎶 Song Database</h3>
                    <p>Explore thousands of country songs!</p>
                </div>

                <div className="feature-card">
                    <h3>📝 User Comments</h3>
                    <p>Save your favourite songs and add your owm comments!</p>
                </div>

                <div className="feature-card">
                    <h3>🎧 Personal Dashboard</h3>
                    <p>Manage and enjoy your music experience!</p>
                </div>
            </section>

            {/* CTA */}
            <section className="cta">
                <h2>Join Choosin' Country Today!</h2>
                <button onClick={() => navigate("/login")}>Sign Up!</button>
            </section>
        </div>
    )
}

export default Home;