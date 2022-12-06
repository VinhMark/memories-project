import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((item) => item._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (!post) return;
    setPostData({
      creator: post?.creator,
      title: post?.title,
      message: post?.message,
      tags: post?.tags.join(','),
      selectedFile: post?.selectedFile,
    });
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.profileObj?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.profileObj?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  if (!user?.profileObj?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Please Sign In to crete your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete='off'
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {' '}
          {currentId ? 'Updating' : 'Creating'} A Memories
        </Typography>

        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          size='large'
          type='submit'
          color='primary'
          fullWidth
          variant='contained'
        >
          {currentId ? 'Update' : 'Create'}
        </Button>
        <Button
          className={classes.buttonSubmit}
          size='large'
          onClick={clear}
          color='secondary'
          fullWidth
          variant='contained'
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
