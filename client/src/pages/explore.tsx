import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Clock, Eye, Heart, Sparkles } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Scenario } from "@shared/schema";

const categoryConfig = {
  historical: { gradient: "category-historical", icon: "🏛️", name: "Tarihsel" },
  technological: { gradient: "category-technological", icon: "🤖", name: "Teknolojik" },
  social: { gradient: "category-social", icon: "👥", name: "Sosyal" },
  environmental: { gradient: "category-environmental", icon: "🌿", name: "Çevresel" },
  economic: { gradient: "category-economic", icon: "📈", name: "Ekonomik" },
};

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { data: scenariosData, isLoading } = useQuery({
    queryKey: ["/api/scenarios", searchQuery, selectedCategory, sortBy],
    queryFn: async () => {
      const response = await fetch("/api/scenarios?limit=20", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch scenarios");
      return response.json();
    },
  });

  const scenarios = scenariosData?.scenarios || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getPreview = (content: string) => {
    const plainText = content.replace(/##.*?\n/g, '').replace(/\n+/g, ' ');
    return plainText.length > 200 ? plainText.substring(0, 200) + "..." : plainText;
  };

  const filteredScenarios = scenarios.filter((scenario: Scenario) => {
    const matchesSearch = scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scenario.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scenario.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Alternatif Evrenler Keşfet</h1>
            <p className="text-gray-300 text-lg">Topluluk tarafından oluşturulan binlerce "Ya olsaydı?" senaryosunu inceleyin</p>
          </div>

          {/* Filters */}
          <div className="glass-effect rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Senaryo ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Kategori seç" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Kategoriler</SelectItem>
                  {Object.entries(categoryConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.icon} {config.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">En Yeni</SelectItem>
                  <SelectItem value="popular">En Popüler</SelectItem>
                  <SelectItem value="views">En Çok İzlenen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <Card key={i} className="glass-effect border-white/20 animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-600 rounded mb-4"></div>
                    <div className="h-4 bg-gray-600 rounded mb-3"></div>
                    <div className="h-20 bg-gray-600 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-600 rounded w-16"></div>
                      <div className="h-3 bg-gray-600 rounded w-16"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredScenarios.length === 0 ? (
            <div className="text-center py-16">
              <Sparkles className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-300">Henüz senaryo bulunamadı</h3>
              <p className="text-gray-400 mb-6">İlk alternatif evren senaryosunu siz oluşturun!</p>
              <Button className="bg-primary hover:bg-primary/80">
                Senaryo Oluştur
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScenarios.map((scenario: Scenario) => {
                const config = categoryConfig[scenario.category as keyof typeof categoryConfig] || categoryConfig.historical;
                
                return (
                  <Card 
                    key={scenario.id} 
                    className="scenario-card glass-effect border-white/20 cursor-pointer hover:border-white/40 transition-all group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`${config.gradient} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                          <span className="mr-1">{config.icon}</span>
                          {config.name}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatDate(scenario.createdAt.toString())}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold mb-3 text-white line-clamp-2 group-hover:text-primary transition-colors">
                        {scenario.title}
                      </h3>
                      
                      <p className="text-sm text-gray-300 line-clamp-4 mb-4">
                        {getPreview(scenario.content)}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center">
                          <Eye size={12} className="mr-1" />
                          {scenario.views} görüntüleme
                        </span>
                        <span className="flex items-center">
                          <Heart size={12} className="mr-1" />
                          {scenario.likes} beğeni
                        </span>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full text-primary hover:text-primary/80 hover:bg-primary/10"
                        >
                          Detayları Görüntüle →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Load More */}
          {filteredScenarios.length >= 9 && (
            <div className="text-center mt-12">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Daha Fazla Yükle
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}