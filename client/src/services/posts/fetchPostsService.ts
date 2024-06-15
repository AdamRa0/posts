export default async function fetchPostsService(page: number = 1): Promise<Response> {

    const response = await fetch(`/api/v1/posts/?page=${page}`);

    return response;
}