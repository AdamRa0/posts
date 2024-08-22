export default async function fetchUserMediaService(userId: string): Promise<Response> {
    const response = await fetch(`/api/v1/posts/user-media?${new URLSearchParams({ 'user-id': userId })}`);

    return response;
}