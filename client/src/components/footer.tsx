import { Infinity } from "lucide-react";
import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";

export default function Footer() {
  const productLinks = [
    { label: "Features", href: "#" },
    { label: "API", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Changelog", href: "#" },
  ];

  const supportLinks = [
    { label: "Documentation", href: "#" },
    { label: "Community", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
  ];

  const socialLinks = [
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaDiscord, href: "#", label: "Discord" },
    { icon: FaGithub, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="px-4 py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Infinity className="text-white" size={16} />
              </div>
              <span className="text-lg font-bold gradient-text">What If GPT</span>
            </div>
            <p className="text-gray-300 mb-4">
              Explore infinite alternative universes with AI-powered scenario generation. 
              Every question opens a new reality.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 What If GPT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
