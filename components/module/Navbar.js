import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { Navbar, Button, Container } from "react-bootstrap";
import styles from "../../styles/Navbar.module.css";

export default function NavBar() {
  const router = useRouter();
  const token = Cookie.get("token");

  const handleLogout = () => {
    Cookie.remove("token");
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <h1>
        <Navbar
          style={{ borderBottom: "solid #E5E5E5" }}
          expand="lg"
          sticky="top"
        >
          <Container fluid>
            <Navbar.Brand>
              <h2 className={styles.navTitle}>Designate.</h2>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-between">
              <div className="d-flex">
                <div className={styles.navText}>Event</div>
                <div className={styles.navText}>Blog</div>
              </div>
              {token ? (
                <div className="d-flex">
                  <div className={styles.navText}>
                    <Button
                      variant="outline-warning"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="d-flex">
                  <div className={styles.navText}>
                    <Button
                      variant="outline-warning"
                      onClick={() => {
                        handleLogin();
                      }}
                    >
                      Masuk
                    </Button>
                  </div>
                  <div className={styles.navText}>
                    <Button variant="outline-warning">Daftar</Button>
                  </div>
                </div>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </h1>
    </>
  );
}
