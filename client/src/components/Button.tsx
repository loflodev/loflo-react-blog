interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  fitContent?: boolean;
}

const Button = ({ children, onClick, fitContent }: ButtonProps) => {
  const fullWidth = fitContent ? "w-full" : undefined;
  return (
    <a
      className={`btn ${fullWidth} bg-[#6246EA] hover:bg-btn-hover text-white px-4 py-2 uppercase`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Button;
