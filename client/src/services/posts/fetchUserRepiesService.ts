export default async function fetchUserRepliesService(userId: string): Promise<Response> {
    const response = await fetch(`/api/v1/posts/user-replies?${new URLSearchParams({ 'user-id': userId })}`);

    return response;
}