import React from "react";

const EditableTable = ({
  schedule,
  editMode,
  handleInputChange,
  handleHeaderChange,
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
}) => {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            {Object.keys(schedule[0] || {}).map((columnName) => (
              <th key={columnName} className="border border-gray-300 px-4 py-2 text-left">
                {editMode ? (
                  <input
                    type="text"
                    defaultValue={columnName}
                    onBlur={(e) => handleHeaderChange(e, columnName)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                  />
                ) : (
                  columnName
                )}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row, rowIndex) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {Object.entries(row).map(([columnName, value], columnIndex) => (
                <td key={columnIndex} className="border border-gray-300 px-4 py-2">
                  {editMode ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, columnName)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    />
                  ) : (
                    value
                  )}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">
                {editMode && (
                  <button
                    onClick={() => deleteRow(rowIndex)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Supprimer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        {editMode && (
          <div className="flex space-x-4">
            <button
              onClick={addColumn}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Ajouter une colonne
            </button>
            <button
              onClick={deleteColumn}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            >
              Supprimer une colonne
            </button>
            <button
              onClick={addRow}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Ajouter une ligne
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableTable;
