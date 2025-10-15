import React, { useState } from 'react';
import ReportList from './ReportList';
import ReportDetails from './ReportDetails';
import ReportForm from './ReportForm';
import { Report } from '../../store/slices/reportsSlice';
export default function ReportPanel() {
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [editReport, setEditReport] = useState<Report | null>(null);

  function handleView(report: Report) {
    setSelectedReport(report);
    setShowDetails(true);
  }

  function handleCloseDetails() {
    setShowDetails(false);
    setSelectedReport(null);
  }

  function handleAdd() {
    setEditReport(null);
    setShowForm(true);
  }

  function handleEdit(report: Report) {
    setEditReport(report);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setEditReport(null);
  }

  return (
    <div style={{ position: 'relative', minHeight: 500 }}>
      <ReportList onView={handleView} onAdd={handleAdd} onEdit={handleEdit} />
      {/* Sliding modal for report details */}
      {showDetails && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: 400,
              height: '100%',
              background: '#fff',
              boxShadow: '-2px 0 8px rgba(0,0,0,0.08)',
              zIndex: 100,
              padding: '32px 24px',
              transition: 'right 0.3s',
            }}
          >
            <ReportDetails report={selectedReport!} onClose={handleCloseDetails} />
          </div>
          <div
            onClick={handleCloseDetails}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.15)',
              zIndex: 99,
            }}
          />
        </>
      )}
      {/* Sliding modal for add/edit report */}
      {showForm && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: 400,
              height: '100%',
              background: '#fff',
              boxShadow: '-2px 0 8px rgba(0,0,0,0.08)',
              zIndex: 100,
              padding: '32px 24px',
              transition: 'right 0.3s',
            }}
          >
            <ReportForm onClose={handleCloseForm} report={editReport || undefined} />
          </div>
          <div
            onClick={handleCloseForm}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.15)',
              zIndex: 99,
            }}
          />
        </>
      )}
    </div>
  );
}
