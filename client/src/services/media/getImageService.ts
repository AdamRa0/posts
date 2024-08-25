export default async function getImageService(imagePath: string): Promise<Blob> {
    const response = await fetch(`/api/v1/media/${imagePath}`);

    if (!response.ok) {
        const errorResponse = await response.json();

        throw new Error(`${errorResponse.message}`);
    }

    const data = await response.blob();

    return data;
}