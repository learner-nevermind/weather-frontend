function Input(props) {
  return (
    <input
      placeholder={props.placeholder}
      className="w-full rounded-2xl border border-slate-200 px-3 py-2"
      {...props}
    />
  );
}

export default Input;
