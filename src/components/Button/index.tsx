import "./index.scss";

export type ButtonKind = "primary" | "secondary" | "tertiary" | "danger";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ButtonKind;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = ({
  kind = "primary",
  size = "medium",
  loading = false,
  className = "",
  children,
  ...props
}: ButtonProps) => (
  <div className="button-wrapper">
    <button
      className={[
        "button",
        kind,
        size,
        loading ? "loading" : "",
        className,
      ].join(" ")}
      {...props}
      disabled={loading || props.disabled}
    >
      {loading ? <span className="spinner"></span> : children}
    </button>
  </div>
);
