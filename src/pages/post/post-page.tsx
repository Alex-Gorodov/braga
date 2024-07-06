import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/layout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { Post } from "../../types/post";
import { Spinner } from "../../components/spinner/spinner";
import { BlogPost } from "../../components/blog-post/blog-post";
import { PageNotFound } from "../page-not-found/page-not-found";

export function PostPage(): JSX.Element {
  const { id } = useParams();
  const posts = useSelector((state: RootState) => state.data.blog);
  const [post, setPost] = useState<Post | null>(null);
  const isPostLoading = useSelector((state: RootState) => state.data.isBlogPostsDataLoading);

  useEffect(() => {

    const itemId = Number(id);
    const foundPost = posts.find((post) => post.id === itemId);

    if (foundPost) {
      setPost(foundPost);
    }

  }, [id, posts]);

  return (
    <Layout>
      <Helmet>
        <title>{`Blog | ${post ? post.name : 'Not found'}`}</title>
      </Helmet>
      {
        isPostLoading ? (
          <Spinner size={"40"} wrapper/>
        ) : (
          post ? (
            <BlogPost post={post} isPreview={false}/>
          ) : (
            <PageNotFound/>
          )
        )
      }
    </Layout>
  )
}
