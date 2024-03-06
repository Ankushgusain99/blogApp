import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { status: authStatus } = useSelector((state) => state.auth);

  const fetchPost = async () => {
    try {
      const { documents } = await appwriteService.getPosts();
      setPosts(documents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading) return <h1 className="py-16">Loading ...</h1>;

  return (
    <div className="w-full py-8">
      <Container>
        {authStatus ? (
          posts.length === 0 ? (
            <h1 className="text-2xl font-bold">
              No post is there, please create one
            </h1>
          ) : (
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          )
        ) : (
          <h1 className="text-2xl font-bold">Login to read posts</h1>
        )}
      </Container>
    </div>
  );
}

export default Home;
