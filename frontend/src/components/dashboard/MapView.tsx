
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapView = () => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (err) => {
          console.error("Error getting location:", err);
          setError("Unable to access your location. Please check your browser permissions.");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load map when we have coordinates
    if (location && mapRef.current && !mapLoaded) {
      // Here we're just displaying a basic map representation
      // In a real app, you would integrate with Mapbox, Google Maps, or Leaflet
      setMapLoaded(true);
    }
  }, [location, mapLoaded]);

  const handleRefreshLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (err) => {
          setError("Unable to refresh your location.");
          setLoading(false);
        }
      );
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {loading ? (
          <div className="flex items-center justify-center h-[300px] bg-muted/20">
            <Loader2 className="h-8 w-8 animate-spin text-earth-green-DEFAULT" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] bg-muted/20 p-6">
            <p className="text-center text-muted-foreground mb-4">{error}</p>
            <Button 
              onClick={handleRefreshLocation}
              variant="outline"
              className="bg-earth-green-light/50 hover:bg-earth-green-light"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="relative">
            <div 
              ref={mapRef} 
              className="h-[300px] bg-earth-blue-light/30 flex flex-col items-center justify-center"
            >
              {location && (
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="absolute -top-1 -left-1 w-10 h-10 bg-earth-green-light/50 rounded-full animate-ping"></div>
                      <div className="relative z-10 bg-earth-green-DEFAULT p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-2">Your Current Location</h3>
                  <p className="text-sm text-muted-foreground mb-1">Latitude: {location.lat.toFixed(6)}</p>
                  <p className="text-sm text-muted-foreground mb-4">Longitude: {location.lng.toFixed(6)}</p>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    For a full interactive map, add your preferred mapping API
                  </p>
                  
                  <Button 
                    onClick={handleRefreshLocation} 
                    size="sm"
                    variant="outline"
                    className="bg-earth-green-light/50 hover:bg-earth-green-light mt-2"
                  >
                    Refresh Location
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapView;
