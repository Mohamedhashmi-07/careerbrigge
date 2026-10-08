import React from 'react';
import { MatrixRow } from '../../types/familyDecision';
import { AlignmentBadge } from '../common/Badges';
import { useApp } from '../../context/AppContext';

interface StakeholderMatrixProps {
  rows: MatrixRow[];
}

export const StakeholderMatrix: React.FC<StakeholderMatrixProps> = ({ rows }) => {
  const { t } = useApp();

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Stakeholder Preference Matrix</h3>
          <p className="card-subtitle">
            Side-by-side comparison of independent preferences across 6 key decision dimensions
          </p>
        </div>
      </div>

      <div className="matrix-table-container">
        <table className="matrix-table">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>{t.family.matrixHeaderDimension}</th>
              <th style={{ width: '32%', color: 'var(--primary-700)' }}>
                {t.family.matrixHeaderStudent} (Student)
              </th>
              <th style={{ width: '32%', color: 'var(--indigo-800)' }}>
                {t.family.matrixHeaderParent} (Parent)
              </th>
              <th style={{ width: '14%' }}>{t.family.matrixHeaderStatus}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.dimensionKey}>
                <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  {row.dimensionLabel}
                </td>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                    {row.studentValue}
                  </div>
                  {row.detailNote && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '0.15rem' }}>
                      {row.detailNote}
                    </div>
                  )}
                </td>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                    {row.parentValue}
                  </div>
                </td>
                <td>
                  <AlignmentBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
