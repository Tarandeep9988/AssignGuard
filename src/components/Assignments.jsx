"use client";

import { useState } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (newAssignment.title && newAssignment.deadline) {
      const assignment = {
        id: Date.now(),
        ...newAssignment,
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({ title: "", description: "", deadline: "" });
      setShowUploadForm(false);
    }
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  };

  const handleSubmit = (assignment) => {
    alert(`Submitting to: ${assignment.title}`);
    // Handle submission logic here
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Assignments</h1>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            {showUploadForm ? "Cancel" : "Upload Assignment"}
          </button>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              New Assignment
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Assignment title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Assignment description"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <input
                  type="datetime-local"
                  value={newAssignment.deadline}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      deadline: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Create Assignment
              </button>
            </form>
          </div>
        )}

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-md text-center">
              <p className="text-gray-500 text-lg">
                No assignments yet. Upload one to get started!
              </p>
            </div>
          ) : (
            assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {assignment.title}
                    </h3>
                    {assignment.description && (
                      <p className="text-gray-600 mb-3">
                        {assignment.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-700">Deadline:</span>
                      <span className="text-red-600 font-semibold">
                        {new Date(assignment.deadline).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSubmit(assignment)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => handleDelete(assignment.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
