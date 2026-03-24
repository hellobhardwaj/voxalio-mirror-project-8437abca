import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPost, getRelatedPosts } from "@/lib/blog-posts";
import { ArrowRight, Clock, Calendar, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import voxalioIcon from "@/assets/voxalio-icon.png";

/* Simple markdown-to-JSX renderer */
function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading h2
    if (line.startsWith("## ")) {
      const text = line.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      elements.push(
        <h2 key={key++} id={id} className="font-display font-bold text-2xl md:text-3xl mt-10 mb-4 scroll-mt-28" style={{ color: "var(--text-primary)" }}>
          {text}
        </h2>
      );
      i++;
      continue;
    }

    // Heading h3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="font-display font-semibold text-xl mt-8 mb-3" style={{ color: "var(--text-primary)" }}>
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="border-l-4 pl-5 py-3 my-6 italic rounded-r-lg" style={{ borderColor: "var(--blue)", background: "rgba(37,99,235,0.04)", color: "var(--text-secondary)" }}>
          {renderInline(quoteLines.join(" "))}
        </blockquote>
      );
      continue;
    }

    // Table
    if (line.includes("|") && i + 1 < lines.length && lines[i + 1]?.includes("---")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0].split("|").map(s => s.trim()).filter(Boolean);
      const rows = tableLines.slice(2).map(r => r.split("|").map(s => s.trim()).filter(Boolean));
      elements.push(
        <div key={key++} className="overflow-x-auto my-6 rounded-xl" style={{ border: "1px solid var(--border-subtle)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(37,99,235,0.04)" }}>
                {headers.map((h, hi) => (
                  <th key={hi} className="px-4 py-3 text-left font-bold" style={{ color: "var(--text-primary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ borderTop: "1px solid var(--border-subtle)", background: ri % 2 === 1 ? "rgba(37,99,235,0.02)" : "transparent" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="ml-6 mb-4 space-y-2 list-disc" style={{ color: "var(--text-secondary)" }}>
          {items.map((item, ii) => <li key={ii} className="leading-relaxed">{renderInline(item)}</li>)}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="ml-6 mb-4 space-y-2 list-decimal" style={{ color: "var(--text-secondary)" }}>
          {items.map((item, ii) => <li key={ii} className="leading-relaxed">{renderInline(item)}</li>)}
        </ol>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  // Convert markdown bold, italic, links to JSX
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let k = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Link
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

    // Find earliest match
    const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
    const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity;

    if (boldIdx === Infinity && linkIdx === Infinity) {
      // Italic
      const italicParts = remaining.split(/\*(.+?)\*/);
      if (italicParts.length > 1) {
        for (let j = 0; j < italicParts.length; j++) {
          if (j % 2 === 1) {
            parts.push(<em key={k++}>{italicParts[j]}</em>);
          } else if (italicParts[j]) {
            parts.push(italicParts[j]);
          }
        }
      } else {
        parts.push(remaining);
      }
      break;
    }

    if (boldIdx <= linkIdx) {
      if (boldIdx > 0) parts.push(remaining.slice(0, boldIdx));
      parts.push(<strong key={k++} className="font-semibold" style={{ color: "var(--text-primary)" }}>{boldMatch![1]}</strong>);
      remaining = remaining.slice(boldIdx + boldMatch![0].length);
    } else {
      if (linkIdx > 0) parts.push(remaining.slice(0, linkIdx));
      const href = linkMatch![2];
      const isInternal = href.startsWith("/");
      if (isInternal) {
        parts.push(<Link key={k++} to={href} className="font-semibold underline hover:opacity-80 transition-opacity" style={{ color: "var(--blue)" }}>{linkMatch![1]}</Link>);
      } else {
        parts.push(<a key={k++} href={href} className="font-semibold underline hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>{linkMatch![1]}</a>);
      }
      remaining = remaining.slice(linkIdx + linkMatch![0].length);
    }
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const post = slug ? getBlogPost(slug) : undefined;
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Track active heading for TOC
  useEffect(() => {
    if (!post) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    const headingEls = document.querySelectorAll("h2[id]");
    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(post);
  const contentParts = post.content.split("\n");
  const midIdx = Math.floor(contentParts.length * 0.5);
  const firstHalf = contentParts.slice(0, midIdx).join("\n");
  const secondHalf = contentParts.slice(midIdx).join("\n");

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark)" }}>
      <Helmet>
        <title>{post.title} | Voxalio Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <link rel="canonical" href={`https://voxalio.de/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={`https://voxalio.de/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
      </Helmet>
      <Navbar />

      <article className="pt-28 md:pt-36 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:text-[var(--blue)] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/blog" className="hover:text-[var(--blue)] transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "var(--text-secondary)" }} className="truncate max-w-[200px] md:max-w-none">{post.title}</span>
          </nav>

          <div className="flex gap-12">
            {/* Main content */}
            <motion.div
              className="flex-1 min-w-0 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category + meta */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    background: "rgba(37,99,235,0.08)",
                    color: "var(--blue)",
                    border: "1px solid rgba(37,99,235,0.15)",
                  }}
                >
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                  <Clock className="w-3 h-3" /> {post.readTime} min read
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                  <Calendar className="w-3 h-3" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-display font-extrabold text-3xl md:text-4xl lg:text-[42px] leading-tight mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-3 mb-10 pb-8" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <img src={voxalioIcon} alt="Voxalio" className="w-9 h-9 rounded-lg object-contain" />
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Voxalio Team</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Updated {new Date(post.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Article body — first half */}
              <div className="prose-custom">{renderMarkdown(firstHalf)}</div>

              {/* Mid-article CTA */}
              <div
                className="my-10 p-6 md:p-8 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(37,99,235,0.02))",
                  border: "2px solid rgba(37,99,235,0.15)",
                }}
              >
                <p className="font-display font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                  {lang === "de"
                    ? "Bereit, Ihre Anrufe zu automatisieren?"
                    : "Ready to automate your calls?"}
                </p>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                  {lang === "de"
                    ? "Buchen Sie eine kostenlose Demo auf voxalio.ai — Lena ruft Sie in 60 Sekunden an."
                    : "Book a free demo at voxalio.ai — Lena will call you in 60 seconds."}
                </p>
                <Link
                  to="/#demo-call"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {lang === "de" ? "Kostenlose Demo" : "Get Free Demo"} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Article body — second half */}
              <div className="prose-custom">{renderMarkdown(secondHalf)}</div>
            </motion.div>

            {/* Sticky TOC — desktop only */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                  {lang === "de" ? "Inhaltsverzeichnis" : "Table of Contents"}
                </p>
                <nav className="flex flex-col gap-2">
                  {post.headings.map((heading) => {
                    const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-sm font-semibold py-1 pl-3 border-l-2 transition-all hover:text-[var(--blue)]"
                        style={{
                          color: activeHeading === id ? "var(--blue)" : "var(--text-muted)",
                          borderColor: activeHeading === id ? "var(--blue)" : "transparent",
                        }}
                      >
                        {heading}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 px-6 md:px-10" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display font-bold text-2xl mb-8" style={{ color: "var(--text-primary)" }}>
              {lang === "de" ? "Verwandte Artikel" : "Related Articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link key={rp.slug} to={`/blog/${rp.slug}`} className="block group">
                  <SpotlightCard
                    className="h-full rounded-2xl p-6 flex flex-col transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                  >
                    <span
                      className="inline-block self-start px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3"
                      style={{ background: "rgba(37,99,235,0.08)", color: "var(--blue)", border: "1px solid rgba(37,99,235,0.15)" }}
                    >
                      {rp.category}
                    </span>
                    <h3 className="font-display font-bold text-base mb-2 group-hover:text-[var(--blue)] transition-colors" style={{ color: "var(--text-primary)" }}>
                      {rp.title}
                    </h3>
                    <p className="text-xs flex-1" style={{ color: "var(--text-secondary)" }}>{rp.excerpt}</p>
                    <div className="mt-3 pt-3 border-t flex items-center gap-1 text-sm font-bold" style={{ borderColor: "var(--border-subtle)", color: "var(--blue)" }}>
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 text-center px-6" style={{ background: "rgba(37,99,235,0.03)" }}>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-4" style={{ color: "var(--text-primary)" }}>
          {lang === "de" ? "Starten Sie Ihren KI-Sprachagenten noch heute" : "Start your AI voice agent today"}
        </h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
          style={{ background: "var(--gradient-primary)" }}
        >
          voxalio.ai <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            image: `https://voxalio.ai/images/blog/${post.slug}-og.jpg`,
            author: { "@type": "Organization", name: "Voxalio", url: "https://voxalio.ai" },
            publisher: {
              "@type": "Organization",
              name: "Voxalio",
              logo: { "@type": "ImageObject", url: "https://voxalio.ai/images/logo.png" },
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://voxalio.ai/blog/${post.slug}` },
            keywords: post.keywords.join(", "),
            inLanguage: post.lang === "en" ? "en-US" : "de-DE",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://voxalio.ai" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://voxalio.ai/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://voxalio.ai/blog/${post.slug}` },
            ],
          }),
        }}
      />

      <Footer />
    </div>
  );
};

export default BlogPost;
