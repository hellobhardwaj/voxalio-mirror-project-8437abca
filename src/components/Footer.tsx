const footerLinks = {
  Product: ["Features", "Pricing", "Use Cases", "Integrations", "API"],
  Company: ["About Us", "Careers", "Blog", "Press", "Contact"],
  Resources: ["Documentation", "Help Center", "Tutorials", "Changelog", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "AI Disclosure", "GDPR"],
};

const Footer = () => (
  <footer className="vox-section-dark py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="text-lg font-bold">Voxalio<span className="vox-gradient-text">.ai</span></span>
          <p className="mt-3 text-sm opacity-50">AI Calls Made Easy</p>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-semibold text-sm mb-3">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm opacity-50 hover:opacity-80 transition-opacity">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-40">© 2026 Voxalio. All rights reserved.</p>
        <p className="text-xs opacity-30">AI Disclosure: "Hello, I am an AI assistant for Voxalio."</p>
      </div>
    </div>
  </footer>
);

export default Footer;
