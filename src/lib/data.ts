/**
 * Dummy content used to render the site before the database is seeded.
 * Images are hotlinked from Unsplash (allowed for demo). Replace with
 * Cloudinary URLs + DB records once the admin panel is populated.
 */

export type Destination = {
  slug: string;
  name: string;
  region: string;
  shortDesc: string;
  image: string;
  highlights: string[];
  featured?: boolean;
};

export type Tour = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  price: number;
  durationDays: number;
  durationNights: number;
  category: string;
  difficulty: string;
  rating: number;
  featured?: boolean;
  highlights: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readMinutes: number;
};

export type Testimonial = {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const destinations: Destination[] = [
  {
    slug: "sigiriya",
    name: "Sigiriya Rock Fortress",
    region: "Cultural Triangle",
    shortDesc:
      "The 5th-century sky palace rising 200m above the jungle — a UNESCO World Heritage marvel.",
    image: img("photo-1588416936097-41850ab3d86d"),
    highlights: ["Lion's Paw entrance", "Ancient frescoes", "Water gardens"],
    featured: true,
  },
  {
    slug: "ella",
    name: "Ella & Hill Country",
    region: "Central Highlands",
    shortDesc:
      "Misty tea plantations, the Nine Arch Bridge and scenic train rides through emerald hills.",
    image: img("photo-1566296314736-6eaac1ca0cb9"),
    highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Tea estates"],
    featured: true,
  },
  {
    slug: "kandy",
    name: "Kandy",
    region: "Central Province",
    shortDesc:
      "The last royal capital, home to the sacred Temple of the Tooth beside a serene lake.",
    image: img("photo-1552465011-b4e21bf6e79a"),
    highlights: ["Temple of the Tooth", "Kandy Lake", "Cultural dance"],
    featured: true,
  },
  {
    slug: "galle",
    name: "Galle Fort",
    region: "Southern Coast",
    shortDesc:
      "A perfectly preserved Dutch colonial fort with boutique cafés, ramparts and ocean views.",
    image: img("photo-1524492412937-b28074a5d7da"),
    highlights: ["Dutch ramparts", "Lighthouse", "Boutique streets"],
    featured: true,
  },
  {
    slug: "yala",
    name: "Yala National Park",
    region: "Southeast",
    shortDesc:
      "Sri Lanka's premier safari destination with the world's highest density of leopards.",
    image: img("photo-1549366021-9f761d450615"),
    highlights: ["Leopard safari", "Elephants", "Coastal lagoons"],
  },
  {
    slug: "mirissa",
    name: "Mirissa Beach",
    region: "Southern Coast",
    shortDesc:
      "Golden sands, palm-fringed bays and the best blue-whale watching in the country.",
    image: img("photo-1507525428034-b723cf961d3e"),
    highlights: ["Whale watching", "Coconut Tree Hill", "Surf & sunsets"],
  },
];

export const tours: Tour[] = [
  {
    slug: "essence-of-sri-lanka-7d",
    title: "Essence of Sri Lanka",
    summary:
      "A 7-day journey through the Cultural Triangle, hill country tea estates and Kandy.",
    image: img("photo-1566296314736-6eaac1ca0cb9"),
    price: 890,
    durationDays: 7,
    durationNights: 6,
    category: "Cultural",
    difficulty: "Easy",
    rating: 4.9,
    featured: true,
    highlights: ["Sigiriya climb", "Scenic train to Ella", "Temple of the Tooth"],
  },
  {
    slug: "wildlife-safari-adventure-5d",
    title: "Wildlife Safari Adventure",
    summary:
      "5 days tracking leopards and elephants across Yala, Udawalawe and Wilpattu.",
    image: img("photo-1549366021-9f761d450615"),
    price: 720,
    durationDays: 5,
    durationNights: 4,
    category: "Wildlife",
    difficulty: "Moderate",
    rating: 4.8,
    featured: true,
    highlights: ["Yala leopards", "Elephant herds", "Bird watching"],
  },
  {
    slug: "beaches-and-whales-6d",
    title: "Southern Beaches & Whales",
    summary:
      "Relax along the south coast with whale watching, surf towns and Galle Fort.",
    image: img("photo-1507525428034-b723cf961d3e"),
    price: 640,
    durationDays: 6,
    durationNights: 5,
    category: "Beach",
    difficulty: "Easy",
    rating: 4.7,
    featured: true,
    highlights: ["Mirissa whales", "Galle Fort", "Beach hopping"],
  },
  {
    slug: "hill-country-tea-trails-4d",
    title: "Hill Country Tea Trails",
    summary:
      "4 days among misty peaks, tea factories, Nine Arch Bridge and Horton Plains.",
    image: img("photo-1602216056096-3b40cc0c9944"),
    price: 480,
    durationDays: 4,
    durationNights: 3,
    category: "Nature",
    difficulty: "Moderate",
    rating: 4.9,
    highlights: ["Tea factory tour", "World's End", "Ella train ride"],
  },
  {
    slug: "grand-tour-of-ceylon-12d",
    title: "Grand Tour of Ceylon",
    summary:
      "The complete 12-day island loop — culture, wildlife, mountains and beaches.",
    image: img("photo-1588416936097-41850ab3d86d"),
    price: 1650,
    durationDays: 12,
    durationNights: 11,
    category: "Cultural",
    difficulty: "Moderate",
    rating: 5.0,
    featured: true,
    highlights: ["8 UNESCO sites", "2 safaris", "Beach finale"],
  },
  {
    slug: "honeymoon-escape-8d",
    title: "Romantic Honeymoon Escape",
    summary:
      "8 days of luxury stays, private dinners and the island's most romantic settings.",
    image: img("photo-1512100356356-de1b84283e18"),
    price: 1980,
    durationDays: 8,
    durationNights: 7,
    category: "Luxury",
    difficulty: "Easy",
    rating: 5.0,
    highlights: ["Private villas", "Sunset cruise", "Spa & candlelight"],
  },
];

export const posts: Post[] = [
  {
    slug: "best-time-to-visit-sri-lanka",
    title: "The Best Time to Visit Sri Lanka: A Month-by-Month Guide",
    excerpt:
      "Two monsoons, two coasts — here's how to always find sunshine whenever you travel.",
    image: img("photo-1546708973-b339540b5162"),
    author: "Nadeesha Perera",
    date: "2026-06-12",
    category: "Travel Tips",
    readMinutes: 6,
  },
  {
    slug: "riding-the-kandy-to-ella-train",
    title: "Riding the Kandy to Ella Train: The World's Prettiest Journey",
    excerpt:
      "Everything you need to know about booking, seats and the best photo spots.",
    image: img("photo-1602216056096-3b40cc0c9944"),
    author: "Ruwan Silva",
    date: "2026-05-28",
    category: "Guides",
    readMinutes: 8,
  },
  {
    slug: "sri-lankan-food-you-must-try",
    title: "10 Sri Lankan Dishes You Absolutely Must Try",
    excerpt:
      "From hoppers to kottu — a delicious tour of the island's iconic flavours.",
    image: img("photo-1631292784640-2b24be784d5d"),
    author: "Ishara Fernando",
    date: "2026-05-10",
    category: "Food & Culture",
    readMinutes: 5,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Emma Thompson",
    location: "United Kingdom",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "The most seamless trip we've ever taken. Every detail was handled and our guide felt like family by the end. Sri Lanka stole our hearts.",
  },
  {
    name: "David Müller",
    location: "Germany",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "From leopards in Yala to the train through the hills — Ceylon Trip Planners crafted a perfect balance of adventure and relaxation.",
  },
  {
    name: "Aiko Tanaka",
    location: "Japan",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "Beautifully organised and incredibly good value. The boutique hotels they chose were stunning. I recommend them to everyone.",
  },
];

export const experiences = [
  { name: "Wildlife Safaris", image: img("photo-1549366021-9f761d450615"), count: 12 },
  { name: "Beaches & Coast", image: img("photo-1507525428034-b723cf961d3e"), count: 18 },
  { name: "Culture & Heritage", image: img("photo-1588416936097-41850ab3d86d"), count: 21 },
  { name: "Hill Country", image: img("photo-1566296314736-6eaac1ca0cb9"), count: 15 },
  { name: "Adventure", image: img("photo-1602216056096-3b40cc0c9944"), count: 9 },
  { name: "Luxury & Honeymoon", image: img("photo-1512100356356-de1b84283e18"), count: 7 },
];

export const galleryImages = [
  img("photo-1588416936097-41850ab3d86d", 800),
  img("photo-1566296314736-6eaac1ca0cb9", 800),
  img("photo-1507525428034-b723cf961d3e", 800),
  img("photo-1549366021-9f761d450615", 800),
  img("photo-1602216056096-3b40cc0c9944", 800),
  img("photo-1546708973-b339540b5162", 800),
  img("photo-1512100356356-de1b84283e18", 800),
  img("photo-1631292784640-2b24be784d5d", 800),
];

export const stats = [
  { value: "12+", label: "Years of Experience" },
  { value: "8,500+", label: "Happy Travelers" },
  { value: "50+", label: "Curated Tours" },
  { value: "4.9/5", label: "Average Rating" },
];
