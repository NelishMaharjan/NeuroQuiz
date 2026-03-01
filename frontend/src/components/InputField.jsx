const InputField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  placeholder, 
  error, 
  required = false,
  showPasswordToggle = false,
  onTogglePassword
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border text-slate-800 bg-slate-50/50
            ${error ? "border-red-400 ring-1 ring-red-400" : "border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"}
            outline-none transition-all duration-200 font-medium placeholder:text-slate-400`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[10px] font-black uppercase tracking-widest"
            onClick={onTogglePassword}
          >
            {type === "password" ? "Show" : "Hide"}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-[11px] mt-1.5 ml-1 font-bold tracking-tight uppercase">{error}</p>
      )}
    </div>
  );
};

export default InputField;
  