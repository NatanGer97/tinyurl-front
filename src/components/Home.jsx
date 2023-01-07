import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/tiny">Go to the Tiny page</Link>
            <br />
            <Link to="/clicks">Go to the Clicks page</Link>
            <br />
     
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={handleSignOut} >Sign Out</button>
            </div>
        </section>
    )
}

export default Home