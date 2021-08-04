import { useState } from "react";
import { useRouter } from "next/router";
import axios from "../../utils/axios";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Image,
} from "react-bootstrap";
import styles from "../../styles/Article.module.css";
import Cookie from "js-cookie";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const article = await axios.axiosApiIntances
    .get(`get-article/${id}`)
    .then((res) => {
      // console.log(res.data.data);
      return { ...res.data.data[0] };
    })
    .catch((err) => {
      return false;
    });

  if (!article) {
    return {
      notFound: true,
    };
  }

  const comment = await axios.axiosApiIntances
    .get(`get-comment?articleId=${article.articles_id}`)
    .then((res) => {
      // console.log(res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      return [];
    });

  const articlesRelated = await axios.axiosApiIntances
    .get(`get-all-article?page=1&limit=6&category=${article.articles_topic}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return [];
    });

  return {
    props: { id, article, comment, articlesRelated },
  };
}

export default function Home(props) {
  const router = useRouter();
  const token = Cookie.get("token");
  const { id, article, articlesRelated, comment } = props;
  const [addCommet, setAddCommet] = useState("");

  const moveToDetail = (id) => {
    router.push(`/article/${id}`);
  };

  const postCommmet = () => {
    if (token) {
      axios.setToken(token);
      axios.axiosApiIntances
        .post("add-comment", {
          articles_id: id,
          comments_body: addCommet,
        })
        .then((res) => {
          moveToDetail(id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please login to make a comment !");
    }
  };

  // console.log(token);
  return (
    <Layout title="Details">
      <Navbar />
      <Container className="mt-5 p-3" fluid>
        <div className="text-center">
          <h1 className="mb-5">{article.articles_title}</h1>
          <Image
            className={styles.imgBanner}
            src={`${process.env.IMG_BACKEND_URL}${article.articles_banner}`}
            rounded
          />
        </div>
        <div className="me-5 ms-5 mt-4">
          {article.articles_body}
          <div className="mt-4">
            <strong>
              By : {article.author_name} (
              <span className={styles.commentTime}>
                {article.articles_created_at.split("T")[0]}
              </span>
              )
            </strong>
          </div>
          <InputGroup
            className="mb-2 mt-4"
            style={{
              height: "42px",
              border: "solid gray",
              borderRadius: "5px",
            }}
          >
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Add a comments here ....."
              onChange={(event) => {
                setAddCommet(event.target.value);
              }}
            />
            <InputGroup.Text
              className={styles.btnAdd}
              onClick={() => {
                postCommmet();
              }}
            >
              Add
            </InputGroup.Text>
          </InputGroup>
          {comment.map((item, index) => {
            return (
              <div className="shadow m-1 p-3" key={index}>
                <div className={styles.commentator}>{item.commentator}</div>
                <div className={styles.comment}>{item.comments_body}</div>
                <div className={styles.commentTime}>
                  {item.comments_created_at.split("T")[0]}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-5 mb-4">
          <h1>Related</h1>
        </div>
        <Row className="p-3">
          {articlesRelated.map((item, index) => {
            return item.articles_id == id ? (
              ""
            ) : (
              <Col key={index} md={6}>
                <div
                  className={`${styles.card} mt-4 p-1`}
                  onClick={() => {
                    moveToDetail(item.articles_id);
                  }}
                >
                  <Row>
                    <Col>
                      <Image
                        className={styles.tumbnail}
                        src={`${process.env.IMG_BACKEND_URL}${item.articles_banner}`}
                        rounded
                      />
                    </Col>
                    <Col>
                      <div className={styles.contentTitle}>
                        {item.articles_title}
                      </div>
                      <div className={styles.contentTopic}>
                        {item.articles_topic}
                      </div>
                      <div className={styles.contentDate}>
                        {item.articles_created_at.split("T")[0]}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
}
