export default async function getImageService(imagePath: string): Promise<Response> {
    const response = fetch(`/api/v1/media/${imagePath}`);
    return response;
}