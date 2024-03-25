import ListComponent from "../components/ListComponent";
import AppLayout from "../layouts/AppLayout";
import { provideDummyPosts, postsData } from "../data/dummyPostsData";

export default function HomePage() {
  const posts: postsData[] = provideDummyPosts();
  return (
    <AppLayout>
      <ListComponent posts={posts} />
    </AppLayout>
  );
}
