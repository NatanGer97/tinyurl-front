import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Error</h1>
            <br />
            <p>Something went wrong!</p>
            <br />
            <button onClick={goBack}>Go back</button>
        </section>
    )
};

export default ErrorPage;