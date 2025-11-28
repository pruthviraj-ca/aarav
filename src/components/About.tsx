import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Users, Target, ArrowRight } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from property selection to investor relations."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a community of smart investors who grow their wealth together through shared ownership."
    },
    {
      icon: Target,
      title: "Transparency",
      description: "Complete transparency in all our dealings, providing clear information and regular updates to our investors."
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-secondary to-primary-light/20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-primary">TruAssets</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                TruAssets is India's leading fractional real estate investment platform, founded with the mission to democratize premium property investments. We believe that everyone should have access to high-quality real estate opportunities, regardless of their investment capacity.
              </p>
              
              <p>
                Our expert team combines decades of real estate experience with cutting-edge technology to provide transparent, profitable, and hassle-free investment opportunities. We carefully curate premium properties and enable multiple investors to co-own them, sharing both rental income and capital appreciation.
              </p>
              
              <p>
                Beyond fractional ownership, we provide comprehensive real estate services including buyer-seller matchmaking, digital marketing for property sales, and investment advisory services.
              </p>
            </div>

            <div className="mt-8">
              <Button variant="hero" size="lg" onClick={() => navigate('/services')}>
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Values */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground mb-8">Our Core Values</h3>
            
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;