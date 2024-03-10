import { faker } from "@faker-js/faker";

export type postsData = {
    id: string;
    avatar: string;
    username: string;
    handle: string;
    timeStamp: Date;
    postContent: string;
    postImage?: string;
    likes: number;
    dislikes: number;
    numOfComments: number;
};

export function provideDummyPosts(): postsData[] {
    const posts: postsData[] = [];

    for (let index = 0; index < 20; index++) {
        const post: postsData = {
            id: faker.string.uuid(),
            avatar: faker.image.avatar(),
            username: faker.internet.userName(),
            handle: faker.internet.displayName(),
            timeStamp: faker.date.recent(),
            postContent: faker.word.words({ count: { min: 5, max: 50 } }),
            postImage: index % 2 === 0 ? faker.image.url() : undefined,
            likes: faker.number.int({ min: 0,  max: 10000}),
            dislikes: faker.number.int({ min: 0, max: 10000 }),
            numOfComments: faker.number.int({ min: 0, max: 10000 })
        }

        posts[index] = post;
    }

    return posts;
}