
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addReport, updateReport, Report } from '../../store/slices/reportsSlice';

export default function ReportForm({ onClose, report }: { onClose: () => void; report?: Report }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(report?.title || '');
  const [description, setDescription] = useState(report?.description || '');
  const [date, setDate] = useState(report?.date || '');
  const [category, setCategory] = useState(report?.category || '');
  const [fileType, setFileType] = useState(report?.fileType || 'PDF');
  const [uploadedFile, setUploadedFile] = useState<string | undefined>(report?.uploadedFile);

  useEffect(() => {
    if (report) {
      setTitle(report.title);
      setDescription(report.description);
      setDate(report.date);
      setCategory(report.category);
      setFileType(report.fileType);
      setUploadedFile(report.uploadedFile);
    }
  }, [report]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (report) {
      // Edit mode
      dispatch(updateReport({
        ...report,
        title,
        description,
        date,
        category,
        fileType,
        uploadedFile,
      }));
    } else {
      // Add mode
      dispatch(addReport({
        id: Math.random().toString(36).slice(2),
        title,
        description,
        date,
        created: new Date().toISOString().slice(0, 10),
        category,
        fileType,
        uploadedFile,
      }));
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', color: '#222', padding: 20, borderRadius: 8, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: 18 }}>{report ? 'Edit Report' : 'Add New Report'}</h3>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Title:</label>
        <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }} required />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', minHeight: 80 }} required />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Report Date:</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }} required />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Category:</label>
        <input value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }} required />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>File Type:</label>
        <select value={fileType} onChange={e => setFileType(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="PDF">PDF</option>
          <option value="Excel">Excel</option>
          <option value="Word">Word</option>
          <option value="Image">Image</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Upload File:</label>
        <input type="file" onChange={handleFileChange} style={{ width: '100%' }} />
        {uploadedFile && <div style={{ marginTop: 8, color: '#1976d2' }}>Selected: {uploadedFile}</div>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, fontSize: 15, cursor: 'pointer' }}>{report ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onClose} style={{ background: '#eee', color: '#222', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, fontSize: 15, cursor: 'pointer' }}>Cancel</button>
      </div>
    </form>
  );
}
