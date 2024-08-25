export default async function fetchPostService(postId: string): Promise<Response> {
    const response = await fetch(`/api/v1/posts/${postId}`);
    
    if (!response.ok) {
        const errorResponse = await response.json();

        throw new Error(`${errorResponse.message}`);
    }

    const data = await response.json();

    return data;
}