export default async function fetchPostsService(page: number = 1) {

    const response = await fetch(`/api/v1/posts/?page=${page}`);

    if (!response.ok) {
        const errorResponse = await response.json();
        
        throw new Error(`${errorResponse.message}`);
    }

    const data = await response.json();

    return data;
}