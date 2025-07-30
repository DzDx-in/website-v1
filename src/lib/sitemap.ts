// src/lib/sitemap.ts
// Helper function to trigger sitemap regeneration (optional)

export async function revalidateSitemap() {
  try {
    // In Next.js 13+, sitemaps are automatically regenerated on each request
    // But you can also manually trigger revalidation if needed
    
    // Option 1: If using ISR (Incremental Static Regeneration)
    // You can use revalidatePath or revalidateTag
    
    // Option 2: If you want to ping search engines about updates
    await Promise.all([
      // Ping Google
      fetch(`https://www.google.com/ping?sitemap=https://dzdx.in/sitemap.xml`).catch(() => {}),
      // Ping Bing
      fetch(`https://www.bing.com/ping?sitemap=https://dzdx.in/sitemap.xml`).catch(() => {}),
    ]);
    
    console.log('Sitemap update notifications sent to search engines');
  } catch (error) {
    console.error('Error notifying search engines about sitemap update:', error);
  }
}

// Function to generate sitemap manually (if needed for other purposes)
export function generateSitemapXML(pages: Array<{
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
}>): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
}