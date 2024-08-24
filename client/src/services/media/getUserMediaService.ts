export default async function fetchUserMediaService(userId: string) {
    const response = await fetch(`/api/v1/posts/user-media?${new URLSearchParams({ 'user-id': userId })}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}