import { Link, Outlet } from "react-router-dom";
import SearchComponent from "../../components/SearchComponent";

function ClientLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-white active"
                  aria-current="page"
                  to="/product"
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <SearchComponent />
          </div>
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>

      <div className="container">
        <footer className="row row-cols-5 py-5 my-5 border-top">
          <div className="col-xl-4">
            <a
              href="/"
              className="d-flex align-items-center mb-3 link-dark text-decoration-none"
            ></a>
            <p className="text-muted">© 2025</p>
          </div>
          <div className="col"></div>
          <div className="col">
            <h5>Contact</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Email: linhlmph51397@gmail.com
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Phone: 0123456789
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Address: 123 Street Name, City Name.
                </a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Category</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Smartphones
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Laptops
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Fragrances
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Skincare
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Groceries
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Home-decoration
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ClientLayout;
