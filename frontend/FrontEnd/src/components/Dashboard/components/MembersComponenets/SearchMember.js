import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../../../common/URL';

const ITEMS_PER_PAGE = 5;

const SearchMember = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch members on mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${URL}/member/all`);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, []);

  // Filter members based on search input
  const filteredMembers = members.filter((member) =>
    Object.values(member).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Members</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by any field..."
        className="w-full p-2 mb-4 border rounded"
      />

      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Member ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Gender</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMembers.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="p-2 border">{member.id}</td>
              <td className="p-2 border">{member.name}</td>
              <td className="p-2 border">{member.email}</td>
              <td className="p-2 border">{member.phone}</td>
              <td className="p-2 border">{member.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {paginatedMembers.length === 0 && (
        <p className="mt-4 text-center text-red-500">No members found.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchMember;
