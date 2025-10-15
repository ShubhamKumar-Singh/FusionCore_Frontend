import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Report = {
  id: string;
  title: string;
  description: string;
  date: string;
  created: string;
  category: string;
  fileType: string;
  uploadedFile?: string;
};

const initialState: Report[] = [
  {
    id: '1',
    title: 'Annual Report',
    description: 'Summary of annual performance.',
    date: '2025-01-15',
    created: '2025-01-10',
    category: 'Finance',
    fileType: 'PDF',
    uploadedFile: 'annual_report_2025.pdf',
  },
  {
    id: '2',
    title: 'Quarterly Review',
    description: 'Q1 review and analysis.',
    date: '2025-04-10',
    created: '2025-04-05',
    category: 'Operations',
    fileType: 'Excel',
    uploadedFile: 'q1_review.xlsx',
  },
];

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReport(state, action: PayloadAction<Report>) {
      state.push(action.payload);
    },
    deleteReport(state, action: PayloadAction<string>) {
      return state.filter(r => r.id !== action.payload);
    },
    updateReport(state, action: PayloadAction<Report>) {
      const idx = state.findIndex(r => r.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
  },
});

export const { addReport, deleteReport, updateReport } = reportsSlice.actions;
export default reportsSlice.reducer;
