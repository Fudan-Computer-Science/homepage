import React from "react";
import styles from "./AuthorCard.module.css";

type Author = {
  name: string;
  url?: string;
  imageURL?: string;
};

type Props = {
  author: Author;
  date: string;
};

export default function AuthorCard({ author, date }: Props) {
  return (
    <div className={styles.authorCard}>
      {author.imageURL && (
        <img
          className={styles.avatar}
          src={author.imageURL}
          alt={author.name}
        />
      )}
      <div className={styles.info}>
        <div className={styles.name}>
          {author.url ? (
            <a href={author.url} target="_blank" rel="noopener noreferrer">
              {author.name}
            </a>
          ) : (
            author.name
          )}
        </div>
        <time className={styles.date}>{date}</time>
      </div>
    </div>
  );
}
