import React, { useState, useEffect } from "react";

import { TL_Post, User, defaultUser } from "../../../defintions";

interface Props {
  post: TL_Post;
  getUser: (id: string) => Promise<User>;
}

export default function Post({ post, getUser }: Props) {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    getUser(post.userID)
      .then((user) => setUser(user))
      .catch((err) => console.error(err));
  }, [post, getUser]);

  return (
    <div className="post">
      <div className="post-user-icon">
        <img className="post-user-icon-img" src={user.icon} alt="user icon" />
      </div>

      <h3 className="post-user-name">{user.displayName}</h3>

      <hr className="post-hr" />

      <pre className="post-text">{post.body}</pre>

      {post.hasImg && (
        <div className="post-image-container">
          {post.imgs?.map((image, idx) => (
            <img key={idx} src={image} alt="post" className="post-image" />
          ))}
        </div>
      )}
    </div>
  );
}
