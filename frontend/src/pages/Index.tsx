import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import WeatherInsightCard from "@/components/dashboard/WeatherInsightCard";
import CarbonCreditTracker from "@/components/dashboard/CarbonCreditTracker";
import MapView from "@/components/dashboard/MapView";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/config/supabase";
import React from "react";

interface Farmer {
  id: string;
  user_name: string;
  user_email: string;
  user_contact: string;
  user_description: string;
  user_status: boolean;
}

const Index: React.FC = () => {
  const { toast } = useToast();
  const { user, role } = useAuth();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const isBuyer = role === 'buyer';

  useEffect(() => {
    // Welcome toast for demonstration
    setTimeout(() => {
      toast({
        title: "Welcome to CropCircle Connect",
        description: "Your sustainable farming companion is ready to help!",
        duration: 5000,
      });
    }, 1500);

    // Fetch farmers data for buyers
    if (isBuyer) {
      const fetchFarmers = async () => {
        const { data, error } = await supabase.from('user_table').select('*').eq('user_role', 'farmer');
        if (error) {
          console.error('Error fetching farmers:', error);
        } else {
          setFarmers(data || []);
        }
      };
      fetchFarmers();
    }
  }, [toast, user, isBuyer]);

  // Content for buyers - showing farmer details
  const buyerContent = () => {
    return (
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, Buyer</h1>
            <p className="text-muted-foreground">
              Find and connect with sustainable farmers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="bg-earth-green-DEFAULT hover:bg-earth-green-dark text-white"
              onClick={() => window.open("/requests", "_self")}
            >
              View My Requests
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farmer Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Certified</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farmers.map((farmer) => (
                    <TableRow key={farmer.id}>
                      <TableCell className="font-medium">{farmer.user_name}</TableCell>
                      <TableCell>{farmer.user_email}</TableCell>
                      <TableCell>{farmer.user_contact}</TableCell>
                      <TableCell>{farmer.user_description}</TableCell>
                      <TableCell>{farmer.user_status ? "✅ Yes" : "❌ No"}</TableCell>
                      <TableCell>
                        <Link to={`/requests/new/${farmer.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            Send Request
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Content for farmers - the original dashboard
  const farmerContent = () => {
    return (
      <div className="flex flex-col space-y-8">
        {/* Greeting and Overview Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, farmer</h1>
            <p className="text-muted-foreground">
              Here's your farming dashboard for May 5, 2025
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://openweathermap.org", "_blank")}
            >
              Check Full Forecast
            </Button>
            <Button
              className="bg-earth-green-DEFAULT text-black hover:text-white hover:bg-earth-green-dark"
              onClick={() => window.open("/practices", "_self")}
            >
              Explore Eco Practices
            </Button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Weather Insights */}
          <div className="lg:col-span-2">
            <WeatherInsightCard />
          </div>

          {/* Right Column - AgroByte */}
          <div>
            <CarbonCreditTracker />
          </div>
        </div>

        {/* Map View Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Location</h2>
          <MapView />
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecommendationCard />
          </div>
          <div className="hidden lg:block">
            {/* This could be used for additional content like recent activity or notifications */}
            <div className="h-full border rounded-lg p-6 flex items-center justify-center bg-muted/50">
              <p className="text-center text-muted-foreground">
                Coming Soon: Market Price Trends
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {isBuyer ? buyerContent() : farmerContent()}
    </Layout>
  );
};

export default Index;
