import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Plus, Trash2, Edit, Eye, Heart, Clock, Share2 } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Scenario } from "@shared/schema";

const categoryConfig = {
  historical: { gradient: "category-historical", icon: "🏛️", name: "Tarihsel" },
  technological: { gradient: "category-technological", icon: "🤖", name: "Teknolojik" },
  social: { gradient: "category-social", icon: "👥", name: "Sosyal" },
  environmental: { gradient: "category-environmental", icon: "🌿", name: "Çevresel" },
  economic: { gradient: "category-economic", icon: "📈", name: "Ekonomik" },
};

export default function MyScenarios() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: scenariosData, isLoading } = useQuery({
    queryKey: ["/api/scenarios"],
    queryFn: async () => {
      const response = await fetch("/api/scenarios?limit=50", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch scenarios");
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/scenarios/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scenarios"] });
      toast({
        title: "Senaryo Silindi",
        description: "Senaryo başarıyla kaldırıldı.",
      });
    },
    onError: (error) => {
      toast({
        title: "Silme Hatası",
        description: error.message || "Senaryo silinirken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });

  const scenarios = scenariosData?.scenarios || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPreview = (content: string) => {
    const plainText = content.replace(/##.*?\n/g, '').replace(/\n+/g, ' ');
    return plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText;
  };

  const filteredScenarios = scenarios.filter((scenario: Scenario) => {
    const matchesSearch = scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scenario.question.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "popular") return matchesSearch && scenario.likes > 0;
    if (selectedTab === "recent") return matchesSearch;
    
    return matchesSearch;
  });

  const tabs = [
    { id: "all", label: "Tüm Senaryolar", count: scenarios.length },
    { id: "popular", label: "Popüler", count: scenarios.filter((s: Scenario) => s.likes > 0).length },
    { id: "recent", label: "Son Eklenen", count: scenarios.filter((s: Scenario) => {
      const now = new Date();
      const created = new Date(s.createdAt);
      const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    }).length },
  ];

  const handleShare = async (scenario: Scenario) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/scenario/${scenario.id}`);
      toast({
        title: "Link Kopyalandı",
        description: "Senaryo bağlantısı panoya kopyalandı.",
      });
    } catch (error) {
      toast({
        title: "Kopyalama Hatası",
        description: "Link kopyalanırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 gradient-text">Senaryolarım</h1>
              <p className="text-gray-300">Oluşturduğunuz alternatif evren senaryolarını yönetin</p>
            </div>
            <Button className="bg-primary hover:bg-primary/80 mt-4 md:mt-0">
              <Plus className="mr-2" size={16} />
              Yeni Senaryo Oluştur
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="glass-effect rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Senaryolarınızda ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={selectedTab === tab.id ? "default" : "ghost"}
                    onClick={() => setSelectedTab(tab.id)}
                    className={selectedTab === tab.id ? "bg-primary" : "text-gray-300 hover:text-white"}
                  >
                    {tab.label}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {tab.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Scenarios Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-effect border-white/20 animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-600 rounded mb-4"></div>
                    <div className="h-4 bg-gray-600 rounded mb-3"></div>
                    <div className="h-16 bg-gray-600 rounded mb-4"></div>
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
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-300">
                {searchQuery ? "Arama sonucu bulunamadı" : "Henüz senaryo oluşturmadınız"}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery ? "Farklı anahtar kelimeler deneyin" : "İlk alternatif evren senaryonuzu oluşturun"}
              </p>
              <Button className="bg-primary hover:bg-primary/80">
                <Plus className="mr-2" size={16} />
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
                    className="scenario-card glass-effect border-white/20 hover:border-white/40 transition-all group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`${config.gradient} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                          <span className="mr-1">{config.icon}</span>
                          {config.name}
                        </span>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-white/10 hover:bg-white/20"
                            onClick={() => handleShare(scenario)}
                          >
                            <Share2 size={12} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-white/10 hover:bg-white/20"
                          >
                            <Edit size={12} />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 bg-red-500/20 hover:bg-red-500/30 text-red-400"
                              >
                                <Trash2 size={12} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Senaryoyu Sil</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bu senaryoyu kalıcı olarak silmek istediğinizden emin misiniz? 
                                  Bu işlem geri alınamaz.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>İptal</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMutation.mutate(scenario.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Sil
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold mb-3 text-white line-clamp-2 group-hover:text-primary transition-colors">
                        {scenario.title}
                      </h3>
                      
                      <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                        {getPreview(scenario.content)}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <span className="flex items-center">
                          <Eye size={12} className="mr-1" />
                          {scenario.views}
                        </span>
                        <span className="flex items-center">
                          <Heart size={12} className="mr-1" />
                          {scenario.likes}
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatDate(scenario.createdAt.toString())}
                        </span>
                      </div>

                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        Detayları Görüntüle
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Stats Summary */}
          {scenarios.length > 0 && (
            <div className="mt-12 glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">İstatistikler</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{scenarios.length}</div>
                  <div className="text-sm text-gray-400">Toplam Senaryo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {scenarios.reduce((sum: number, s: Scenario) => sum + s.views, 0)}
                  </div>
                  <div className="text-sm text-gray-400">Toplam Görüntüleme</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    {scenarios.reduce((sum: number, s: Scenario) => sum + s.likes, 0)}
                  </div>
                  <div className="text-sm text-gray-400">Toplam Beğeni</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(scenarios.reduce((sum: number, s: Scenario) => sum + s.views, 0) / scenarios.length) || 0}
                  </div>
                  <div className="text-sm text-gray-400">Ortalama Görüntüleme</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}