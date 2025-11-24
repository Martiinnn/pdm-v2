const Section = ({ content = [], className = "" }) => {
  return (
    <div className={className}>
      {content.map((item, idx) => {
        if (item.type === "text") {
          return (
            <div key={`text-${idx}`} className="space-y-2 mb-6">
              {item.text.map(t => {
                const Tag = t.variant === "h1" ? "h1" : t.variant === "h2" ? "h2" : t.variant === "p" ? "p" : "div";
                return <Tag key={t.id || t.content} className={t.className}>{t.content}</Tag>;
              })}
            </div>
          );
        }
        if (item.type === "table") {
          return (
            <div key={`table-${idx}`} className={item.className || ""}>
              <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      {item.columns.map(col => (
                        <th key={col} className="text-left p-3">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(item.data) && item.data.length > 0 ? (
                      item.data.map(row => (
                        <tr key={row.id} className="border-t">
                          {item.columns.map(col => {
                            const key = (col || "").toLowerCase();
                            if (key === "acciones") {
                              return (
                                <td key={`${row.id}-actions`} className="p-3">
                                  {row.onEdit && (
                                    <button onClick={row.onEdit} className="mr-3 text-blue-600 hover:text-blue-700">Editar</button>
                                  )}
                                  {row.onDelete && (
                                    <button onClick={row.onDelete} className="text-red-600 hover:text-red-700">Eliminar</button>
                                  )}
                                </td>
                              );
                            }
                            if (key === "img" || key === "imagen") {
                              return (
                                <td key={`${row.id}-img`} className="p-3">
                                  {row.img ? (
                                    <img src={row.img} alt={row.alt || row.model || "imagen"} className="h-12 w-auto rounded" />
                                  ) : (
                                    ""
                                  )}
                                </td>
                              );
                            }
                            const normalized = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                            let value = row[normalized] ?? row[key] ?? row[col] ?? "";
                            if ((normalized.includes('descripcion') || normalized === 'descripcion') && row.desc) {
                              value = row.desc;
                            }
                            return <td key={`${row.id}-${col}`} className="p-3">{value}</td>;
                          })}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-4" colSpan={item.columns.length}>Sin datos</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Section;
