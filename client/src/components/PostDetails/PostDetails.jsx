import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { clearPost, getPost, getPostsBySearch } from "../../actions/posts";
import moment from "moment";

import useStyle from './styles';
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { posts, post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyle();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
    return () => {
      dispatch(clearPost());
    }
  }, [id, dispatch])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }
  }, [post, dispatch])


  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    )
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  const openPost = (id) => {
    navigate(`/posts/${id}`)
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post?.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags.map((item) => `#${item} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
          <Typography variant="h6">Create by: {post?.name}</Typography>
          <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Realtime chat -coming soon!</strong>
          </Typography>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post?.selectedFile} alt="" />
        </div>
      </div>
      {/* COMMENT */}
      <Divider style={{ margin: '20px 0' }} />
      <CommentSection post={post} />
      <Divider style={{ margin: '20px 0' }} />
      {/* RECOMMENDED POSTS */}
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {
              recommendedPosts.map(({ title, message, name, likes, selectedFile, _id, slug }) => (
                <div key={_id} style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(slug)}>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  <Typography gutterBottom variant="subtitle2">{message}</Typography>
                  <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                  <img src={selectedFile} width="200px" alt="" />
                </div>
              ))
            }
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails