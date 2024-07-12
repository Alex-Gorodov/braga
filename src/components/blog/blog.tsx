import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { BlogPost } from "../blog-post/blog-post";
import { Spinner } from "../spinner/spinner";
import React from "react";

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
          posts.map((item, index) => (
            <React.Fragment key={`post-${item.name}`}>
              <BlogPost post={item} isPreview={true} />
              {index === 0 && (
                <div className="blog__quote quote">
                  <p className="quote__content">Good beer, like good wine, should not just be drunk, but tasted, enjoyed for its aroma, flavor, and aftertaste.</p>
                  <span className="quote__author">Michael Jackson</span>
                  <span className="quote__author-description">Beer Hunter</span>
                </div>
              )}
            </React.Fragment>
          ))
          :
          <Spinner wrapper size="80"/>
        }
      </div>
    </section>
  );
}
