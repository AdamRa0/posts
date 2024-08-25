export default async function fetchUserPostsService(userId: string, page: string) {
    const response = await fetch(`/api/v1/posts/user-posts?${new URLSearchParams({ 'user-id': userId, 'page': page })}`);

    if (!response.ok) {
        const errorResponse = await response.json();
        
        throw new Error(`${errorResponse.message}`);
    }

    const data = await response.json();

    return data;
}