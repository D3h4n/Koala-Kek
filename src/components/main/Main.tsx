import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import Timeline from "./timeline/Timeline";
import AddPost from "./addPost/AddPost";
import SideBar from "./SideBar";
import { User, TL_Post } from "../../defintions";
import { useHistory } from "react-router-dom";

interface Props {
  getUser: (id: string) => Promise<User>;
  user: User;
}

export default function Main({ user, getUser }: Props) {
  const [posts, setPosts] = useState<TL_Post[]>([]);

  let history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push("/sign-in");
  }

  const handleNewPost = useCallback(
    (post: TL_Post) => {
      setPosts([post, ...posts]);
    },
    [posts]
  );

  const getPosts = useCallback((count: Number) => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/posts/`, {
        params: {
          userID: "none",
          count,
        },
      })
      .then((res) => JSON.parse(res.data))
      .then((res: TL_Post[]) => setPosts(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getPosts(0);
  }, [getPosts]);

  return (
    <div className="main-page">
      <Timeline getUser={getUser} posts={posts} />
      <SideBar user={user} handleLogout={handleLogout} />
      <AddPost user={user} handleNewPost={handleNewPost} />
    </div>
  );
}
