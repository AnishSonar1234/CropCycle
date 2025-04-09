
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const CarbonCreditTracker = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Carbon Credit Tracker</CardTitle>
            <CardDescription>Track your sustainable farming impact</CardDescription>
          </div>
          <div className="bg-earth-green-light/30 p-2 rounded-full">
            <Leaf className="h-5 w-5 text-earth-green-DEFAULT" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Current Credits</span>
            <span className="font-bold text-earth-green-DEFAULT">28/100</span>
          </div>
          <Progress value={28} className="h-2 bg-muted" indicatorClassName="bg-earth-green-DEFAULT" />
          <p className="text-xs text-muted-foreground mt-1">10 credits = ₹500 additional income</p>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Credit Sources</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center p-2 rounded-md bg-muted">
              <div className="flex items-center gap-2">
                <div className="bg-earth-green-light/30 p-1 rounded-full">
                  <Leaf className="h-4 w-4 text-earth-green-DEFAULT" />
                </div>
                <span className="text-sm">Organic Farming</span>
              </div>
              <span className="font-medium">+12</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-md bg-muted">
              <div className="flex items-center gap-2">
                <div className="bg-earth-green-light/30 p-1 rounded-full">
                  <svg className="h-4 w-4 text-earth-green-DEFAULT" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 8V20H20V8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 14V20H15V14L12 12L9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm">Water Conservation</span>
              </div>
              <span className="font-medium">+8</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-md bg-muted">
              <div className="flex items-center gap-2">
                <div className="bg-earth-green-light/30 p-1 rounded-full">
                  <svg className="h-4 w-4 text-earth-green-DEFAULT" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm">Crop Rotation</span>
              </div>
              <span className="font-medium">+8</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">View History</Button>
          <Button className="bg-earth-green-DEFAULT hover:bg-earth-green-dark text-white w-full sm:w-auto">Sell Credits</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonCreditTracker;
