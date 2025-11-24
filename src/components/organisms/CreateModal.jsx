import { useState } from 'react';

const CreateModal = ({ isOpen, onClose, onSubmit, inputsConfig = [], title = "", submitText = "Guardar", loading = false, initialData = {} }) => {
  const [form, setForm] = useState(initialData);
  if (!isOpen) return null;
  const handleChange = (name, value) => setForm(prev => ({ ...prev, [name]: value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(form); };
  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full m-4">
        {title && <h4 className="text-xl font-light mb-4">{title}</h4>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {inputsConfig.map((input) => {
            if (input.type === "textarea") {
              return (
                <textarea
                  key={input.name}
                  className={input.className || "w-full p-3 rounded-lg bg-gray-50 border border-gray-200"}
                  placeholder={input.placeholder}
                  required={!!input.required}
                  value={form[input.name] || ""}
                  onChange={(e) => handleChange(input.name, e.target.value)}
                />
              );
            }
            if (input.type === "select") {
              return (
                <select
                  key={input.name}
                  className={input.className || "w-full p-3 rounded-lg bg-gray-50 border border-gray-200"}
                  value={form[input.name] ?? input.defaultValue ?? ""}
                  onChange={(e) => handleChange(input.name, e.target.value)}
                >
                  {(input.options || []).map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              );
            }
            if (input.type === "file") {
              return (
                <input
                  key={input.name}
                  type="file"
                  className={input.className || "w-full p-3 rounded-lg bg-gray-50 border border-gray-200"}
                  onChange={(e) => handleChange(input.name, e.target.files?.[0] || null)}
                />
              );
            }
            return (
              <input
                key={input.name}
                type={input.type || "text"}
                className={input.className || "w-full p-3 rounded-lg bg-gray-50 border border-gray-200"}
                placeholder={input.placeholder}
                required={!!input.required}
                value={form[input.name] || ""}
                onChange={(e) => handleChange(input.name, e.target.value)}
              />
            );
          })}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border">Cancelar</button>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-blue-600 text-white">{loading ? "Guardando..." : submitText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
