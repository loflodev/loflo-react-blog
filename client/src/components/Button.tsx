interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fitContent?: boolean;
  size?: 2 | 4 | 6 | 8;
}

const Button = ({ children, fitContent, size = 2, ...rest }: ButtonProps) => {
  const fullWidth = fitContent ? "w-full" : undefined;

  return (
    <button
      className={`${fullWidth} bg-[#6246EA] hover:bg-btn-hover text-white text-lg font-bold rounded-md leading-6 px-4 py-${size} capitalize signin-btn`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
