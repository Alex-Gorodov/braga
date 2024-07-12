import { Link, generatePath } from "react-router-dom";
import { AppRoute } from "../../const";
import { Post } from "../../types/post";

type BlogPostProps = {
  post: Post;
  isPreview: boolean;
}

export function BlogPost({post, isPreview}: BlogPostProps): JSX.Element {
  const postDate = new Date(post.date).getTime();
  const renderedDate = () => {
    const date = new Date(postDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const link = generatePath(AppRoute.PostPage, {
    id: `${post.id}`,
  })

  return (
    <div className={`post__wrapper ${isPreview ? 'post__wrapper--preview' : ''}`}>
      {
        !isPreview &&
        <>
          <h1 className="visually-hidden">{post.name}'s page</h1>
          <div className="section__top-wrapper">
            <h2 className="title title--2">Blog</h2>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Root}>Home</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Blog}>Blog</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={link}>{post.name}</Link>
              </li>
            </ul>
          </div>
        </>
      }
      <article className={`post ${isPreview ? 'post--preview' : ''}`}>
        <Link to={link} className="post__image-link">
          <picture className="post__image-wrapper">
            <source srcSet={`${post.img}.webp 1x, ${post.img}@2x.webp 2x`} type="image/webp" width={384} height={475}/>
            <source media="(min-width: 1170px)" srcSet={`${post.img}.webp 1x, ${post.img}@2x.webp 2x`} type="image/webp"/>
            <source media="(min-width: 900px)" srcSet={`${post.img}.webp 1x, ${post.img}@2x.webp 2x`} type="image/webp"/>
            <img className="post__image" src={`${post.img}.png`} width={384} height={475} alt={post.title} srcSet={`${post.img}@2x.png 2x`}/>
          </picture>
        </Link>
        <div className="post__text-wrapper">
          <p className="post__date-wrapper">
            <span>{renderedDate()}</span> /&nbsp;
            {post.tags.map((t, index) => (
              <span key={`tag-${t}-${post.id}`}>
                {t}{index < post.tags.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
          <Link className="post__title" to={link}>{post.title}</Link>
          <div className="post__content" dangerouslySetInnerHTML={{ __html: isPreview ? `${post.post.split('.')[0]}...` : post.post }} />
        </div>
          {
            isPreview &&
            <Link className="button post__button" to={link}>Read more</Link>
          }
      </article>
    </div>
  )

}
