import { scenarios, type Scenario, type InsertScenario } from "@shared/schema";

export interface IStorage {
  getScenario(id: number): Promise<Scenario | undefined>;
  getAllScenarios(limit?: number, offset?: number): Promise<Scenario[]>;
  createScenario(scenario: InsertScenario): Promise<Scenario>;
  incrementViews(id: number): Promise<void>;
  incrementLikes(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private scenarios: Map<number, Scenario>;
  private currentId: number;

  constructor() {
    this.scenarios = new Map();
    this.currentId = 1;
    
    // Add sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleScenarios = [
      {
        title: "Ya İnsanlar Hiç Tarım Geliştirmeseydi?",
        question: "Ya insanlar hiçbir zaman tarımı keşfetmeseydi ve hep avcı-toplayıcı olarak kalsaydı?",
        category: "historical" as const,
        content: `İnsanlığın tarımı hiç keşfetmediği alternatif bir evrende, dünyamız bugünkünden tamamen farklı olurdu.

## Toplumsal Yapı

Küçük, göçebe topluluklar halinde yaşayan insanlar, doğal kaynakların bolluğuna göre sürekli hareket halinde olurdu. Büyük şehirler ve kalıcı yerleşimler hiç var olmazdı. Topluluklar 20-50 kişilik gruplar halinde organize olurdu ve liderlik rotasyonel olurdu.

## Teknolojik Gelişim

Tarım olmadan nüfus artışı sınırlı kalacağından, teknolojik ilerleme çok yavaş olurdu. Metal işçiliği ve karmaşık araçlar gelişmeyebilirdi. Ancak doğal malzemelerle çok sofistike araçlar üretme konusunda uzmanlaşırlardı.

## Çevre ve Doğa

Doğal ekosistemler bozulmamış kalırdı. Mega fauna (dev hayvanlar) hala yaşar olabilirdi. İklim değişikliği insan faktörü olmadan çok daha yavaş gerçekleşirdi. Biyoçeşitlilik bugünkünden çok daha zengin olurdu.`,
        views: 156,
        likes: 23
      },
      {
        title: "Ya Gravitasyon %50 Daha Zayıf Olsaydı?",
        question: "Ya Dünya'nın gravitasyonu bugünkünün yarısı kadar güçlü olsaydı?",
        category: "technological" as const,
        content: `Gravitasyonun yarı güçte olduğu bir dünyada, yaşam ve teknoloji bambaşka şekillerde evrimleşirdi.

## Biyolojik Adaptasyonlar

Canlılar çok daha uzun boylu ve ince yapılı olurdu. İnsan boyu ortalama 3-4 metre olabilirdi. Kemik yoğunluğu daha az, kas sistemi farklı gelişirdi. Uçabilen hayvanlar çok daha büyük olurdu ve belki insanlar da doğal olarak uçma kabiliyeti geliştirirdi.

## Mimari ve Şehircilik

Binalar çok daha yüksek inşa edilebilirdi. 100 katlı binalar normal olurdu. Şehirler dikey olarak gelişirdi. Köprüler ve asma yapılar çok daha uzun mesafeleri kapsayabilirdi.

## Ulaşım ve Uzay

Uzaya çıkmak çok daha kolay olurdu. Roketler daha az yakıt kullanırdi. Mars'a seyahat bugünkü Ay'a seyahat kadar kolay olabilirdi. Uçan araçlar daha yaygın ve pratik olurdu.`,
        views: 234,
        likes: 41
      },
      {
        title: "Ya Para Hiç İcat Edilmeseydi?",
        question: "Ya insanlık hiçbir zaman para kavramını geliştirmeseydi?",
        category: "economic" as const,
        content: `Paranın hiç var olmadığı bir dünyada, ekonomi ve sosyal yapılar tamamen farklı işleyebilirdi.

## Takas Sistemleri

Gelişmiş takas sistemleri kurulurdu. Dijital kredi sistemleri, hizmet saatleri ve kaynak paylaşım ağları gelişirdi. Topluluklar karşılıklı yardımlaşma prensipleriyle organize olurdu.

## Sosyal Eşitlik

Biriken sermaye olmadığından, zenginlik farkları çok daha az olurdu. Güç, bilgi ve beceriye dayalı olurdu, mülkiyete değil. Toplumsal statü farklı kriterlerle belirlenir, materyal zenginlik önemli olmazdı.

## Teknolojik İlerleme

Kar güdüsü olmadan teknoloji, ihtiyaç ve merak odaklı gelişirdi. Açık kaynak mantığı dominant olurdu. İnovasyon topluluk faydası için yapılır, bireysel zenginleşme için değil.`,
        views: 89,
        likes: 17
      }
    ];

    sampleScenarios.forEach(scenario => {
      const id = this.currentId++;
      const fullScenario: Scenario = {
        ...scenario,
        id,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last week
        views: scenario.views,
        likes: scenario.likes,
      };
      this.scenarios.set(id, fullScenario);
    });
  }

  async getScenario(id: number): Promise<Scenario | undefined> {
    return this.scenarios.get(id);
  }

  async getAllScenarios(limit = 10, offset = 0): Promise<Scenario[]> {
    const allScenarios = Array.from(this.scenarios.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return allScenarios.slice(offset, offset + limit);
  }

  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const id = this.currentId++;
    const scenario: Scenario = {
      ...insertScenario,
      id,
      createdAt: new Date(),
      views: 0,
      likes: 0,
    };
    
    this.scenarios.set(id, scenario);
    return scenario;
  }

  async incrementViews(id: number): Promise<void> {
    const scenario = this.scenarios.get(id);
    if (scenario) {
      scenario.views += 1;
      this.scenarios.set(id, scenario);
    }
  }

  async incrementLikes(id: number): Promise<void> {
    const scenario = this.scenarios.get(id);
    if (scenario) {
      scenario.likes += 1;
      this.scenarios.set(id, scenario);
    }
  }
}

export const storage = new MemStorage();
