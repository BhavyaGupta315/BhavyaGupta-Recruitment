"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Student {
  first_name: string;
  last_name: string;
  email: string;
  roll_no: string;
}

export default function TnpDataPage() {
  const params = useParams();
  const token = params?.token;
  const safeToken = Array.isArray(token) ? token[0] : token ?? "";
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"card" | "table">("card");

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get<Student[]>(`https://tnp-recruitment-challenge.manitvig.live/share?shareToken=${safeToken}`);
        setData(res.data);
      }catch(err){
        console.log("Error while fetching student data", err);
        setData([]);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [safeToken]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if(data.length === 0) return <div className="text-center mt-10">No data found or invalid token.</div>;
  const filteredData = data.filter((student) =>
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    || student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) 
    || student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) 
    || student.roll_no.toLowerCase().includes(searchTerm.toLowerCase()) 
  );  
  return <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Data</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setView("card")}
          className={`px-4 py-2 text-sm border hover:cursor-pointer transition ease-in-out delay-100 ${
            view === "card" ? "bg-gray-200 font-semibold" : ""
          }`}
        >
          Card View
        </button>
        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 text-sm border hover:cursor-pointer transition ease-in-out delay-100 ${
            view === "table" ? "bg-gray-200 font-semibold" : ""
          }`}
        >
          Table View
        </button>
      </div>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-xs text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {view === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((student, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 shadow-sm hover:scale-102 hover:shadow-md transition ease-in-out"
            >
              <h2 className="text-lg font-semibold mb-2">
                {student.first_name} {student.last_name}
              </h2>
              <p className="text-sm mb-1">
                <span className="font-medium">Email:</span> {student.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Roll No:</span> {student.roll_no}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Roll No</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.roll_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
}
