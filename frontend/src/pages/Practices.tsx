import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Leaf, Droplets, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const PracticeCard = ({ 
  title, 
  description, 
  icon, 
  benefitMetrics, 
  difficulty, 
  implementationTime, 
  creditValue 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-earth-green-light/30 p-2 rounded-full">
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge variant="outline" className="bg-earth-green-light/20 text-earth-green-DEFAULT border-earth-green-light">
            +{creditValue} Credits
          </Badge>
        </div>
        <CardDescription className="mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Difficulty</span>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full mr-1 ${
                    i < difficulty ? 'bg-earth-green-DEFAULT' : 'bg-muted'
                  }`}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Implementation Time</span>
            <span className="text-sm font-medium">{implementationTime}</span>
          </div>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex w-full justify-between p-0 h-auto">
              <span className="text-sm font-medium">Benefits & Implementation</span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Environmental Benefits</h4>
              <div className="grid grid-cols-2 gap-3">
                {benefitMetrics.map((metric, index) => (
                  <div key={index} className="bg-muted p-2 rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">{metric.label}</span>
                      <span className="text-xs font-medium">{metric.value}</span>
                    </div>
                    <Progress 
                      value={metric.percentage} 
                      className="h-1" 
                      indicatorClassName="bg-earth-green-DEFAULT" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">How to Implement</h4>
              <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                <li>Prepare your soil with appropriate testing</li>
                <li>Gather necessary materials and tools</li>
                <li>Follow implementation guide (download below)</li>
                <li>Record your practices for credit verification</li>
              </ol>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex flex-col xs:flex-row gap-2 justify-end">
          <Button  variant="outline" size="sm">Download Guide</Button>
          <Button 
            className="bg-earth-green-DEFAULT text-black hover:text-white hover:bg-earth-green-dark"
            size="sm"
          >
            Start Practice
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const Practices = () => {
  const soilPractices = [
    {
      title: "Organic Composting",
      description: "Create nutrient-rich compost from farm waste to enhance soil health naturally.",
      icon: <Leaf className="h-5 w-5 text-earth-green-DEFAULT" />,
      benefitMetrics: [
        { label: "Soil Health", value: "+40%", percentage: 40 },
        { label: "Chemical Reduction", value: "-60%", percentage: 60 },
        { label: "Water Retention", value: "+25%", percentage: 25 },
        { label: "Biodiversity", value: "+30%", percentage: 30 }
      ],
      difficulty: 2,
      implementationTime: "2-3 weeks",
      creditValue: 15
    },
    {
      title: "Cover Cropping",
      description: "Plant secondary crops to prevent erosion and improve soil structure between harvests.",
      icon: <Leaf className="h-5 w-5 text-earth-green-DEFAULT" />,
      benefitMetrics: [
        { label: "Soil Protection", value: "+70%", percentage: 70 },
        { label: "Nitrogen Fixation", value: "+45%", percentage: 45 },
        { label: "Erosion Control", value: "+65%", percentage: 65 },
        { label: "Pest Reduction", value: "+20%", percentage: 20 }
      ],
      difficulty: 3,
      implementationTime: "1-2 months",
      creditValue: 20
    }
  ];
  
  const waterPractices = [
    {
      title: "Drip Irrigation",
      description: "Conserve water through precise delivery directly to plant roots.",
      icon: <Droplets className="h-5 w-5 text-earth-blue-DEFAULT" />,
      benefitMetrics: [
        { label: "Water Savings", value: "+60%", percentage: 60 },
        { label: "Crop Yield", value: "+25%", percentage: 25 },
        { label: "Fertilizer Efficiency", value: "+40%", percentage: 40 },
        { label: "Weed Reduction", value: "+30%", percentage: 30 }
      ],
      difficulty: 4,
      implementationTime: "3-4 weeks",
      creditValue: 25
    }
  ];
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sustainable Farming Practices</h1>
          <p className="text-muted-foreground mt-1">
            Implement eco-friendly techniques to earn AgroByte and improve your farm's sustainability
          </p>
        </div>
        
        <div className="flex items-center justify-between bg-earth-green-light/10 p-4 rounded-lg border border-earth-green-light/30">
          <div className="flex items-start gap-3">
            <div className="bg-earth-green-light/30 p-2 rounded-full mt-1">
              <Info className="h-5 w-5 text-earth-green-DEFAULT" />
            </div>
            <div>
              <h3 className="font-medium">Your Sustainability Score</h3>
              <p className="text-sm text-muted-foreground">
                You're implementing 3 of 8 recommended practices. Complete more to increase your AgroByte.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Current Score</p>
                <p className="font-bold text-earth-green-DEFAULT text-2xl">375</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-earth-green-light flex items-center justify-center">
                <span className="font-bold text-lg">37%</span>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="soil" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="soil">Soil Health</TabsTrigger>
            <TabsTrigger value="water">Water Conservation</TabsTrigger>
            <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="soil" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {soilPractices.map((practice) => (
                <PracticeCard key={practice.title} {...practice} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="water" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {waterPractices.map((practice) => (
                <PracticeCard key={practice.title} {...practice} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="biodiversity" className="mt-0">
            <div className="p-12 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Biodiversity practices coming soon!</p>
                <Button variant="outline" className="mt-4">Get Notified</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Practices;
