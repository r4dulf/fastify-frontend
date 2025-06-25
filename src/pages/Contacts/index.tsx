export const Contacts = () => {
  return (
    <div className="page contacts">
      <div className="half">
        <h1>Contact Us</h1>

        <p>
          We'd love to hear from you! Whether you have questions, feedback, or
          need support — feel free to get in touch.
        </p>

        <h2>Email</h2>
        <p>
          General inquiries:{" "}
          <a href="mailto:hello@eventify.local">hello@eventify.local</a>
          <br />
          Support:{" "}
          <a href="mailto:support@eventify.local">support@eventify.local</a>
        </p>

        <h2>Social Media</h2>
        <ul>
          <li>
            Twitter:{" "}
            <a
              href="https://twitter.com/eventify"
              target="_blank"
              rel="noopener noreferrer"
            >
              @eventify
            </a>
          </li>
          <li>
            Facebook:{" "}
            <a
              href="https://facebook.com/eventify"
              target="_blank"
              rel="noopener noreferrer"
            >
              facebook.com/eventify
            </a>
          </li>
          <li>
            Instagram:{" "}
            <a
              href="https://instagram.com/eventify"
              target="_blank"
              rel="noopener noreferrer"
            >
              @eventify
            </a>
          </li>
        </ul>

        <h2>Address</h2>
        <p>
          Eventify HQ
          <br />
          123 Future Street
          <br />
          Zhytomyr, Ukraine
        </p>
      </div>
    </div>
  );
};
