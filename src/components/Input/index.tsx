import "./index.scss";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = ({ ...props }: InputProps) => {
  return (
    <div className="input-wrapper">
      <input {...props} className="input" />
    </div>
  );
};
