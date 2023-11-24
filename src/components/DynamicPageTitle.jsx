import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

function DynamicPageTitle() {
    const location = useLocation();

    const switchPageTitle = (path) => {
        switch (path) {
            case "/":
                return "HomePage";
            case "/login":
                return "LoginPage";
            case "/dashboard":
                return "DashboardPage";
            default:
                return "DefaultPage";
        }
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>{switchPageTitle(location.pathname)}</title>
                <meta name="description" content="Grand Atma Hotel Best Hotel"></meta>
            </Helmet>
        </HelmetProvider>
    );
}

export default DynamicPageTitle;