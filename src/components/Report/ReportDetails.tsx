import React from 'react';
import { Report } from '../../store/slices/reportsSlice';

export default function ReportDetails({ report, onClose }: { report: Report; onClose: () => void }) {
  if (!report) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: 420,
      height: '100%',
      background: '#f7f7f7',
      boxShadow: '-2px 0 8px rgba(0,0,0,0.08)',
      zIndex: 100,
      display: 'block',
      padding: 0,
    }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '94%',width:'25%', right: 18, background: '#eee', border: 'none', borderRadius: 8, padding: '8px 22px', fontWeight: 500, fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>Close</button>
      <div style={{
        width: '100%',
        maxWidth: 370,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        alignItems: 'flex-start',
        background: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        padding: '0 10px',
      }}>
        <h2 style={{ marginBottom: 8, color: '#1976d2', fontWeight: 700, fontSize: 22 }}>{report.title}</h2>
        <div><strong>Category:</strong> {report.category}</div>
        <div><strong>File Type:</strong> {report.fileType}</div>
        <div><strong>Created:</strong> {report.created}</div>
        <div><strong>Report Date:</strong> {report.date}</div>
        <div><strong>Description:</strong> {report.description}</div>
        <div><strong>Uploaded File:</strong> {report.uploadedFile ? (
          <a href={"/uploads/" + report.uploadedFile} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 600 }}>{report.uploadedFile}</a>
        ) : (
          <span style={{ color: '#aaa' }}>No file</span>
        )}
        </div>
      </div>
    </div>
  );
}
