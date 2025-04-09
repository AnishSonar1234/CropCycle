
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Star, ChevronRight, CheckCircle, Clock } from "lucide-react";

const ProduceCard = ({ 
  name, 
  farmer, 
  location, 
  quantity, 
  price, 
  imageUrl, 
  isCertified, 
  rating, 
  isOrganic,
  harvestDate
}) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="object-cover w-full h-full"
        />
        {isOrganic && (
          <Badge className="absolute top-2 right-2 bg-earth-green-DEFAULT">
            Organic
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
              <span className="mx-1">•</span>
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-0.5" />
                <span>{rating}</span>
              </div>
            </div>
          </div>
          {isCertified && (
            <div className="flex items-center text-xs text-earth-green-DEFAULT">
              <CheckCircle className="h-3 w-3 mr-1" />
              <span>Verified</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2 space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Quantity</div>
          <div className="font-medium">{quantity}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Price</div>
          <div className="font-medium">{price}/kg</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Harvest Date</div>
          <div className="flex items-center text-sm">
            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>{harvestDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-earth-brown-light flex items-center justify-center text-xs font-medium text-earth-brown-dark">
              {farmer.split("")[0]}
            </div>
            <span className="text-sm ml-1">{farmer}</span>
          </div>
          <Button size="sm" variant="ghost" className="flex items-center text-earth-green-DEFAULT">
            <span>Details</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const produceItems = [
  {
    name: "Premium Organic Maize",
    farmer: "Rahul Singh",
    location: "Karnataka",
    quantity: "500 kg",
    price: "₹2,200",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
    isCertified: true,
    rating: 4.8,
    isOrganic: true,
    harvestDate: "Apr 28, 2025"
  },
  {
    name: "Fresh Tomatoes",
    farmer: "Amina Khalid",
    location: "Gujarat",
    quantity: "200 kg",
    price: "₹1,800",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop",
    isCertified: true,
    rating: 4.6,
    isOrganic: true,
    harvestDate: "May 1, 2025"
  },
  {
    name: "White Rice",
    farmer: "Prakash Rao",
    location: "Tamil Nadu",
    quantity: "1000 kg",
    price: "₹3,500",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
    isCertified: false,
    rating: 4.2,
    isOrganic: false,
    harvestDate: "Apr 20, 2025"
  },
  {
    name: "Organic Potatoes",
    farmer: "Kavita Sharma",
    location: "Uttar Pradesh",
    quantity: "350 kg",
    price: "₹1,600",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop",
    isCertified: true,
    rating: 4.7,
    isOrganic: true,
    harvestDate: "Apr 30, 2025"
  },
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            Buy and sell directly with fair prices for quality produce
          </p>
        </div>
        
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="buy">Buy Produce</TabsTrigger>
            <TabsTrigger value="sell">Sell Produce</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="mt-0">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search for produce..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {produceItems.map((item) => (
                <ProduceCard key={item.name} {...item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sell" className="mt-0">
            <div className="bg-muted/50 border rounded-lg p-8">
              <div className="max-w-md mx-auto text-center">
                <h2 className="text-xl font-medium mb-2">List Your Produce</h2>
                <p className="text-muted-foreground mb-6">
                  Connect directly with buyers and get fair prices for your quality produce
                </p>
                <Button className="bg-earth-green-DEFAULT hover:bg-earth-green-dark text-white">
                  Create Listing
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="my-listings" className="mt-0">
            <div className="bg-muted/50 border rounded-lg p-8">
              <div className="max-w-md mx-auto text-center">
                <h2 className="text-xl font-medium mb-2">Your Listings</h2>
                <p className="text-muted-foreground mb-6">
                  You don't have any active listings yet
                </p>
                <Button className="bg-earth-green-DEFAULT hover:bg-earth-green-dark text-white">
                  Create Your First Listing
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Marketplace;
