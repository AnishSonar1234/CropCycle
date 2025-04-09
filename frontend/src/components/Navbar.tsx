import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sun,
  Moon,
  Settings,
  User,
  LogOut
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { user, role, isAuthenticated, logout } = useAuth();

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // No need to navigate as logout in AuthContext will refresh the page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-card py-2 px-4 md:px-6 lg:px-8 shadow-sm border-b">
      <div className="mx-auto flex items-center justify-between h-14">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          <Link to="/" className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-earth-green-DEFAULT text-white rounded-full flex items-center justify-center font-bold text-lg">
              CC
            </span>
            <span className="font-bold text-lg hidden sm:inline-flex text-earth-green-DEFAULT">CropCircle Connect</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-earth-green-DEFAULT font-medium">
            {(!user || role !== 'buyer') ? 'Dashboard' : 'Farmer'}
          </Link>
          {(!user || role !== 'buyer') && (
            <Link to="/practices" className="text-foreground hover:text-earth-green-DEFAULT font-medium">
              Eco Practices
            </Link>
          )}
          <Link to="/requests" className="text-foreground hover:text-earth-green-DEFAULT font-medium">
            Request
          </Link>
          {(!user || role !== 'buyer') && (
            <Link to="/carbon-credits" className="text-foreground hover:text-earth-green-DEFAULT font-medium">
              AgroByte
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-1 md:space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="border-2 border-earth-green-DEFAULT rounded-full overflow-hidden">
                  <div className="w-6 h-6 bg-earth-green-light flex items-center justify-center rounded-full">
                    <User size={16} className="text-earth-green-dark" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.email}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="flex items-center w-full">
                    <User size={16} className="mr-2" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="flex items-center w-full">
                    <Settings size={16} className="mr-2" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button 
                size="sm"
                className="bg-earth-green-DEFAULT text-black hover:bg-earth-green-dark hover:text-white"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-background border-t pt-4 pb-6 px-4 mt-2 animate-grow-up">
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                {(!user || role !== 'buyer') ? 'Dashboard' : 'Farmer' }
              </Link>
            </li>
            {(!user || role !== 'buyer') && (
              <li>
                <Link to="/practices" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Eco Practices
                </Link>
              </li>
            )}
            <li>
              <Link to="/requests" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Request
              </Link>
            </li>
            {(!user || role !== 'buyer') && (
              <li>
                <Link to="/carbon-credits" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  AgroByte
                </Link>
              </li>
            )}
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    Settings
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-destructive hover:text-destructive/80 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/login" 
                  className="block py-2 text-earth-green-DEFAULT hover:underline font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
