import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentPayments = () => {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [viewType, setViewType] = useState("Student"+"Teacher");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
 const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [newPayment, setNewPayment] = useState({
    type: "Student",
    studentId: "",
    teacherId: "",
    paymentAmount: "",
    paymentDate: "",
    nextPaymentDate: "",
    paymentMethod: "",
    class: "",
    material: "",
  });

  const [editPayment, setEditPayment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [paymentResponse, studentResponse, teacherResponse, classResponse] = await Promise.all([
          axios.get("${process.env.REACT_APP_API_URL}/payments"),
          axios.get("${process.env.REACT_APP_API_URL}/students"),
          axios.get("${process.env.REACT_APP_API_URL}/teachers"),
          axios.get("${process.env.REACT_APP_API_URL}/classes"),
        ]);
        setPayments(paymentResponse.data);
        setStudents(studentResponse.data);
        setTeachers(teacherResponse.data);
        setClasses(classResponse.data);
      } catch (err) {
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editPayment) {
      setEditPayment((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewPayment((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const paymentData = editPayment || newPayment;

    try {
      const response = await axios.post("${process.env.REACT_APP_API_URL}/payments", paymentData);
      setPayments((prevPayments) => [...prevPayments, response.data]);
      setNewPayment({
        type: "Student",
        studentId: "",
        teacherId: "",
        paymentAmount: "",
        paymentDate: "",
        nextPaymentDate: "",
        paymentMethod: "",
        class: "",
        material: "",
      });
      setEditPayment(null);
    } catch (err) {
      console.error("Error adding payment:", err.response ? err.response.data : err.message);
      setError("Erreur lors de l'ajout du paiement.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeletePayment = async (paymentId) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce paiement ?");
    if (isConfirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/payments/${paymentId}`);
        setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== paymentId));
      } catch (err) {
        setError("Erreur lors de la suppression du paiement.");
      }
    }
  };

  const filteredPayments = payments.filter((payment) => payment.type === viewType);

  const paymentsInSelectedMonthAndYear = filteredPayments.filter((payment) => {
    const paymentDate = new Date(payment.paymentDate);
    return (
      paymentDate.getMonth() + 1 === selectedMonth &&
      paymentDate.getFullYear() === selectedYear
    );
  });


  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Gestion des Paiements</h1>

              {/* Sélection du type de paiement */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Type de Paiement</label>
            <select
              name="type"
              value={editPayment ? editPayment.type : newPayment.type}
              onChange={handleInputChange}
              className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="Student">Étudiant</option>
            <option value="Teacher">Enseignant</option>
          </select>
        </div>

        {(editPayment ? editPayment.type : newPayment.type) === "Student" && (
          <div>
            <label className="block">Étudiant</label>
            <select
              name="studentId"
              value={editPayment ? editPayment.studentId : newPayment.studentId}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Sélectionner un étudiant</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
          </div>
        )}

        {(editPayment ? editPayment.type : newPayment.type) === "Teacher" && (
          <div>
            <label className="block">Enseignant</label>
            <select
              name="teacherId"
              value={editPayment ? editPayment.teacherId : newPayment.teacherId}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Sélectionner un enseignant</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
          </div>
        )}

            {/* Formulaire pour ajouter ou modifier un paiement */}
       <form onSubmit={handleAddPayment} className="space-y-6 bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sélection de la méthode de paiement */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Méthode de paiement</label>
            <select
              name="paymentMethod"
              value={editPayment ? editPayment.paymentMethod : newPayment.paymentMethod}
              onChange={handleInputChange}
              className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Sélectionner une méthode</option>
              <option value="Payé">Payé</option>
              <option value="Pas payé">Pas payé</option>
              <option value="Payera plus tard">Payera plus tard</option>
            </select>
          </div>
         
        </div>

     

        {/* Montant du paiement */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Montant</label>
          <input
            type="number"
            name="paymentAmount"
            value={editPayment ? editPayment.paymentAmount : newPayment.paymentAmount}
            onChange={handleInputChange}
            className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Dates de paiement et prochain paiement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date de Paiement</label>
            <input
              type="date"
              name="paymentDate"
              value={editPayment ? editPayment.paymentDate : newPayment.paymentDate}
              onChange={handleInputChange}
              className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date de Prochain Paiement</label>
            <input
              type="date"
              name="nextPaymentDate"
              value={editPayment ? editPayment.nextPaymentDate : newPayment.nextPaymentDate}
              onChange={handleInputChange}
              className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Sélection de la classe et matériel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Classe</label>
            <select
              name="class"
              value={editPayment ? editPayment.class : newPayment.class}
              onChange={handleInputChange}
              className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Sélectionner une classe</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Matériel</label>
            <input
              type="text"
              name="material"
              value={editPayment ? editPayment.material : newPayment.material}
              onChange={handleInputChange}
              className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Bouton d'ajout ou de modification */}
        <div className="flex justify-end mt-6">
        <button
  type="submit"
  className="px-4 py-2 border bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-md"
>
  {editPayment ? "Modifier" : "Ajouter"}
</button>

        </div>
      </form>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setViewType("Student")}
            className={`px-6 py-3 text-sm font-medium rounded-l-lg transition-all duration-300 ${
              viewType === "Student"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-blue-600 border border-gray-300 hover:bg-blue-50"
            }`}
          >
            Paiements des Élèves
          </button>
          <button
            onClick={() => setViewType("Teacher")}
            className={`px-6 py-3 text-sm font-medium rounded-r-lg transition-all duration-300 ${
              viewType === "Teacher"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-blue-600 border border-gray-300 hover:bg-blue-50"
            }`}
          >
            Paiements des Enseignants
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="month" className="text-sm font-semibold">Filtrer par mois</label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="border rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-300"
            >
              {[...Array(12).keys()].map((i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="year" className="text-sm font-semibold">Filtrer par année</label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-300"
            >
              {Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-indigo-600 font-semibold">Chargement des données...</span>
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 bg-red-100 py-3 px-4 rounded-lg shadow-sm">
          {error}
        </div>
      )}

      <table className="min-w-full bg-white text-sm shadow-md rounded-lg overflow-hidden mx-auto max-w-4xl">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-4 text-left">Nom</th>
            <th className="p-4 text-left">Classe</th>
            <th className="p-4 text-left">Matériel</th>
            <th className="p-4 text-left">Montant</th>
            <th className="p-4 text-left">Méthode de paiement</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Prochaine Date</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentsInSelectedMonthAndYear.map((payment) => {
            const daysLeft =
              payment.nextPaymentDate &&
              (new Date(payment.nextPaymentDate) - new Date()) / (1000 * 60 * 60 * 24);

            return (
              <tr
                key={payment._id}
                className={`border-t hover:bg-blue-50 transition-all duration-300 ${
                  daysLeft <= 3 ? "bg-red-600 text-white" :
                  daysLeft <= 7 ? "bg-red-300" : ""
                }`}
              >
                <td className="p-4">
                  {payment.studentId
                    ? `${payment.studentId.firstName} ${payment.studentId.lastName}`
                    : payment.teacherId
                    ? `${payment.teacherId.firstName} ${payment.teacherId.lastName}`
                    : "Nom inconnu"}
                </td>
                <td className="p-4">{payment.class?.name || "Classe inconnue"}</td>
                <td className="p-4">{payment.material}</td>
                <td className="p-4">{payment.paymentAmount} DZD</td>
                <td className="p-4">{payment.paymentMethod}</td>
                <td className="p-4">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td className="p-4">
                  {payment.nextPaymentDate
                    ? new Date(payment.nextPaymentDate).toLocaleDateString()
                    : "Non spécifiée"}
                </td>
                <td className="p-4 flex space-x-2">
                  <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg">Modifier</button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Supprimer</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPayments;