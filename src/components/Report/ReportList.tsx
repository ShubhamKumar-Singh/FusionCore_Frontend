import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Report, deleteReport, updateReport } from '../../store/slices/reportsSlice';
export default function ReportList({ onView, onAdd, onEdit }: { onView: (report: Report) => void; onAdd: () => void; onEdit: (report: Report) => void }) {
  const reports = useSelector((state: RootState) => state.reports as Report[]);
  const dispatch = useDispatch();
  function handleUpload(reportId: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Find the report and update its uploadedFile field
      const report = reports.find(r => r.id === reportId);
      if (report) {
        dispatch(updateReport({ ...report, uploadedFile: file.name }));
      }
      alert(`File '${file.name}' uploaded for report ${reportId}`);
    }
  }

  return (
  <div>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
  <h3 style={{ fontSize: 20 }}>REPORTS</h3>
  <button onClick={onAdd} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, fontSize: 15, cursor: 'pointer',width:'10%' }}>+ Add New Report</button>
  </div>
  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', color: '#222', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
  <thead>
          <tr style={{ background: '#f7f7f7' }}>
            <th style={{ padding: 12, textAlign: 'left' }}>Title</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Created</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Category</th>
            <th style={{ padding: 12, textAlign: 'left' }}>File Type</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Uploaded File</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
          </tr>
  </thead>
  <tbody>
          {reports.map((report: Report) => (
            <tr key={report.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 12 }}>{report.title}</td>
              <td style={{ padding: 12 }}>{report.created}</td>
              <td style={{ padding: 12 }}>{report.date}</td>
              <td style={{ padding: 12 }}>{report.category}</td>
              <td style={{ padding: 12 }}>{report.fileType}</td>
              <td style={{ padding: 12 }}>
                {report.uploadedFile ? (
                  <a href={"/uploads/" + report.uploadedFile} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                    {report.uploadedFile}
                  </a>
                ) : (
                  <span style={{ color: '#aaa' }}>No file</span>
                )}
              </td>
              <td style={{ padding: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                  <button onClick={() => onView(report)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>View</button>
                  <button onClick={() => onEdit(report)} style={{ background: '#ffa726', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => dispatch(deleteReport(report.id))} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>Delete</button>
                  <label style={{ background: '#1976d2', color: '#fff', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', marginLeft: 4 }}>
                    Upload
                    <input type="file" style={{ display: 'none' }} onChange={e => handleUpload(report.id, e)} multiple={false} />
                  </label>
                </div>
              </td>
            </tr>
          ))}
  </tbody>
  </table>
  </div>
  );
}
// ...existing code...
