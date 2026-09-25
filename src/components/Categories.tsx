const categories = [
  {
    number: "01",
    name: "Maquillaje",
    image: "/images/categories/maquillaje.webp",
    alt: "Maquillaje Alteza",
  },
  {
    number: "02",
    name: "Skincare",
    image: "/images/categories/skincare.webp",
    alt: "Skincare Alteza",
  },
  {
    number: "03",
    name: "Cuidado capilar",
    image: "/images/categories/haircare.webp",
    alt: "Cuidado capilar Alteza",
  },
  {
    number: "04",
    name: "Accesorios",
    image: "/images/categories/accessories.webp",
    alt: "Accesorios Alteza",
  },
];

export default function Categories() {
  return (
    <section
      className="category-preview"
      id="collections"
    >
      <div className="container">

        <div className="section-heading">

          <p className="section-eyebrow">
            Descubre Alteza
          </p>

          <h2>
            Todo lo que necesitas
            <span>
              para sentirte increíble.
            </span>
          </h2>

        </div>

        <div className="category-grid">

          {categories.map((category) => (
            <a
              key={category.number}
              href={`/tienda?categoria=${encodeURIComponent(
  category.name
)}`}
              className="category-card"
            >
              <img
                src={category.image}
                alt={category.alt}
                className="category-card__image"
              />

              <div className="category-card__overlay" />

              <div className="category-card__content">

                <span>
                  {category.number}
                </span>

                <h3>
                  {category.name}
                </h3>

                <p>
                  Explorar colección →
                </p>

              </div>
            </a>
          ))}

        </div>

      </div>
    </section>
  );
}