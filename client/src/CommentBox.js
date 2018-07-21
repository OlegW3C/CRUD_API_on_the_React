import React, { Component } from 'react';
import 'whatwg-fetch';
import CommentList from './CommentList';
import CommentForm from './CommentForm';


class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      author: '',
      comment: '',
      selectedFile: null,
      updateId: null,
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    // working after first render
    this.loadCommentsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    // init before delete
    if (this.pollInterval) clearInterval(this.pollInterval);
    // return old state
    this.pollInterval = null;
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }
  onUpdateComment = (id) => {
    const oldComment = this.state.data.find(c => c._id === id);
    if (!oldComment) return;
    this.setState({ author: oldComment.author, text: oldComment.text, updateId: id });
  }

  onDeleteComment = (id) => {
    const i = this.state.data.findIndex(c => c._id === id);
    const data = [
      ...this.state.data.slice(0, i),
      ...this.state.data.slice(i + 1),
    ];
    this.setState({ data });
    fetch(`api/comments/${id}`, { method: 'DELETE' })
      .then(res => res.json()).then((res) => {
        if (!res.success) this.setState({ error: res.error });
      });
  }

  submitComment = (e) => {
    e.preventDefault();
    const { author, text, updateId } = this.state;
    if (!author || !text) return;
    if (updateId) {
      this.submitUpdatedComment();
    } else {
      this.submitNewComment();
    }
  }

  submitNewComment = () => {
    const { author, text } = this.state;
    const data = [...this.state.data, { author, text, _id: Date.now().toString() }];
    this.setState({ data });
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, text }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ author: '', text: '', error: null });
    });
  }

  submitUpdatedComment = () => {
    const { author, text, updateId } = this.state;
    fetch(`/api/comments/${updateId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, text }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ author: '', text: '', updateId: null });
    });
  }

  loadCommentsFromServer = () => {
    // fetch returns a promise.
    fetch('/api/comments/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  uploadHandler = () => {
    console.log(this.state.selectedFile)
  }

  render() {
    return (
      <div className='wrapper'>
        <div className="container">
          <div className="form">
          <CommentForm
          author={this.state.author}
          text={this.state.text}
          handleChangeText={this.onChangeText}
          fileChangedHandler={this.fileChangedHandler}
          uploadHandler={this.uploadHandler}
          submitComment={this.submitComment}
          />
          </div>
          <div className="comments">
            <CommentList
              data={this.state.data}
              handleDeleteComment={this.onDeleteComment}
              handleUpdateComment={this.onUpdateComment}
            />
          </div>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
      </div>
    );
  }
}

export default CommentBox;
