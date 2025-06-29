const Input = ({ children, color = "black", ...props }) => (
  <input className={`Input Input_${color}`} {...props}>
    {children}
  </input>
);
export default Input;
