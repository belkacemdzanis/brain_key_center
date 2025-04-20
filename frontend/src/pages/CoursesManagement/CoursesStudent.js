import React, { useState, useEffect } from "react";
import axios from "axios";

const CoursesStudent = () => {
  const [tables, setTables] = useState([]);
  const [fontSize, setFontSize] = useState("16px");
  const [selectedColor, setSelectedColor] = useState("#000000");

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("${process.env.REACT_APP_API_URL}/schedule");
        setTables(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error(error);
        setTables([]);
      }
    };

    fetchTables();
  }, []);

  const saveTables = async () => {
    try {
      await axios.put("${process.env.REACT_APP_API_URL}/schedule", tables);
      alert("Modifications enregistrées avec succès !");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCellChange = (e, tableIndex, rowIndex, colIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex][colIndex] = e.target.innerText;
    setTables(updatedTables);
  };

  const handleTextSelection = (e, tableIndex, rowIndex, colIndex) => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const updatedTables = [...tables];
      const originalText = updatedTables[tableIndex].rows[rowIndex][colIndex];
      const styledText = selection.toString().trim();
      const newText = originalText.replace(
        styledText,
        `<span style="color:${selectedColor}; font-size:${fontSize}">${styledText}</span>`
      );
      updatedTables[tableIndex].rows[rowIndex][colIndex] = newText;
      setTables(updatedTables);
    }
  };

  const handleHeaderChange = (e, tableIndex, headerIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].headers[headerIndex] = e.target.value;
    setTables(updatedTables);
  };

  const handleTableTitleChange = (e, tableIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].name = e.target.value;
    setTables(updatedTables);
  };

  const addColumn = (tableIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].headers.push(`Colonne ${updatedTables[tableIndex].headers.length + 1}`);
    updatedTables[tableIndex].rows.forEach((row) => row.push(""));
    setTables(updatedTables);
  };

  const addRow = (tableIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.push(Array(updatedTables[tableIndex].headers.length).fill(""));
    setTables(updatedTables);
  };

  const deleteColumn = (tableIndex, colIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].headers.splice(colIndex, 1);
    updatedTables[tableIndex].rows.forEach((row) => row.splice(colIndex, 1));
    setTables(updatedTables);
  };

  const deleteRow = (tableIndex, rowIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.splice(rowIndex, 1);
    setTables(updatedTables);
  };

  const addTable = () => {
    setTables([
      ...tables,
      { name: `Tableau ${tables.length + 1}`, headers: ["Colonne 1"], rows: [[""]] },
    ]);
  };

  return (
    <div className="container mx-auto mt-10 p-10 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-3xl shadow-2xl">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
        Gestion des emplois du temps
      </h1>
      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium text-lg">
          Taille du texte :
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="ml-2 p-2 border rounded-md"
          >
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="25px">25px</option>
            <option value="30px">30px</option>
            <option value="40px">40px</option>
          </select>
        </label>
        <label className="font-medium text-lg">
          Couleur :
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="ml-2 p-2 border rounded-md"
          />
        </label>
      </div>
      {tables.map((table, tableIndex) => (
        <div key={tableIndex} className="mb-8">
          <textarea
            value={table.name}
            onChange={(e) => handleTableTitleChange(e, tableIndex)}
            className="text-2xl font-bold text-center mb-4 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner bg-indigo-50"
            style={{ overflow: "hidden", resize: "none" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="table-auto w-full border-collapse rounded-lg overflow-hidden bg-white">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-black">
                <tr>
                  {table.headers.map((header, colIndex) => (
                   <th key={colIndex} className="border border-indigo-300 p-3 text-center">
                   <textarea
                     value={header}
                     onChange={(e) => handleHeaderChange(e, tableIndex, colIndex)}
                     className="bg-indigo-50 rounded-md p-2 text-center resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-sm font-medium font-bold leading-snug break-words"
                     style={{
                       wordWrap: "break-word",
                       whiteSpace: "pre-wrap",
                       overflow: "hidden",
                       minWidth: "100px",  
                       maxWidth: "100%",  
                     }}
                     onInput={(e) => {
                       e.target.style.height = "auto";    
                       e.target.style.width = "auto"; 
                       e.target.style.height = `${e.target.scrollHeight}px`; 
                       e.target.style.width = `${e.target.scrollWidth}px`;  
                     }}
                   />
                                  

                      <button
                        onClick={() => deleteColumn(tableIndex, colIndex)}
                        className="text-red-500 hover:underline mt-2"
                      >
                        Supprimer la colonne
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-indigo-50" : "bg-purple-50"}
                  >
                    {row.map((cell, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border border-indigo-300 p-3 text-center ${
                          colIndex === 0 ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : ""
                        }`}
                      >
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          dir={/[\u0600-\u06FF]/.test(cell) ? "rtl" : "ltr"} // كشف اللغة بناءً على النص
                          onInput={(e) => handleCellChange(e, tableIndex, rowIndex, colIndex)}
                          onMouseUp={(e) => handleTextSelection(e, tableIndex, rowIndex, colIndex)}
                          dangerouslySetInnerHTML={{
                            __html: cell,
                          }}
                          className="w-full bg-white rounded-md p-2 text-center resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-inner text-lg font-medium"
                          style={{ fontSize, color: selectedColor }}
                        />
                      </td>
                    ))}
                    <td>
                      <button
                        onClick={() => deleteRow(tableIndex, rowIndex)}
                        className="text-red-500 hover:underline"
                      >
                        Supprimer la ligne
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-2">
  <button
    onClick={() => addColumn(tableIndex)}
    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-md"
  >
    Ajouter une colonne
  </button>
  <button
    onClick={() => addRow(tableIndex)}
    className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-md"
  >
    Ajouter une ligne
  </button>
</div>
</div>
))}
<div className="mt-6 flex gap-4">
  <button
    onClick={addTable}
    className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-5 py-2 rounded-md"
  >
    Ajouter un tableau
  </button>
  <button
    onClick={saveTables}
    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md"
  >
    Enregistrer les modifications
  </button>
</div>

    </div>
  );
};

export default CoursesStudent;
