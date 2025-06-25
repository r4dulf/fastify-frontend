import "./index.scss";

export const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <div>
        © {new Date().getFullYear()} &copy; Богдан Стецюк. Всі права захищені.
      </div>

      <nav className="footer-nav">
        <a href="/privacy-policy">Політика конфіденційності</a>
        <a href="/terms-of-service">Умови обслуговування</a>
      </nav>
    </div>
  </footer>
);
