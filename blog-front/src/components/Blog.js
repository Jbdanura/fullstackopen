import React, { useState } from "react";

const Blog = ({ blog}) => {


  return (
    <div className="blog">
      {blog.title}
    </div>
  );
};

export default Blog;
