import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, LogOut, User, Shield } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navItems = [
    { name: "Home", href: "#home", route: "/" },
    { name: "How It Works", href: "#how-it-works", route: null },
    { name: "Properties", href: "#properties", route: null },
    { name: "Services", href: "#services", route: "/services" },
    { name: "About Us", href: "#about", route: null },
    { name: "Contact", href: "#contact", route: null },
  ];

  // Smart navigation handler that works from any page
  const handleNavigation = (href: string, route: string | null) => {
    if (route) {
      // Route navigation (like /services)
      navigate(route);
      setIsMenuOpen(false);
    } else if (href.startsWith('#')) {
      // Hash link navigation
      const hash = href.substring(1); // Remove the #
      
      // Special case for home - scroll to top
      if (hash === 'home') {
        if (location.pathname !== '/') {
          navigate('/');
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsMenuOpen(false);
        return;
      }
      
      if (location.pathname !== '/') {
        // If not on home page, navigate to home first, then scroll
        navigate('/', { state: { scrollTo: hash } });
      } else {
        // Already on home page, just scroll to section
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsMenuOpen(false);
    }
  };

  const handleStartInvesting = () => {
    if (isAuthenticated) {
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: 'properties' } });
      } else {
        document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex flex-col cursor-pointer group" 
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="text-2xl md:text-3xl font-bold leading-tight">
              <span className="text-[#0D4A5F]">Tru</span>
              <span className="text-[#14B8A6]">
                <span className="logo-a-accent logo-a-accent-header">A</span>
                ssets
              </span>
            </div>
            <p className="text-[10px] md:text-xs text-[#64748B] font-normal mt-0.5 leading-tight">
              Elevating Real Estate Experiences
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href, item.route)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/admin/dashboard')}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.picture} alt={user?.name} />
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {}}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="cta" size="lg" onClick={handleStartInvesting}>
                  Start Investing
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
            <nav className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.route)}
                  className="text-foreground hover:text-primary transition-colors font-medium text-left"
                >
                  {item.name}
                </button>
              ))}
              {isAuthenticated ? (
                <>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium mb-2">{user?.name}</p>
                    <p className="text-xs text-muted-foreground mb-4">{user?.email}</p>
                  </div>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        navigate('/admin/dashboard');
                        setIsMenuOpen(false);
                      }}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="cta"
                    size="lg"
                    onClick={() => {
                      handleStartInvesting();
                      setIsMenuOpen(false);
                    }}
                  >
                    Start Investing
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;