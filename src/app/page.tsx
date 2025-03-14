import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedBackground } from "@/components/animated-background";
import { BarChart2, Brain, Database, LineChart, Award, Shield, Zap, Code } from "lucide-react";
import './globals.css';

export default function Home() {
  const features = [
    {
      icon: <BarChart2 className="h-10 w-10 text-[#30D5C8]" />,
      title: "Pattern Recognition",
      description: "Identify hidden patterns and correlations in your data."
    },
    {
      icon: <Brain className="h-10 w-10 text-[#30D5C8]" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms for deep insights."
    },
    {
      icon: <Database className="h-10 w-10 text-[#30D5C8]" />,
      title: "Data Processing",
      description: "Handle large datasets with efficient processing."
    },
    {
      icon: <LineChart className="h-10 w-10 text-[#30D5C8]" />,
      title: "Trend Analysis",
      description: "Visualize and predict future trends in your data."
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-[#30D5C8]" />,
      title: "Secure Analysis",
      description: "Good security for your sensitive data analysis"
    },
    {
      icon: <Zap className="h-6 w-6 text-[#30D5C8]" />,
      title: "Real-time Processing",
      description: "Get instant insights with our high-performance AI engine"
    },
    {
      icon: <Code className="h-6 w-6 text-[#30D5C8]" />,
      title: "Artifical intelligence",
      description: "Have more deep conversations about your processed data when ever you want"
    },
    {
      icon: <Award className="h-6 w-6 text-[#30D5C8]" />,
      title: "Industry Leading",
      description: "Built on cutting-edge AI technology and best practices"
    }
  ];

  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#30D5C8] to-white">
              Advanced AI Data Analysis Platform
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8">
              Unlock powerful insights with our AI-powered data analysis platform. Transform complex data into actionable intelligence through advanced pattern recognition, predictive modeling, and real-time visualization. Whether you're analyzing market trends, research data, or business metrics, our platform empowers you to make data-driven decisions with confidence.
            </p>
            <div className="space-x-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-[#30D5C8] hover:bg-[#30D5C8]/80">
                  Try Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black/30 border border-[#30D5C8]/20 rounded-xl p-6 hover:border-[#30D5C8]/50 transition-all duration-300"
              >
                <div className="mb-4 p-3 bg-[#30D5C8]/10 rounded-lg inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#30D5C8]">
              Why Choose OmniCore AI
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-black/30 border border-[#30D5C8]/20 hover:border-[#30D5C8]/50 transition-all"
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/70">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#30D5C8]">
              Ready to Transform Your Data?
            </h2>
            <p className="text-lg mb-8 text-white/70">
              Start analyzing your data with our powerful AI tools today.
              No credit card required.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-[#30D5C8] hover:bg-[#30D5C8]/80">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
