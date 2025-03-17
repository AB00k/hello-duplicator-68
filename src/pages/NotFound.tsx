
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background animate-fade-in">
      <div className="text-center max-w-md px-6 animate-scale-in">
        <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-marketing-red" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-marketing-red">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          className="bg-marketing-red hover:bg-marketing-red/90 rounded-full px-8 shadow-md hover:shadow-lg transition-all animate-hover-lift"
          size="lg"
          asChild
        >
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
