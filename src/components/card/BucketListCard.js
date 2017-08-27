import React from 'react';
import { Link } from "react-router";
import "./card.css";


const BucketlistCard = (props) => (
  <section className="tiles">
    {
      props.bucketlists.map((bucket, index) => (
        <div key={index} >
            <article className="style10">
              <span className="image">
                <img src={ process.env.PUBLIC_URL + "/images/pic02.jpg"} alt="" />
              </span>
              <Link onClick={(event) => props.redirect(event, bucket.id, bucket.title)}>
                <h2>{ bucket.title }</h2>
                <div className="content">
                  <p>{ bucket.description }</p>

                </div>
              </Link>
            </article>
          </div>
      ))
    }
  </section>
);

export default BucketlistCard;
