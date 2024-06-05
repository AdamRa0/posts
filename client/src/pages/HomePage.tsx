import ListComponent from "../components/ui/ListComponent";
import { provideDummyPosts, postsData } from "../data/dummyPostsData";

export default function HomePage() {
  const posts: postsData[] = provideDummyPosts();
  return (
    <>
      <ListComponent posts={posts} />
    </>
  );
}
