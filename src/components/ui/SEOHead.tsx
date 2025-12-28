import { useEffect } from "react";
import { SITE_TITLE } from "../../content/meta";

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export default function SEOHead({ 
  title, 
  description = "A journey shaped by identity, driven by bridge-building, and expressed through making." 
}: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_TITLE}` : SITE_TITLE;
    
    document.title = fullTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);
    
    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", fullTitle);
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute("content", description);
  }, [title, description]);

  return null;
}

