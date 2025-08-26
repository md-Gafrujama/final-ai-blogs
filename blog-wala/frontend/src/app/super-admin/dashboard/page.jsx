"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // thanks to next.config.js rewrite, this will hit backend
        const res = await axios.get("/api/super-admin/dashboard"); 
        setCompanies(res.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Super Admin Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg">Companies</h2>
        <ul>
          {companies.map((company) => (
            <li
              key={company._id}
              className="cursor-pointer hover:underline"
              onClick={() => setSelectedCompany(company)}
            >
              {company.name} ({company.approved ? "Approved" : "Unapproved"})
            </li>
          ))}
        </ul>
      </div>

      {selectedCompany && (
        <div className="mt-4 border p-4 rounded">
          <h2 className="text-lg font-semibold">{selectedCompany.name}</h2>
          <p>
            Total Blogs:{" "}
            <span className="font-bold">{selectedCompany.blogs}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
