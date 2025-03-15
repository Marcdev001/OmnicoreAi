import { ShieldCheck, Workflow, Users, Target } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-[#30D5C8]" />,
      title: "Security First",
      description: "We prioritize the security and privacy of your data above all else."
    },
    {
      icon: <Workflow className="h-8 w-8 text-[#30D5C8]" />,
      title: "Innovation",
      description: "Constantly pushing the boundaries of what's possible with AI."
    },
    {
      icon: <Users className="h-8 w-8 text-[#30D5C8]" />,
      title: "Customer Focus",
      description: "Your success is our success. We're here to support your journey."
    },
    {
      icon: <Target className="h-8 w-8 text-[#30D5C8]" />,
      title: "Excellence",
      description: "Committed to delivering the highest quality solutions."
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "Platform Launch",
      description: "OmniCore AI platform launches with core analysis features."
    },
    {
      year: "2024",
      title: "Advanced Features",
      description: "Introduction of advanced AI capabilities and real-time processing."
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-[#30D5C8] mb-6">About OmniCore AI</h1>
            <p className="text-lg text-foreground/70 mb-8">
              OmniCore AI is a cutting-edge data analysis platform that leverages advanced artificial intelligence to transform complex data into actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/30 border border-[#30D5C8]/20 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-foreground/70">
                To democratize advanced data analysis by making AI-powered insights accessible to businesses of all sizes.
              </p>
            </div>

            <div className="bg-black/30 border border-[#30D5C8]/20 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-foreground/70">
                To become the leading platform for AI-driven data analysis, empowering organizations to make data-driven decisions with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-[#30D5C8] mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-black/30 border border-[#30D5C8]/20 rounded-xl p-6"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-[#30D5C8] mb-12">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 items-start bg-black/30 border border-[#30D5C8]/20 rounded-xl p-6"
              >
                <div className="text-2xl font-bold text-[#30D5C8]">{item.year}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
      </div>
    </div>
  );
}
