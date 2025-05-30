import { db } from "./db";
import { scenarios } from "@shared/schema";

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
  },
  {
    title: "Ya İnternet Hiç İcat Edilmeseydi?",
    question: "Ya World Wide Web ve internet hiçbir zaman geliştirilmeseydi?",
    category: "technological" as const,
    content: `İnternetin olmadığı alternatif 2024'te dünya nasıl görünürdü?

## İletişim ve Medya

Televizyon, radyo ve gazete hala ana haber kaynakları olurdu. Telefon hatları ve faks sistemleri gelişmeye devam ederdi. Video konferans sistemleri kapalı ağlarda çalışırdi. Sosyal medya yerine fiziksel buluşma noktaları önemli olurdu.

## İş ve Ticaret

Küresel ticaret çok daha yavaş ve maliyetli olurdu. Yerel ekonomiler güçlü kalırdı. Uzaktan çalışma mümkün olmazdı. E-ticaret yerine katalog siparişleri ve mağaza alışverişi dominant olurdu.

## Bilgi ve Eğitim

Kütüphaneler hala bilginin merkezi olurdu. Ansiklopediler ve kitaplar ana bilgi kaynağı olarak kalırdı. Uzaktan eğitim posta ve televizyon üzerinden sınırlı şekilde yapılırdı. Araştırma süreci çok daha uzun sürerdi.`,
    views: 312,
    likes: 67
  },
  {
    title: "Ya Buzul Çağı Hiç Bitmeseydi?",
    question: "Ya son buzul çağı hiç sona ermeseydi ve dünya hala buzlarla kaplı olsaydı?",
    category: "environmental" as const,
    content: `Buzul çağının devam ettiği bir dünyada, insan medeniyeti nasıl gelişirdi?

## İklim ve Coğrafya

Kuzey yarımküre büyük ölçüde buzlarla kaplı olurdu. Deniz seviyesi 120 metre daha alçak olurdu. Büyük kara köprüleri var olurdu. Ekvator bölgeleri bugünkü ılıman kuşak ikliminde olurdu.

## İnsan Yerleşimi

İnsanlar güney bölgelerde ve ekvator çevresinde yoğunlaşırdı. Büyük medeniyetler Afrika, Güney Amerika ve Güneydoğu Asya'da kurulurdu. Kuzey Avrupa ve Kuzey Amerika neredeyse ıssız olurdu.

## Teknolojik Adaptasyon

Isıtma teknolojileri çok gelişkin olurdu. Yer altı şehirleri yaygın olurdu. Buzla ve soğukla başa çıkma teknolojileri temel ihtiyaç olurdu. Tarım sera teknolojilerine bağımlı olurdu.`,
    views: 178,
    likes: 29
  }
];

export async function seedDatabase() {
  try {
    console.log('Seeding database with sample scenarios...');
    
    for (const scenario of sampleScenarios) {
      await db.insert(scenarios).values({
        title: scenario.title,
        question: scenario.question,
        category: scenario.category,
        content: scenario.content
      });
    }
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}