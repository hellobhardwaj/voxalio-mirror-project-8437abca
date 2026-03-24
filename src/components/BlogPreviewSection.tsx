import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { getRecentPosts } from "@/lib/blog-posts";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const BlogPreviewSection = () => {
  const { lang } = useLanguage();
  const recentPosts = getRecentPosts(3);

  return (
    <section id="blog" className="relative py-20 md:py-28" style={{ background: "var(--bg-dark)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{
              background: "rgba(37,99,235,0.08)",
              color: "var(--blue)",
              border: "1px solid rgba(37,99,235,0.18)",
            }}
          >
            {lang === "de" ? "Blog" : "Blog"}
          </span>
          <h2
            className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {lang === "de"
              ? "Alles über KI-Sprachagenten für Deutschland"
              : "Learn About AI Voice Agents for Germany"}
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {lang === "de"
              ? "Leitfäden, Vergleiche und Anwendungsfälle für deutsche Unternehmen."
              : "Guides, comparisons and use cases for German businesses exploring AI phone automation."}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {recentPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`} className="block h-full group">
                <SpotlightCard
                  className="h-full rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {/* Category badge */}
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

                  {/* Title */}
                  <h3
                    className="font-display font-bold text-lg md:text-xl mb-3 leading-snug group-hover:text-[var(--blue)] transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)" }}>
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min read
                      </span>
                    </div>
                  </div>

                  {/* Read link */}
                  <div className="mt-4 pt-4 border-t flex items-center gap-1.5 text-sm font-bold group-hover:gap-3 transition-all" style={{ borderColor: "var(--border-subtle)", color: "var(--blue)" }}>
                    {lang === "de" ? "Artikel lesen" : "Read Article"} <ArrowRight className="w-4 h-4" />
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
            style={{
              color: "var(--blue)",
              border: "2px solid rgba(37,99,235,0.3)",
              background: "rgba(37,99,235,0.04)",
            }}
          >
            {lang === "de" ? "Alle Artikel anzeigen" : "View all articles"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
