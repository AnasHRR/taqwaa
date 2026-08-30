import { useEffect } from "react";
import {
  type SEOConfig,
  DEFAULT_SEO,
  SITE_URL,
  BRAND_NAME,
  SITE_NAME,
  buildStructuredData,
} from "../utils/seo";

interface SEOHeadProps {
  seo?: Partial<SEOConfig>;
}

function setOrCreateMeta(
  attrName: "name" | "property",
  attrValue: string,
  content: string
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attrName}="${attrValue}"]`
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setOrCreateLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (hreflang) {
      element.setAttribute("hreflang", hreflang);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export function SEOHead({ seo }: SEOHeadProps) {
  useEffect(() => {
    const config: SEOConfig = {
      ...DEFAULT_SEO,
      ...seo,
    };

    // 1. Page Title
    document.title = config.title;

    // 2. HTML lang and dir
    document.documentElement.lang = config.lang || "ar";
    document.documentElement.dir = config.dir || "rtl";

    // 3. Meta Description
    setOrCreateMeta("name", "description", config.description);

    // 4. Meta Keywords
    if (config.keywords && config.keywords.length > 0) {
      setOrCreateMeta("name", "keywords", config.keywords.join(", "));
    }

    // 5. Robots
    setOrCreateMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setOrCreateMeta("name", "googlebot", "index, follow");

    // 6. Canonical URL
    const canonicalUrl = `${SITE_URL}${
      config.canonicalPath && config.canonicalPath !== "/"
        ? config.canonicalPath
        : ""
    }`;
    setOrCreateLink("canonical", canonicalUrl);

    // 7. Alternate Hreflang Tags
    setOrCreateLink("alternate", canonicalUrl, "ar");
    setOrCreateLink("alternate", canonicalUrl, "fr");
    setOrCreateLink("alternate", canonicalUrl, "en");
    setOrCreateLink("alternate", canonicalUrl, "x-default");

    // 8. Open Graph Tags
    setOrCreateMeta("property", "og:title", config.title);
    setOrCreateMeta("property", "og:description", config.description);
    setOrCreateMeta("property", "og:url", canonicalUrl);
    setOrCreateMeta("property", "og:type", config.ogType || "website");
    setOrCreateMeta("property", "og:site_name", SITE_NAME);
    setOrCreateMeta("property", "og:image", `${SITE_URL}/icone.png`);
    setOrCreateMeta("property", "og:image:width", "512");
    setOrCreateMeta("property", "og:image:height", "512");
    setOrCreateMeta("property", "og:image:alt", BRAND_NAME);
    setOrCreateMeta("property", "og:locale", "ar_MA");
    setOrCreateMeta("property", "og:locale:alternate", "fr_MA");
    setOrCreateMeta("property", "og:locale:alternate", "en_US");

    // 9. Twitter / X Card Tags
    setOrCreateMeta("name", "twitter:card", "summary");
    setOrCreateMeta("name", "twitter:title", config.title);
    setOrCreateMeta("name", "twitter:description", config.description);
    setOrCreateMeta("name", "twitter:image", `${SITE_URL}/icone.png`);
    setOrCreateMeta("name", "twitter:image:alt", BRAND_NAME);

    // 10. Structured Data (JSON-LD)
    const jsonLdId = "taqwaa-dynamic-jsonld";
    let scriptEl = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = jsonLdId;
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    const schemas = buildStructuredData(config);
    scriptEl.textContent = JSON.stringify(schemas);
  }, [seo]);

  return null;
}
