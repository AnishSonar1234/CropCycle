import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, MapPin, Clock, Calendar, Send, CornerDownRight, Check, AlertCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/config/supabase";
import { useAuth } from "@/contexts/AuthContext";

// Sample data for request statuses
const REQUEST_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  COMPLETED: "completed",
  DECLINED: "declined",
};

// Sample data for existing requests (requests from buyers to farmers)
const initialRequests = [
  {
    id: 1,
    crop: "Organic Maize",
    quantity: "500 kg",
    deadline: "Jun 15, 2025",
    budget: "₹2,200/kg",
    location: "Karnataka",
    description: "Looking for certified organic maize for food processing.",
    status: REQUEST_STATUS.PENDING,
    created: "May 1, 2025",
    responses: 2,
    buyerName: "Green Foods Inc."
  },
  {
    id: 2,
    crop: "Premium Rice",
    quantity: "1000 kg",
    deadline: "Jun 30, 2025",
    budget: "₹3,500/kg",
    location: "Tamil Nadu",
    description: "Need high-quality rice for export market. Must meet international standards.",
    status: REQUEST_STATUS.PENDING,
    created: "May 3, 2025",
    responses: 0,
    buyerName: "ExportMart Ltd."
  },
  {
    id: 3,
    crop: "Wheat",
    quantity: "800 kg",
    deadline: "May 20, 2025",
    budget: "₹2,800/kg",
    location: "Punjab",
    description: "Seeking high-protein wheat for artisanal bread making.",
    status: REQUEST_STATUS.ACCEPTED,
    created: "Apr 25, 2025",
    responses: 3,
    buyerName: "Bakery Connect"
  },
  {
    id: 4,
    crop: "Soybeans",
    quantity: "600 kg",
    deadline: "Jun 5, 2025",
    budget: "₹4,100/kg",
    location: "Gujarat",
    description: "Organic soybeans required for plant-based protein production.",
    status: REQUEST_STATUS.COMPLETED,
    created: "Apr 10, 2025",
    responses: 4,
    buyerName: "VeggiePro Foods"
  }
];

const RequestCard = ({ request }) => {
  const { toast } = useToast();
  const [showResponses, setShowResponses] = useState(false);
  const { user } = useAuth();
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('user_table')
          .select('user_role')
          .eq('user_email', user.email)
          .single();
          
        if (error) {
          console.error('Error fetching user role:', error);
          toast({
            title: "Error",
            description: "Could not fetch user role",
            variant: "destructive",
          });
        } else if (data) {
          console.log("User role fetched:", data.user_role);
          setUserRole(data.user_role);
        }
      } catch (e) {
        console.error("Exception fetching user role:", e);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserRole();
  }, [user, toast]);

  const handleAcceptRequest = async () => {
    try {
      const { error } = await supabase
        .from('request')
        .update({ status: 'accepted' })
        .eq('id', request.id);
        
      if (error) throw error;
      
      toast({
        title: "Request Accepted",
        description: `You have accepted the request for ${request.crop_name}.`,
      });
      
      window.location.reload();
    } catch (error) {
      console.error('Error accepting request:', error);
      toast({
        title: "Error",
        description: "Failed to accept request. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleRejectRequest = async () => {
    try {
      const { error } = await supabase
        .from('request')
        .update({ status: 'declined' })
        .eq('id', request.id);
        
      if (error) throw error;
      
      toast({
        title: "Request Declined",
        description: `You have declined the request for ${request.crop_name}.`,
      });
      
      window.location.reload();
    } catch (error) {
      console.error('Error declining request:', error);
      toast({
        title: "Error",
        description: "Failed to decline request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return "bg-yellow-100 text-yellow-800";
      case 'accepted': return "bg-green-100 text-green-800";
      case 'completed': return "bg-blue-100 text-blue-800";
      case 'declined': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return "Open";
      case 'accepted': return "Accepted";
      case 'completed': return "Completed";
      case 'declined': return "Declined";
      default: return "Unknown";
    }
  };

  // Always render some UI regardless of role or status
  const renderActionButtons = () => {
    console.log("Rendering action buttons. Status:", request.status, "Role:", userRole);
    
    // Default view button for all cases
    if (isLoading) {
      return (
        <div className="w-full flex justify-end">
          <Button size="sm" variant="outline" disabled>
            Loading...
          </Button>
        </div>
      );
    }
    
    // For pending requests when user is a farmer
    if (request.status === 'pending' && userRole === 'farmer') {
      return (
        <div className="w-full flex justify-between">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center"
            onClick={() => setShowResponses(!showResponses)}
          >
            <CornerDownRight className="h-4 w-4 mr-1" />
            <span>{request.responses || 0} {request.responses === 1 ? 'Response' : 'Responses'}</span>
          </Button>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
              onClick={handleRejectRequest}
            >
              <X className="h-4 w-4 mr-1" />
              <span>Reject</span>
            </Button>
            <Button 
              size="sm" 
              className="flex items-center text-white bg-earth-green-DEFAULT hover:bg-earth-green-dark"
              onClick={handleAcceptRequest}
            >
              <Check className="h-4 w-4 mr-1" />
              <span>Accept</span>
            </Button>
          </div>
        </div>
      );
    }
    
    // For pending requests when user is a buyer
    if (request.status === 'pending' && userRole === 'buyer') {
      return (
        <div className="w-full flex justify-end">
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </div>
      );
    }
    
    // For accepted requests
    if (request.status === 'accepted') {
      return (
        <div className="w-full flex justify-end">
          <Button
            size="sm"
            className="bg-earth-green-DEFAULT hover:bg-earth-green-dark text-white"
          >
            View Details
          </Button>
        </div>
      );
    }
    
    // For completed requests
    if (request.status === 'completed') {
      return (
        <div className="w-full flex justify-end">
          <Button size="sm" variant="outline">
            View History
          </Button>
        </div>
      );
    }
    
    // Fallback for any other status or if role is not determined
    return (
      <div className="w-full flex justify-end">
        <Button size="sm" variant="outline">
          View Request
        </Button>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{request.crop_name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <MapPin className="h-3 w-3" />
              <span>{request.location || request.delivery_address || "No location"}</span>
              <span className="mx-1">•</span>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-0.5" />
                <span>Posted {request.created_at}</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Buyer: <span className="font-medium">{request.buyer_name}</span>
            </div>
          </div>
          <Badge className={getStatusColor(request.status)}>
            {getStatusLabel(request.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Quantity</div>
          <div className="font-medium">{request.quantity}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Budget</div>
          <div className="font-medium">{request.price}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Deadline</div>
          <div className="flex items-center text-sm">
            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>{request.deadline}</span>
          </div>
        </div>
        <div className="text-sm mt-2">
          <p className="text-muted-foreground">{request.notes || request.description || "No description provided"}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        {renderActionButtons()}
      </CardFooter>
    </Card>
  );
};

const RequestHistory = () => {

  const [requests, setRequests] = useState([]);
  // Filter ongoing requests (pending and accepted)

  useEffect(() => {
    const fetchrequests = async () => {
      const {data, error} = await supabase.from("request").select("*");
      if (error) {
        console.error("Error fetching requests:", error);
      } else {
        setRequests(data);
      }
    };
    fetchrequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return "bg-yellow-100 text-yellow-800";
      case 'accepted': return "bg-green-100 text-green-800";
      case 'completed': return "bg-blue-100 text-blue-800";
      case 'declined': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return "Open";
      case 'accepted': return "Accepted";
      case 'completed': return "Completed";
      case 'declined': return "Declined";
      default: return "Unknown";
    }
  };
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Past Requests</h3>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Crop</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests
              .filter(req => req.status === 'completed' || req.status === 'accepted')
              .map(request => (
                <TableRow key={request.id}>
                  <TableCell>{request.deadline}</TableCell>
                  <TableCell>{request.crop_name}</TableCell>
                  <TableCell>{request.buyer_name}</TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(request.status)}`}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const Requests = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [requests, setRequests] = useState([]);
  // Filter ongoing requests (pending and accepted)

  useEffect(() => {
    const fetchrequests = async () => {
      const {data, error} = await supabase.from("request").select("*");
      if (error) {
        console.error("Error fetching requests:", error);
      } else {
        setRequests(data);
      }
    };
    fetchrequests();
  }, []);

  // const ongoingRequests = requests.filter(req =>
  //   req.status === "pending" ||
  //   req.status === "accepted"
  // );

  // Filter based on search
  // const filteredRequests = ongoingRequests.filter(request =>
  //   request.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   request.buyerName.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crop Requests</h1>
          <p className="text-muted-foreground mt-1">
            View and respond to buyer requests for crops
          </p>
        </div>

        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="ongoing">Ongoing Requests</TabsTrigger>
            <TabsTrigger value="history">Request History</TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="mt-0">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests by crop, location, or buyer..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </div>
            </div>

            {requests.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {requests
              .filter(req => req.status === 'pending')
              .map(request => (
                <RequestCard key={request.id} request={request} />
              ))}
              </div>
            ) : (
              <div className="bg-muted/50 border rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No matching requests found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find more buyer requests
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <RequestHistory />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Requests;
