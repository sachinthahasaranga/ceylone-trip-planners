import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

async function main() {
  console.log("🌱 Seeding database…");

  // ---- Admin user ----
  const adminEmail = "admin@ceylontripplanners.com";
  const adminPassword = "Admin@123";
  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN", password: hashed },
    create: {
      email: adminEmail,
      name: "Site Admin",
      password: hashed,
      role: "ADMIN",
    },
  });
  console.log(`   ✔ Admin: ${adminEmail} / ${adminPassword}`);

  // ---- Site settings ----
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Ceylon Trip Planners",
      tagline: "Discover the Wonder of Sri Lanka",
      phone: "+94 77 123 4567",
      whatsapp: "94771234567",
      email: "info@ceylontripplanners.com",
      address: "42 Galle Road, Colombo 03, Sri Lanka",
    },
  });

  // ---- Destinations ----
  const destinations = [
    { slug: "sigiriya", name: "Sigiriya Rock Fortress", region: "Cultural Triangle", shortDesc: "The 5th-century sky palace rising 200m above the jungle.", image: img("photo-1588416936097-41850ab3d86d"), highlights: ["Lion's Paw entrance", "Ancient frescoes", "Water gardens"], featured: true },
    { slug: "ella", name: "Ella & Hill Country", region: "Central Highlands", shortDesc: "Misty tea plantations, the Nine Arch Bridge and scenic train rides.", image: img("photo-1566296314736-6eaac1ca0cb9"), highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Tea estates"], featured: true },
    { slug: "kandy", name: "Kandy", region: "Central Province", shortDesc: "The last royal capital, home to the sacred Temple of the Tooth.", image: img("photo-1552465011-b4e21bf6e79a"), highlights: ["Temple of the Tooth", "Kandy Lake", "Cultural dance"], featured: true },
    { slug: "galle", name: "Galle Fort", region: "Southern Coast", shortDesc: "A perfectly preserved Dutch colonial fort with ocean views.", image: img("photo-1524492412937-b28074a5d7da"), highlights: ["Dutch ramparts", "Lighthouse", "Boutique streets"], featured: true },
    { slug: "yala", name: "Yala National Park", region: "Southeast", shortDesc: "Sri Lanka's premier safari destination for leopards.", image: img("photo-1549366021-9f761d450615"), highlights: ["Leopard safari", "Elephants", "Coastal lagoons"], featured: false },
    { slug: "mirissa", name: "Mirissa Beach", region: "Southern Coast", shortDesc: "Golden sands and the best blue-whale watching in the country.", image: img("photo-1507525428034-b723cf961d3e"), highlights: ["Whale watching", "Coconut Tree Hill", "Surf & sunsets"], featured: false },
  ];

  for (const d of destinations) {
    const html = `<p>${d.shortDesc}</p><p>A visit here is a highlight of any Sri Lanka itinerary — rich in history, scenery and photo opportunities. Our local guides know exactly when to arrive to beat the crowds and where to find the most memorable views.</p><h3>What to expect</h3><ul>${d.highlights
      .map((h) => `<li>${h}</li>`)
      .join("")}</ul>`;
    await prisma.destination.upsert({
      where: { slug: d.slug },
      update: { description: html },
      create: {
        slug: d.slug,
        name: d.name,
        region: d.region,
        shortDesc: d.shortDesc,
        description: html,
        coverImage: d.image,
        gallery: [d.image],
        highlights: d.highlights,
        featured: d.featured,
        published: true,
      },
    });
  }
  console.log(`   ✔ ${destinations.length} destinations`);

  // ---- Tours ----
  const tours = [
    { slug: "essence-of-sri-lanka-7d", title: "Essence of Sri Lanka", summary: "A 7-day journey through the Cultural Triangle, hill country and Kandy.", image: img("photo-1566296314736-6eaac1ca0cb9"), price: 890, days: 7, nights: 6, difficulty: "Easy", featured: true },
    { slug: "wildlife-safari-adventure-5d", title: "Wildlife Safari Adventure", summary: "5 days tracking leopards and elephants across Yala and Udawalawe.", image: img("photo-1549366021-9f761d450615"), price: 720, days: 5, nights: 4, difficulty: "Moderate", featured: true },
    { slug: "beaches-and-whales-6d", title: "Southern Beaches & Whales", summary: "Relax along the south coast with whale watching and Galle Fort.", image: img("photo-1507525428034-b723cf961d3e"), price: 640, days: 6, nights: 5, difficulty: "Easy", featured: true },
    { slug: "hill-country-tea-trails-4d", title: "Hill Country Tea Trails", summary: "4 days among misty peaks, tea factories and Horton Plains.", image: img("photo-1602216056096-3b40cc0c9944"), price: 480, days: 4, nights: 3, difficulty: "Moderate", featured: false },
    { slug: "grand-tour-of-ceylon-12d", title: "Grand Tour of Ceylon", summary: "The complete 12-day island loop — culture, wildlife, mountains, beaches.", image: img("photo-1588416936097-41850ab3d86d"), price: 1650, days: 12, nights: 11, difficulty: "Moderate", featured: true },
  ];

  for (const t of tours) {
    const html = `<p>${t.summary}</p><p>This ${t.days}-day journey is designed to immerse you in the very best of Sri Lanka. Travel in comfort with a private guide, stay in characterful boutique properties and experience a seamless blend of iconic sights and authentic local moments — all at a relaxed, unhurried pace.</p><h3>Why you'll love it</h3><ul><li>Handpicked boutique accommodation</li><li>Private chauffeur guide throughout</li><li>A balance of must-see highlights and hidden gems</li></ul>`;
    await prisma.tourPackage.upsert({
      where: { slug: t.slug },
      update: { description: html },
      create: {
        slug: t.slug,
        title: t.title,
        summary: t.summary,
        description: html,
        coverImage: t.image,
        gallery: [t.image],
        price: t.price,
        durationDays: t.days,
        durationNights: t.nights,
        difficulty: t.difficulty,
        groupSize: "Private",
        inclusions: ["Private A/C vehicle & driver", "Boutique accommodation", "Daily breakfast", "All entrance fees"],
        exclusions: ["International flights", "Visa fees", "Travel insurance", "Personal expenses"],
        featured: t.featured,
        published: true,
      },
    });
  }
  console.log(`   ✔ ${tours.length} tours`);

  // ---- Blog ----
  const posts = [
    { slug: "best-time-to-visit-sri-lanka", title: "The Best Time to Visit Sri Lanka", excerpt: "Two monsoons, two coasts — how to always find sunshine.", image: img("photo-1546708973-b339540b5162"), author: "Nadeesha Perera", category: "Travel Tips" },
    { slug: "riding-the-kandy-to-ella-train", title: "Riding the Kandy to Ella Train", excerpt: "Everything you need to know about the world's prettiest journey.", image: img("photo-1602216056096-3b40cc0c9944"), author: "Ruwan Silva", category: "Guides" },
    { slug: "sri-lankan-food-you-must-try", title: "10 Sri Lankan Dishes You Must Try", excerpt: "From hoppers to kottu — a tour of the island's flavours.", image: img("photo-1631292784640-2b24be784d5d"), author: "Ishara Fernando", category: "Food & Culture" },
  ];

  for (const p of posts) {
    const html = `<p>Sri Lanka packs extraordinary variety into a compact island — ancient kingdoms, mist-wrapped tea country, wildlife-rich national parks and a coastline of golden beaches.</p><h2>Planning your journey</h2><p>The key to a great Sri Lankan holiday is pacing. Distances look small on a map, but winding mountain roads mean travel takes longer than expected. We recommend basing yourself in a region for two or three nights rather than moving every day.</p><blockquote>Travel slowly, eat everything, and always say yes to a cup of Ceylon tea.</blockquote><h3>Our top tips</h3><ul><li>Pack light, breathable clothing and a rain layer</li><li>Carry small cash for local markets and tuk-tuks</li><li>Book the scenic train seats well in advance</li></ul><p>Ready to experience it for yourself? Our team can craft a personalised itinerary around exactly the experiences you care about most.</p>`;
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: { content: html },
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: html,
        coverImage: p.image,
        author: p.author,
        tags: [p.category],
        readMinutes: 6,
        featured: true,
        published: true,
      },
    });
  }
  console.log(`   ✔ ${posts.length} blog posts`);

  // ---- FAQs ----
  const faqs = [
    { q: "Do I need a visa to visit Sri Lanka?", a: "Most nationalities need an ETA, which is quick to apply for online." },
    { q: "When is the best time to visit?", a: "Sri Lanka is a year-round destination thanks to two monsoon seasons." },
    { q: "Are your tours private or group?", a: "All tours are private by default with a dedicated guide and vehicle." },
  ];
  if ((await prisma.faq.count()) === 0) {
    for (let i = 0; i < faqs.length; i++) {
      await prisma.faq.create({ data: { question: faqs[i].q, answer: faqs[i].a, order: i } });
    }
  }
  console.log(`   ✔ FAQs`);

  // ---- Reviews / testimonials ----
  const reviews = [
    { authorName: "Emma Thompson", location: "United Kingdom", rating: 5, content: "The most seamless trip we've ever taken. Every detail was handled and our guide felt like family by the end. Sri Lanka stole our hearts." },
    { authorName: "David Müller", location: "Germany", rating: 5, content: "From leopards in Yala to the train through the hills — Ceylon Trip Planners crafted a perfect balance of adventure and relaxation." },
    { authorName: "Aiko Tanaka", location: "Japan", rating: 5, content: "Beautifully organised and incredibly good value. The boutique hotels they chose were stunning. I recommend them to everyone." },
    { authorName: "Sophie Laurent", location: "France", rating: 5, content: "An unforgettable honeymoon. The private beach dinner they arranged in Mirissa was pure magic. Thank you so much!" },
  ];
  if ((await prisma.review.count()) === 0) {
    await prisma.review.createMany({
      data: reviews.map((r) => ({ ...r, approved: true, featured: true })),
    });
  }
  console.log(`   ✔ ${reviews.length} reviews`);

  // ---- Gallery ----
  const galleryImages = [
    { url: img("photo-1588416936097-41850ab3d86d", 1000), caption: "Sigiriya Rock Fortress", category: "Culture" },
    { url: img("photo-1566296314736-6eaac1ca0cb9", 1000), caption: "Hill country tea estates", category: "Nature" },
    { url: img("photo-1507525428034-b723cf961d3e", 1000), caption: "Southern beaches", category: "Beaches" },
    { url: img("photo-1549366021-9f761d450615", 1000), caption: "Yala safari", category: "Wildlife" },
    { url: img("photo-1602216056096-3b40cc0c9944", 1000), caption: "Tea trails", category: "Nature" },
    { url: img("photo-1546708973-b339540b5162", 1000), caption: "Coastal sunsets", category: "Beaches" },
    { url: img("photo-1512100356356-de1b84283e18", 1000), caption: "Luxury escapes", category: "Luxury" },
    { url: img("photo-1631292784640-2b24be784d5d", 1000), caption: "Sri Lankan cuisine", category: "Culture" },
  ];
  if ((await prisma.galleryImage.count()) === 0) {
    await prisma.galleryImage.createMany({
      data: galleryImages.map((g, i) => ({ ...g, order: i })),
    });
  }
  console.log(`   ✔ ${galleryImages.length} gallery images`);

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
