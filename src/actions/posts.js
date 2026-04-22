import * as api from "../api/index.js";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
} from "../constants/actionTypes";
import { notify } from "../context/NotificationContext";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
    notify.error("Failed to load posts");
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
    notify.success("Meme posted successfully! 🎉");
  } catch (error) {
    console.log(error.message);
    notify.error("Failed to create post");
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
    notify.success("Post updated successfully!");
  } catch (error) {
    console.log(error.message);
    notify.error("Failed to update post");
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
    notify.error("Failed to like post");
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
    notify.success("Post deleted successfully");
  } catch (error) {
    console.log(error.message);
    notify.error("Failed to delete post");
  }
};
