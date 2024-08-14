export default async function fetchUserPostsService(userId: string, page: string): Promise<Response> {
    const response = await fetch(`/api/v1/posts/user-posts?${new URLSearchParams({ 'user-id': userId, 'page': page })}`);

    return response;
}