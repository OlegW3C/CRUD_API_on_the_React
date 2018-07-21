import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';


const Comment = props => (

  <div className="singleComment">
    <img alt="user_image" className="userImage" src={`https://picsum.photos/70/110?random=${props.id}`} />
    <p>{props.file}</p>
    <div className="textContent">
      <div className="singleCommentContent">
        <h3 title='Author Name'>{props.author}</h3>
        <ReactMarkdown source={props.children} />
    </div>
     <div className="singleCommentButtons">
      <span className="time">{moment(props.timestamp).fromNow()}</span>
      <a onClick={() => { props.handleUpdateComment(props.id); }}>update</a>
      <a onClick={() => { props.handleDeleteComment(props.id); }}>delete</a>
     </div>
    </div>
  </div>
);


Comment.propTypes = {
  author: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleUpdateComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Comment;
