
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-earth-green-light/30 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-earth-green-DEFAULT">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => history.back()}>
            Go Back
          </Button>
          <Link to="/">
            <Button className="bg-earth-green-DEFAULT hover:bg-earth-green-dark text-white">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
