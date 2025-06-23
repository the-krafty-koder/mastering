const Button = ({
  children,
  className,
  color = "black",
  type = "button",
  ...props
}) => (
  <button type={type} {...props}>
    {children}
  </button>
);
export default Button;
