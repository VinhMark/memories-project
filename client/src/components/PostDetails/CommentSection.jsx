import { Button, TextField, Typography } from '@material-ui/core';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';
import useStyles from './styles'

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments || [])
  const [comment, setComment] = useState('')
  const classes = useStyles();
  const dispatch = useDispatch();
  const commentRef = useRef();
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleClick = async () => {
    const finalComment = `${user.profileObj.name}: ${comment}`
    const res = await dispatch(commentPost(finalComment, post._id));
    setComments(res);
    setComment('');

  }

  useEffect(() => {
    if (commentRef) {
      commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [comments])

  return (
    <div>
      <Typography variant="h6">
        <strong>Comments</strong>
      </Typography>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant='subtitle1'>

              <strong>{c.split(':')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        {user && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant='h6'>Write A Comment:</Typography>
            <TextField
              fullWidth
              minRows={4}
              variant='outlined'
              label='Comment'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment}
              variant='contained'
              onClick={handleClick}
              color='primary'
            >
              Comment
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}

export default CommentSection