
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { PlusCircle, ShoppingCart, Users, MessageSquare, CloudSun, Database } from "lucide-react";

const QuickActionTiles = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Post Produce",
      icon: <PlusCircle className="h-6 w-6" />,
      description: "List your harvest on the marketplace",
      color: "bg-earth-green-light/30",
      textColor: "text-earth-green-dark",
      iconColor: "text-earth-green-DEFAULT",
      onClick: () => navigate("/marketplace/post")
    },
    {
      title: "View Buyers",
      icon: <Users className="h-6 w-6" />,
      description: "Connect with potential buyers",
      color: "bg-earth-blue-light/30",
      textColor: "text-earth-blue-dark",
      iconColor: "text-earth-blue-DEFAULT",
      onClick: () => navigate("/marketplace/buyers")
    },
    {
      title: "Ask CropPal AI",
      icon: <MessageSquare className="h-6 w-6" />,
      description: "Get farming advice and insights",
      color: "bg-earth-brown-light/30",
      textColor: "text-earth-brown-dark",
      iconColor: "text-earth-brown-DEFAULT",
      onClick: () => navigate("/ai-assistant")
    },
    {
      title: "Check Weather",
      icon: <CloudSun className="h-6 w-6" />,
      description: "View detailed weather forecast",
      color: "bg-earth-blue-light/30",
      textColor: "text-earth-blue-dark",
      iconColor: "text-earth-blue-DEFAULT",
      onClick: () => navigate("/weather")
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Card 
          key={action.title} 
          className={`card-hover cursor-pointer p-4 flex flex-col h-full border border-slate-200`}
          onClick={action.onClick}
        >
          <div className={`${action.color} p-2 rounded-full w-fit mb-3`}>
            <div className={action.iconColor}>{action.icon}</div>
          </div>
          <h3 className="font-medium text-lg mb-1">{action.title}</h3>
          <p className="text-sm text-muted-foreground">{action.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default QuickActionTiles;
