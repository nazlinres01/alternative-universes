import { Brain, Network, Share } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Generation",
      description: "Advanced language models create detailed, plausible alternative scenarios based on your questions.",
      gradient: "from-primary to-secondary",
    },
    {
      icon: Network,
      title: "Infinite Connections",
      description: "Every scenario considers complex cause-and-effect relationships across multiple domains.",
      gradient: "from-secondary to-accent",
    },
    {
      icon: Share,
      title: "Share & Discover",
      description: "Save your favorite scenarios and explore what others have imagined in the community.",
      gradient: "from-accent to-primary",
    },
  ];

  return (
    <section className="px-4 py-12 bg-dark-slate-light/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI</h2>
          <p className="text-gray-300">Discover the technology behind infinite possibilities</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
