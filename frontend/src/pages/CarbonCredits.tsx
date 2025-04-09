import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Leaf, ArrowRight, Info, CreditCard, ChevronRight } from "lucide-react";

const CreditSlider = ({ label, value, onChange, min, max, step = 1 }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={label}>{label}</Label>
        <span className="font-medium">{value}</span>
      </div>
      <Slider 
        id={label}
        value={[value]} 
        min={min} 
        max={max}
        step={step}
        onValueChange={(values) => onChange(values[0])}
        className="py-2"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

const CarbonCredits = () => {
  const [acreage, setAcreage] = useState(5);
  const [organicPercentage, setOrganicPercentage] = useState(30);
  const [rotationCrops, setRotationCrops] = useState(2);
  const [waterConservation, setWaterConservation] = useState(40);
  
  // Calculate estimated credits
  const estimatedCredits = Math.floor(
    (acreage * 2) + 
    (organicPercentage * 0.2) + 
    (rotationCrops * 5) + 
    (waterConservation * 0.1)
  );
  
  const estimatedIncome = estimatedCredits * 50; // ₹50 per credit
  
  const transactions = [
    { 
      id: "CR-2025-042", 
      date: "Apr 28, 2025", 
      credits: 15, 
      buyer: "Green Earth Co.", 
      amount: "₹750",
      status: "Completed" 
    },
    { 
      id: "CR-2025-038", 
      date: "Apr 15, 2025", 
      credits: 8, 
      buyer: "Carbon Offset Fund", 
      amount: "₹400",
      status: "Completed" 
    },
    { 
      id: "CR-2025-029", 
      date: "Mar 30, 2025", 
      credits: 12, 
      buyer: "Eco Solutions Ltd.", 
      amount: "₹600",
      status: "Completed" 
    },
  ];
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Carbon Credit Marketplace</h1>
            <p className="text-muted-foreground mt-1">
              Monetize your sustainable farming practices
            </p>
          </div>
          <Button 
            className="bg-earth-green-DEFAULT hover:bg-earth-green-dark text-white"
            onClick={() => {}}
          >
            Sell My Credits
          </Button>
        </div>
        
        <div className="flex items-center justify-between bg-card shadow-sm p-4 md:p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-earth-green-light/30 flex items-center justify-center">
              <Leaf className="h-7 w-7 text-earth-green-DEFAULT" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available Credits</p>
              <p className="text-3xl font-bold">28</p>
              <p className="text-sm text-muted-foreground">Estimated Value: ₹1,400</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Next Verification</p>
            <p className="text-lg font-medium">May 15, 2025</p>
          </div>
        </div>
        
        <Tabs defaultValue="estimate" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="estimate">Credit Calculator</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
            <TabsTrigger value="buyers">Credit Buyers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="estimate" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Credit Estimation Calculator</CardTitle>
                    <CardDescription>
                      Adjust the sliders to see how sustainable practices can increase your credits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <CreditSlider 
                      label="Farm Size (Acres)" 
                      value={acreage} 
                      onChange={setAcreage}
                      min={1}
                      max={50}
                    />
                    
                    <CreditSlider 
                      label="Organic Farming (%)" 
                      value={organicPercentage} 
                      onChange={setOrganicPercentage}
                      min={0}
                      max={100}
                    />
                    
                    <CreditSlider 
                      label="Crop Rotation (Number of Crops)" 
                      value={rotationCrops} 
                      onChange={setRotationCrops}
                      min={1}
                      max={5}
                    />
                    
                    <CreditSlider 
                      label="Water Conservation (%)" 
                      value={waterConservation} 
                      onChange={setWaterConservation}
                      min={0}
                      max={100}
                    />
                    
                    <div className="flex items-center gap-2 pt-2 text-muted-foreground text-sm">
                      <Info className="h-4 w-4" />
                      <p>
                        Credits are verified by third-party agencies through satellite imagery and on-ground sensors.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estimated Earnings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Estimated Credits</span>
                        <span className="font-bold">{estimatedCredits}</span>
                      </div>
                      <Progress value={Math.min(estimatedCredits, 100)} className="h-2" />
                    </div>
                    
                    <div className="p-4 bg-earth-green-light/20 rounded-lg border border-earth-green-light/30">
                      <p className="text-sm font-medium mb-1">Potential Annual Income</p>
                      <p className="text-3xl font-bold text-earth-green-DEFAULT">
                        ₹{estimatedIncome.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Based on current market rate of ₹50 per credit
                      </p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2">How to increase your credits:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-earth-green-DEFAULT" />
                          <span>Switch to organic compost (+5 credits/month)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-earth-green-DEFAULT" />
                          <span>Implement drip irrigation (+8 credits/month)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-earth-green-DEFAULT" />
                          <span>Add one more crop to your rotation (+5 credits/month)</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions" className="mt-0">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Credit Transaction History</CardTitle>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                            Transaction ID
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                            Credits
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                            Buyer
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {transactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              {transaction.id}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                              {transaction.date}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {transaction.credits}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {transaction.buyer}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              {transaction.amount}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="buyers" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Green Earth Co.",
                  logo: "GE",
                  description: "Corporate buyer seeking agricultural AgroByte for offsetting manufacturing emissions.",
                  priceRange: "₹45-55 per credit",
                  minVolume: "10 credits"
                },
                {
                  name: "Carbon Offset Fund",
                  logo: "CO",
                  description: "International fund purchasing credits for global carbon market trading.",
                  priceRange: "₹50-60 per credit",
                  minVolume: "5 credits"
                },
                {
                  name: "Eco Solutions Ltd.",
                  logo: "ES",
                  description: "Technology company with sustainability initiatives seeking quality credits.",
                  priceRange: "₹48-58 per credit",
                  minVolume: "8 credits"
                }
              ].map((buyer) => (
                <Card key={buyer.name} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-earth-blue-light/30 flex items-center justify-center font-bold text-earth-blue-DEFAULT">
                        {buyer.logo}
                      </div>
                      <CardTitle className="text-lg">{buyer.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 space-y-3">
                    <p className="text-sm text-muted-foreground">{buyer.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price Range:</span>
                        <span className="font-medium">{buyer.priceRange}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Min Volume:</span>
                        <span className="font-medium">{buyer.minVolume}</span>
                      </div>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-4 pt-2">
                    <Button 
                      className="w-full gap-2 bg-earth-green-DEFAULT hover:bg-earth-green-dark text-black hover:text-white"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Sell Credits</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="gap-2">
                <span>View All Buyers</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CarbonCredits;
