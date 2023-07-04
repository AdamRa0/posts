import { faker } from "@faker-js/faker";

let devPosts = {};
const arrOfPosts = [];

for (let i = 0; i < 10; i++) {
  devPosts.postId = faker.string.uuid();
  devPosts.username = faker.internet.userName();
  devPosts.profileAvatar = faker.internet.avatar();
  devPosts.handle = `@${faker.internet.userName()}`;
  devPosts.approvals = faker.number.int({ max: 1000 });
  devPosts.disapprovals = faker.number.int({ max: 1000 });
  devPosts.reposts = faker.number.int({ max: 1000 });
  devPosts.comments = faker.number.int({ max: 1000 });
  devPosts.post =
    1 % 2 === 0 ? faker.lorem.paragraph() : faker.word.words({ max: 100 });

  if (i % 2 === 0) {
    devPosts.image = faker.image.url();
  }

  arrOfPosts.push(devPosts);
  devPosts = {};
}

export default arrOfPosts;
