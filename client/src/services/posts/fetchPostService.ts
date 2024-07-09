export default async function fetchPostService(postId: string): Promise<Response> {
    const response = await fetch(`/api/v1/posts/${postId}`);

    return response;
}