export default async function getPost() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?populate=coverImage`, {
        next: { revalidate: 10 },
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data.data;
}