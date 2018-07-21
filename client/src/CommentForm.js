import React from 'react';
import PropTypes from 'prop-types';



const CommentForm = props => (
  <form onSubmit={props.submitComment}>
    <textarea
      type="text"
      name="text"
      placeholder="Comment text"
      value={props.text}
      onChange={props.handleChangeText}
    />
    <input
    type="text"
    name="author"
    placeholder="Author name"
    value={props.author}
    onChange={props.handleChangeText} />
    <input
    type="file"
    name="file"
    accept=".png, .jpg"
    id="file"
    encType="multipart/form-data"
    onChange={props.fileChangedHandler}
    />
    <button onClick={props.uploadHandler} type="submit">Submit</button>
  </form>
);



CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  text: PropTypes.string,
  author: PropTypes.string,
};

CommentForm.defaultProps = {
  text: '',
  author: '',
};

export default CommentForm;
