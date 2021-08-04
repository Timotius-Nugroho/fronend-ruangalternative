import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../utils/axios";
import Layout from "../components/Layout";
import Navbar from "../components/module/Navbar";
import styles from "../styles/Home.module.css";
import ReactPaginate from "react-paginate";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Image,
} from "react-bootstrap";

export async function getServerSideProps(context) {
  const articles = await axios.axiosApiIntances
    .get("get-all-article?page=1&limit=1&sort=articles_created_at DESC")
    .then((res) => {
      // console.log(res.data.data);
      // console.log(res.data.pagination);
      return { data: res.data.data, pagination: res.data.pagination };
    })
    .catch((err) => {
      return {};
    });

  return {
    props: { ...articles },
  };
}

export default function Home(props) {
  const router = useRouter();
  const [data, setData] = useState(props.data);
  const limit = 6;
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(props.pagination);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Kategori");
  const [sortBy, setSortBy] = useState("Urutkan");

  useEffect(() => {
    axios.axiosApiIntances
      .get(
        `get-all-article?page=${page}&limit=${limit}&keywords=${search}&sort=articles_created_at DESC${
          category === "Kategori" ? "" : `&category=${category}`
        }`
      )
      .then((res) => {
        // console.log(res.data.data);
        // console.log(res.data.pagination);
        setData(res.data.data);
        setPagination(res.data.pagination);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, category, sortBy, page, limit]);

  const handleSelectCategory = (event) => {
    setCategory(event);
  };

  const handleSelectSortBy = (event) => {
    setSortBy(event);
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  const moveToDetail = (id) => {
    router.push(`/article/${id}`);
  };

  return (
    <Layout title="Home">
      <Navbar />
      <Container className="mt-5 p-3" fluid>
        <Row>
          <Col md={8}>
            <InputGroup
              className="mb-2"
              style={{
                height: "42px",
                border: "solid gray",
                borderRadius: "5px",
              }}
            >
              <FormControl
                id="inlineFormInputGroup"
                placeholder="Masukkan kata kunci atau judul artikel"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
              <InputGroup.Text className={styles.btnSearch}>
                Cari
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col md={2}>
            <DropdownButton
              as={ButtonGroup}
              variant="fff"
              className={styles.customDrop}
              title={category}
              id="input-group-dropdown-2"
              onSelect={handleSelectCategory}
            >
              <Dropdown.Item eventKey="Auto">Automotive</Dropdown.Item>
              <Dropdown.Item eventKey="Tech">Tech</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md={2}>
            <DropdownButton
              as={ButtonGroup}
              variant="fff"
              className={styles.customDrop}
              title={"Urutkan"}
              id="input-group-dropdown-2"
              onSelect={handleSelectSortBy}
            >
              <Dropdown.Item eventKey="articles_created_at DESC">
                Terbaru
              </Dropdown.Item>
              <Dropdown.Item eventKey="articles_title ASC">
                Judul (A-Z)
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row className="mt-3">
          {data.map((item, index) => {
            return (
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
        <div className="mt-5 d-flex justify-content-center">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pagination.totalPage ? pagination.totalPage : 0}
            marginPagesDisplayed={5}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            subContainerClassName={`${styles.pages} ${styles.pagination}`}
            activeClassName={styles.active}
          />
        </div>
      </Container>
    </Layout>
  );
}
