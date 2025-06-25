import "./index.scss";

export const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <div>
        © {new Date().getFullYear()} &copy; Bohdan Stetsiuk. All rights
        reserved.
      </div>

      <nav className="footer-nav">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-use">Terms of Service</a>
      </nav>
    </div>
  </footer>
);
