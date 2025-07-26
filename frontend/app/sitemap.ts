import type { MetadataRoute } from 'next';
import { PortfolioItemPreview, Post, Product } from '@/lib/types';
import { fetchProducts } from '@/actions/products';
import { fetchPortfolioPreviews } from '@/actions/portfolios';
import { fetchPosts } from '@/actions/posts';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const staticUrls: MetadataRoute.Sitemap = [
        { url: `${baseUrl}/`, lastModified: now },
        { url: `${baseUrl}/contacts`, lastModified: now },
        { url: `${baseUrl}/services`, lastModified: now },
        { url: `${baseUrl}/portfolio`, lastModified: now },
        { url: `${baseUrl}/ceilings`, lastModified: now },
        { url: `${baseUrl}/spc`, lastModified: now },
        { url: `${baseUrl}/blog`, lastModified: now },
    ];

    let products: Product[] = [];
    let portfolioItems: PortfolioItemPreview[] = [];
    let posts: Post[] = [];

    try {
        const res = await fetchProducts('5000', '1');
        products = res.items ?? [];
    } catch (err) {
        console.warn('⚠️ Could not fetch products for sitemap:', err);
    }

    try {
        const res = await fetchPortfolioPreviews();
        portfolioItems = res.items ?? [];
    } catch (err) {
        console.warn('⚠️ Could not fetch portfolio for sitemap:', err);
    }

    try {
        const res = await fetchPosts('5000', '1');
        posts = res.items ?? [];
    } catch (err) {
        console.warn('⚠️ Could not fetch posts for sitemap:', err);
    }

    const productUrls: MetadataRoute.Sitemap = products
        .filter(p => !!p.slug)
        .map(p => ({
            url: `${baseUrl}/products/${p.slug}`,
            lastModified: new Date(p.updatedAt || p.createdAt || now),
        }));

    const portfolioUrls: MetadataRoute.Sitemap = portfolioItems
        .filter(p => !!p.slug)
        .map(p => ({
            url: `${baseUrl}/portfolio/${p.slug}`,
            lastModified: new Date(p.updatedAt || p.createdAt || now),
        }));

    const blogUrls: MetadataRoute.Sitemap = posts
        .filter(p => !!p.slug)
        .map(post => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt || post.createdAt || now),
        }));

    return [...staticUrls, ...productUrls, ...portfolioUrls, ...blogUrls];
}