interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return <a className="btn bg-[#6246EA] text-white px-4 py-2 uppercase">{children}</a>;
};

export default Button;
