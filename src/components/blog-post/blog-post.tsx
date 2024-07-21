import { setStatusMessage, togglePostLike } from "../../store/actions";
import { ReactComponent as Like } from "../../img/icons/like.svg";
import { toggleLikeInDatabase } from "../../store/api-actions";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { AppRoute, ErrorMessages } from "../../const";
import { RootState } from "../../store/root-reducer";
import { useGetUser } from "../../hooks/useGetUser";
import { Post } from "../../types/post";
import { useState } from "react";

type BlogPostProps = {
  post: Post;
  isPreview: boolean;
}

export function BlogPost({post, isPreview}: BlogPostProps): JSX.Element {
  const dispatch = useDispatch();
  const user = useGetUser()
  const postDate = new Date(post.date).getTime();
  const postLikes = useSelector((state: RootState) => state.data.blog[post.id].likes)
  const [isUserLikedThisPost, setUserLikedThisPost] = useState(user && postLikes && postLikes.some((like) => like.id === user.id));
  const [isShowLikes, setShowLikes] = useState(false);

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

  const handleLike = async () => {
    const isLiked = !isUserLikedThisPost;
    dispatch(togglePostLike({ post: post, user: user }));
    if (user) {
      setUserLikedThisPost(isLiked);
      await toggleLikeInDatabase(post, user, isLiked);
    } else {
      dispatch(setStatusMessage({message: ErrorMessages.LikeError}))
    }
  };

  const likesListRef = useOutsideClick(() => {
    setShowLikes(false);
  }) as React.RefObject<HTMLUListElement>;

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
        <div className="post__image-container">
          <Link to={link} className="post__image-link">
            <picture className="post__image-wrapper">
              <source srcSet={`${post.img}.webp 1x, ${post.img}@2x.webp 2x`} type="image/webp" width={384} height={475}/>
              <source media="(min-width: 1170px)" srcSet={`${post.img}.webp 1x, ${post.img}@2x.webp 2x`} type="image/webp"/>
              <source media="(min-width: 900px)" srcSet={`${post.img}.webp 1x, ${post.img}@2x.webp 2x`} type="image/webp"/>
              <img className="post__image" src={`${post.img}.png`} width={384} height={475} alt={post.title} srcSet={`${post.img}@2x.png 2x`}/>
            </picture>
          </Link>
          <button className={`button button--no-shadow post__like ${ isUserLikedThisPost ? 'post__like--liked' : ''}`} onClick={() => handleLike()}>
            <Like/>
            <span
              className="post__like-amount"
              onMouseEnter={() => setShowLikes(!isShowLikes)}
            >
              {post.likes? post.likes.length : 0}
            </span>
            <span className="visually-hidden">click to like it!</span>
          </button>
          {
            post.likes && post.likes.length > 0 && <ul className={`post__likes-wrapper ${isShowLikes ? 'post__likes-wrapper--opened' : ''}`} ref={likesListRef}>
            {
              post.likes.map((user) => {
                return (
                  <li key={user.id}>
                    <img width={40} height={40} src={user.avatar} title={user.name} alt={user.name} />
                  </li>
                )
              })
            }
          </ul>
          }
        </div>
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
