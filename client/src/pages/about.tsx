import { Brain, Zap, Users, Shield, Globe, Lightbulb } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function About() {
  const features = [
    {
      icon: Brain,
      title: "Gelişmiş AI Teknolojisi",
      description: "En son yapay zeka modelleri kullanarak bilimsel olarak mümkün ve mantıklı alternatif senaryolar üretir.",
      gradient: "from-primary to-secondary",
    },
    {
      icon: Zap,
      title: "Anında Senaryo Üretimi",
      description: "Sorularınızı saniyeler içinde kapsamlı alternatif evren hikayelerine dönüştürür.",
      gradient: "from-secondary to-accent",
    },
    {
      icon: Users,
      title: "Topluluk Odaklı",
      description: "Senaryolarınızı paylaşın, başkalarının çalışmalarını keşfedin ve yaratıcı topluluğumuzun parçası olun.",
      gradient: "from-accent to-primary",
    },
    {
      icon: Globe,
      title: "Sınırsız Kategori",
      description: "Tarih, teknoloji, toplum, çevre ve ekonomi alanlarında sınırsız olasılık keşfedin.",
      gradient: "from-primary to-accent",
    },
    {
      icon: Shield,
      title: "Güvenli ve Gizli",
      description: "Verileriniz güvenle korunur ve gizliliğiniz önceliğimizdir.",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Lightbulb,
      title: "Eğitici İçerik",
      description: "Her senaryo eleştirel düşünmeyi teşvik eder ve yeni perspektifler sunar.",
      gradient: "from-accent to-secondary",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Oluşturulan Senaryo" },
    { number: "5,000+", label: "Aktif Kullanıcı" },
    { number: "50+", label: "Ülkeden Erişim" },
    { number: "99.9%", label: "Uptime Oranı" },
  ];

  const teamMembers = [
    {
      name: "Dr. Ayşe Demir",
      role: "Yapay Zeka Uzmanı",
      description: "MIT'den AI doktorası, 10+ yıl deneyim",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b6f5?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mehmet Yılmaz",
      role: "Ürün Geliştirme Lideri",
      description: "Google ve Meta'da 8 yıl deneyim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Prof. Dr. Zeynep Kaya",
      role: "Bilim Danışmanı",
      description: "Boğaziçi Üniversitesi Fizik Bölümü",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">What If GPT</span> Hakkında
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Yapay zeka destekli alternatif evren simülatörümüz, "Ya olsaydı?" sorularınızı 
            bilimsel olarak mümkün ve yaratıcı senaryolara dönüştürür. Hayal gücünüzün 
            sınırlarını keşfedin ve yeni perspektifler kazanın.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-primary hover:bg-primary/80 px-8 py-3">
              Hemen Başla
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3">
              Demo İzle
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Neden What If GPT?</h2>
            <p className="text-gray-300 text-lg">Alternatif evren keşfinde öncü teknolojimiz</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect border-white/20 hover:border-white/40 transition-all group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 py-16 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Misyonumuz</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            What If GPT olarak misyonumuz, insanların hayal gücünü ve eleştirel düşünme 
            becerilerini geliştirmektir. Yapay zeka teknolojisini kullanarak, kompleks 
            sistemlerin nasıl işlediğini anlamalarına yardımcı olur ve farklı perspektiflerden 
            dünyayı görmelerini sağlarız.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">Vizyonumuz</h3>
              <p className="text-gray-300">
                Herkesin erişebileceği, alternatif düşünceyi teşvik eden ve bilimsel 
                yaklaşımı benimseyen küresel bir platform oluşturmak.
              </p>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-secondary">Değerlerimiz</h3>
              <p className="text-gray-300">
                Bilimsel doğruluk, yaratıcılık, erişilebilirlik ve topluluk odaklı 
                yaklaşım temel değerlerimizdir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ekibimiz</h2>
            <p className="text-gray-300 text-lg">Uzman kadromuzla sizlere hizmet veriyoruz</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass-effect border-white/20 text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Alternatif Evrenler Sizi Bekliyor</h2>
          <p className="text-xl text-white/90 mb-8">
            Hayal ettiğiniz senaryoları gerçekleştirin ve yeni olasılıkları keşfedin.
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
            Ücretsiz Başlayın
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}