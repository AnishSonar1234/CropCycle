import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/config/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Farmer {
    id: string;
    user_name: string;
    user_email: string;
    user_contact: string;
    user_description: string;
}

interface Buyer {
    id: string;
    user_name: string;
    user_email: string;
    user_contact: string;
    user_description: string;
}

const RequestFormPage = () => {
    const { farmerId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAuth();

    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [buyer, setBuyer] = useState<Buyer | null>(null);

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [formData, setFormData] = useState({
        cropName: "",
        quantity: "",
        price: "",
        address: "",
        notes: ""
    });

    useEffect(() => {
        // Fetch the farmer details based on farmerId
        const fetchFarmer = async () => {
            if (!farmerId) return;

            const { data, error } = await supabase
                .from('user_table')
                .select('*')
                .eq('id', farmerId)
                .single();

            if (error) {
                console.error('Error fetching farmer:', error);
                toast({
                    title: "Error",
                    description: "Could not load farmer details",
                    variant: "destructive",
                });
            } else if (data) {
                setFarmer(data);
            }
        };

        // Fetch the current buyer's details
        const fetchBuyer = async () => {
            if (!user?.id) return;

            const { data, error } = await supabase
                .from('user_table')
                .select('*')
                .eq('user_email', user.email)
                .single();

            if (error) {
                console.error('Error fetching buyer:', error);
                toast({
                    title: "Error",
                    description: "Could not load your details",
                    variant: "destructive",
                });
            } else if (data) {
                setBuyer(data);
            }
        };

        fetchFarmer();
        fetchBuyer();
    }, [farmerId, user?.id, toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!date) {
            toast({
                title: "Error",
                description: "Please select a deadline date",
                variant: "destructive",
            });
            return;
        }

        if (!user || !farmer || !buyer) {
            toast({
                title: "Error",
                description: "Missing user or farmer information",
                variant: "destructive",
            });
            return;
        }

        try {
            const { data, error } = await supabase
                .from('request')
                .insert({
                    buyer_name: buyer.user_name,
                    buyer_email: buyer.user_email,
                    buyer_contact: buyer.user_contact,
                    farmer_name: farmer.user_name,
                    farmer_email: farmer.user_email,
                    farmer_contact: farmer.user_contact,
                    crop_name: formData.cropName,
                    quantity: formData.quantity,
                    price: formData.price,
                    deadline: date.toISOString(),
                    location: formData.address,
                    description: formData.notes,
                    status: 'pending',
                });

            if (error) {
                throw error;
            }

            toast({
                title: "Request Sent",
                description: `Your request to ${farmer.user_name} has been submitted successfully.`,
            });

            // Refresh the page after successful submission
            window.location.reload();
            
            // Navigate to requests page after a short delay
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.error('Error submitting request:', error);
            toast({
                title: "Error",
                description: "Failed to submit request. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <Layout>
            <div className="container py-8">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Request Crops from {farmer?.user_name || 'Farmer'}
                            </CardTitle>
                            {farmer && (
                                <p className="text-muted-foreground">
                                    {farmer.user_email} • {farmer.user_contact}
                                </p>
                            )}
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="cropName" className="text-sm font-medium">
                                        Crop Name
                                    </label>
                                    <Input
                                        id="cropName"
                                        name="cropName"
                                        placeholder="What crop are you looking for?"
                                        value={formData.cropName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="quantity" className="text-sm font-medium">
                                        Quantity
                                    </label>
                                    <Input
                                        id="quantity"
                                        name="quantity"
                                        placeholder="How much do you need? (e.g., 10 pounds, 2 bushels)"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="price" className="text-sm font-medium">
                                        Price
                                    </label>
                                    <Input
                                        id="price"
                                        name="price"
                                        placeholder="Expected price (e.g., $20/lb, $50 total)"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="deadline" className="text-sm font-medium">
                                        Deadline
                                    </label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Select deadline date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                                disabled={(date) => date < new Date()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-sm font-medium">
                                        Delivery Address
                                    </label>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="Where should the crops be delivered?"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="notes" className="text-sm font-medium">
                                        Additional Notes
                                    </label>
                                    <Textarea
                                        id="notes"
                                        name="notes"
                                        placeholder="Any specific requirements or comments?"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows={3}
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-earth-green-DEFAULT hover:bg-earth-green-dark"
                                        disabled={!date}
                                    >
                                        Send Request
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default RequestFormPage; 