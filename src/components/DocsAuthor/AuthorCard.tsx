import React from "react";
import styles from "./AuthorCard.module.css";
import authorsGlobal from "js-yaml-loader!../../../blog/authors.yml";
import blogAuthor from '@theme/Blog/Components/Author';

export default function Authors({ authors, size = "h1" }) {
  if (!authors || authors.length === 0) {
    return <div style={{marginTop: 20, marginBottom: 20}}>No authors found.</div>;
  }

  // Filter authors based on the authors parameter (list of author keys)
  const filteredAuthors = authors.map(authorKey => {
    const authorData = authorsGlobal[authorKey];
    if (!authorData) {
      console.warn(`Author key "${authorKey}" not found in authors.yml`);
      return null;
    }
    return {
      key: authorKey,
      ...authorData
    };
  }).filter(Boolean); // Remove null entries

  if (filteredAuthors.length === 0) {
    return <div style={{marginTop: 20, marginBottom: 20}}>No valid authors found.</div>;
  }
  let author = filteredAuthors[0];
  author["imageURL"] = author["image_url"];
  author["page"] = {"permalink": "/homepage/blog/authors/" + author["key"].replace(/([A-Z])/g, '-$1').toLowerCase()};
  console.log(author);
  return (
      blogAuthor({author: author, as: size})
  );
}