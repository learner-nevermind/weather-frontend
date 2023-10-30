import classNames from "classnames";

function Button(props) {
  const { variant = "info", text, onClick } = props;

  return (
    <button
      className={classNames(
        "w-full rounded-2xl px-3 py-2 text-white",
        variant === "info" ? "bg-blue-500 active:bg-blue-600" : "",
        variant === "error" ? "bg-red-500 active:bg-red-600" : "",
        variant === "success" ? "bg-emerald-500 active:bg-emerald-600" : "",
        variant === "warning" ? "bg-yellow-500 active:bg-yellow-600" : "",
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
