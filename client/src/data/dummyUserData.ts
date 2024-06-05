import { faker } from "@faker-js/faker";
import { postsData } from "./dummyPostsData";


export type userData = {
    id: string;
    bannerImage: string;
    avatar: string;
    subscribed: number;
    subscribers: number;
    bio: string;
    username: string;
    handle: string;
    dateJoined: Date;
    posts?: postsData[];
};


export default function provideDummyUser(): userData {
    return {
        id: faker.string.uuid(),
        bannerImage: faker.image.url(),
        avatar: faker.image.avatar(),
        subscribed: faker.number.int({ min: 0, max: 100000 }),
        subscribers: faker.number.int({ min: 0, max: 100000 }),
        bio: faker.word.words({ count: { min: 5, max: 10 } }),
        username: faker.internet.userName(),
        handle: faker.internet.displayName(),
        dateJoined: faker.date.recent(),
    };
}