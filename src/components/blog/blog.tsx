import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { BlogPost } from "../blog-post/blog-post";
import { Spinner } from "../spinner/spinner";

export function Blog(): JSX.Element {
  const posts = useSelector((state: RootState) => state.data.blog);
  const isPostsLoading = useSelector((state: RootState) => state.data.isBlogPostsDataLoading);

  return (
    <section className="section blog">
      <div className="section__top-wrapper">
        <h2 className="title title--2">Blog</h2>
        <ul className="breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Root}>Home</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Blog}>Blog</Link>
          </li>
        </ul>
      </div>
      <div className="blog__container">
        {
          !isPostsLoading
          ?
          posts.map((item) => {
            return (
              <BlogPost post={item} isPreview={true} key={`post-${item.name}`}/>
            )
          })
          :
          <Spinner wrapper size="80"/>
        }
      </div>
    </section>
  )
}
