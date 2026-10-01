
const banners = [
  {
    id:0,
    src: "/screenshot 2026-09-10 at 1.47.33 PM.png",
    alt: "Summer sale banner",
  },
  {
    id:1,
    src: "/Screenshot 2026-09-10 at 1.47.43 PM.png",
    alt: "New arrivals banner",
  },
  {
    id:2,
    src: "/Screenshot 2026-09-10 at 1.47.54 PM.png",
    alt: "Free shipping banner",
  },
];

export default function About() {
  return (
    <section className="py-6 sm:py-10">
      <div className="container mx-auto grid grid-cols-1 gap-[55px] px-3 sm:grid-cols-2 sm:gap-5 sm:px-4 lg:grid-cols-3 lg:px-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="group overflow-hidden rounded-2xl shadow-sm ring-1 ring-gray-100"
          >
            <img
              src={banner.src}
              alt={banner.alt}
              loading="lazy"
              className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

