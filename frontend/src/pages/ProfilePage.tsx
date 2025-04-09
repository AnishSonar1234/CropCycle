import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/config/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin, Mail, Phone, Edit, Plus } from "lucide-react";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const [profile, setProfile] = useState(null);
    const [crops, setCrops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('user_table')
                    .select('*')
                    .eq('user_email', user.email)
                    .single();

                if (error) {
                    console.error('Error fetching profile:', error);
                    toast({
                        title: "Error",
                        description: "Could not load profile information",
                        variant: "destructive",
                    });
                } else if (data) {
                    setProfile(data);

                    // If user is a farmer, fetch their crops
                    if (data.user_role === 'farmer') {
                        fetchFarmerCrops(data.user_email);
                    }
                }
            } catch (e) {
                console.error("Exception fetching profile:", e);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchFarmerCrops = async (farmerEmail: string) => {
            try {
                const { data, error } = await supabase
                    .from('crops')
                    .select('*')
                    .eq('farmer_email', farmerEmail);

                if (error) {
                    console.error('Error fetching crops:', error);
                } else if (data) {
                    setCrops(data);
                }
            } catch (e) {
                console.error("Exception fetching crops:", e);
            }
        };

        fetchUserProfile();
    }, [user, toast]);

    if (isLoading) {
        return (
            <Layout>
                <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-earth-green-DEFAULT" />
                        <p className="text-muted-foreground">Loading profile...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!profile) {
        return (
            <Layout>
                <div className="container py-8">
                    <Card>
                        <CardContent className="py-12">
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold mb-2">Profile Not Found</h2>
                                <p className="text-muted-foreground mb-6">We couldn't find your profile information.</p>
                                <Button onClick={() => navigate('/')}>Go Home</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Layout>
        );
    }

    const initials = profile.user_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();

    return (
        <Layout>
            <div className="container py-8">
                <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="h-24 w-24 mb-4">
                                        {profile.profile_image ? (
                                            <AvatarImage src={profile.profile_image} alt={profile.user_name} />
                                        ) : (
                                            <AvatarFallback className="text-2xl bg-earth-green-light text-earth-green-dark">
                                                {initials}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <h2 className="text-2xl font-bold">{profile.user_name}</h2>
                                    <Badge className="mt-1">
                                        {profile.user_role === 'farmer' ? 'Farmer' : 'Buyer'}
                                    </Badge>

                                    <div className="w-full mt-6 space-y-3">
                                        {profile.user_location && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span>{profile.user_location}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span>{profile.user_email}</span>
                                        </div>
                                        {profile.user_contact && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <span>{profile.user_contact}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-center pb-6">
                                <Button variant="outline" className="flex items-center gap-1">
                                    <Edit className="h-4 w-4" />
                                    <span>Edit Profile</span>
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">About</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {profile.user_description || "No description provided."}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        {profile.user_role === 'farmer' && (
                            <Tabs defaultValue="crops">
                                <div className="flex justify-between items-center mb-4">
                                    <TabsList>
                                        <TabsTrigger value="crops">My Crops</TabsTrigger>
                                        <TabsTrigger value="requests">Pending Requests</TabsTrigger>
                                    </TabsList>
                                    <Button
                                        size="sm"
                                        className="bg-earth-green-DEFAULT hover:bg-earth-green-dark flex items-center gap-1"
                                        onClick={() => navigate('/new-crop')}
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span>Add Crop</span>
                                    </Button>
                                </div>

                                <TabsContent value="crops" className="mt-0">
                                    {crops.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {crops.map((crop, index) => (
                                                <Card key={index}>
                                                    <CardContent className="pt-4">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="font-semibold text-lg">{crop.crop_name}</h3>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="text-sm text-muted-foreground">Price</p>
                                                                <p className="font-medium">{crop.crop_price}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-muted-foreground">Available</p>
                                                                <p className="font-medium">{crop.crop_status}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="flex justify-end pt-0">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => navigate(`/crops/${crop.id}`)}
                                                        >
                                                            View Details
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card>
                                            <CardContent className="py-12">
                                                <div className="text-center">
                                                    <h3 className="text-lg font-medium mb-2">No crops listed yet</h3>
                                                    <p className="text-muted-foreground mb-6">Start adding your crops to showcase what you grow</p>
                                                    <Button
                                                        className="bg-earth-green-DEFAULT hover:bg-earth-green-dark"
                                                        onClick={() => navigate('/new-crop')}
                                                    >
                                                        Add Your First Crop
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </TabsContent>

                                <TabsContent value="requests" className="mt-0">
                                    <Card>
                                        <CardContent className="py-6">
                                            <div className="text-center">
                                                <h3 className="text-lg font-medium mb-2">Requests from buyers</h3>
                                                <p className="text-muted-foreground">
                                                    View and manage all incoming requests from buyers here
                                                </p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="justify-center pb-6">
                                            <Button
                                                onClick={() => navigate('/requests')}
                                                className="bg-earth-green-DEFAULT hover:bg-earth-green-dark"
                                            >
                                                View Requests
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        )}

                        {profile.user_role === 'buyer' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">My Activities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <h3 className="font-medium mb-2">Recent Requests</h3>
                                            <p className="text-muted-foreground mb-4">
                                                Track your crop requests and connect with farmers.
                                            </p>
                                            <Button
                                                onClick={() => navigate('/requests')}
                                                className="bg-earth-green-DEFAULT text-black hover:bg-earth-green-dark hover:text-white"
                                            >
                                                View Requests
                                            </Button>
                                        </div>

                                        <div className="border-t pt-4 mt-2">
                                            <h3 className="font-medium mb-2">Find Crops</h3>
                                            <p className="text-muted-foreground mb-4">
                                                Browse available crops from farmers in your area.
                                            </p>
                                            <Button
                                                onClick={() => navigate('/')}
                                                className="bg-earth-green-DEFAULT text-black hover:bg-earth-green-dark hover:text-white"
                                            >
                                                Browse Crops
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilePage; 