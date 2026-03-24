import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, blogCategories, getPostsByCategory } from "@/lib/blog-posts";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";

const Blog = () => {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const filteredPosts = getPostsByCategory(activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark)" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            {lang === "de"
              ? "KI-Sprachagenten Ratgeber für Deutschland"
              : "AI Voice Agent Resources for Germany"}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {lang === "de"
              ? "Leitfäden, Vergleiche und Anwendungsfälle für deutsche Unternehmen, die KI-Telefonautomatisierung erkunden."
              : "Guides, comparisons and use cases for German businesses exploring AI phone automation."}
          </p>
        </div>
      </section>

      {/* Filter pills */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200"
              style={{
                background: activeCategory === cat ? "var(--blue)" : "rgba(37,99,235,0.06)",
                color: activeCategory === cat ? "#fff" : "var(--text-secondary)",
                border: `1px solid ${activeCategory === cat ? "var(--blue)" : "rgba(37,99,235,0.12)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link to={`/blog/${post.slug}`} className="block h-full group">
                <SpotlightCard
                  className="h-full rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <span
                    className="inline-block self-start px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4"
                    style={{
                      background: "rgba(37,99,235,0.08)",
                      color: "var(--blue)",
                      border: "1px solid rgba(37,99,235,0.15)",
                    }}
                  >
                    {post.category}
                  </span>

                  <h3
                    className="font-display font-bold text-lg md:text-xl mb-3 leading-snug group-hover:text-[var(--blue)] transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)" }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold mb-4" style={{ color: "var(--text-muted)" }}>
                    <span>Voxalio Team</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>

                  <div className="pt-4 border-t flex items-center gap-1.5 text-sm font-bold group-hover:gap-3 transition-all" style={{ borderColor: "var(--border-subtle)", color: "var(--blue)" }}>
                    {lang === "de" ? "Artikel lesen" : "Read Article"} <ArrowRight className="w-4 h-4" />
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Voxalio AI Voice Agent Blog",
            description: "Expert guides on AI voice agents for German businesses",
            url: "https://voxalio.ai/blog",
            publisher: {
              "@type": "Organization",
              name: "Voxalio",
              url: "https://voxalio.ai",
            },
          }),
        }}
      />

      <Footer />
    </div>
  );
};

export default Blog;
