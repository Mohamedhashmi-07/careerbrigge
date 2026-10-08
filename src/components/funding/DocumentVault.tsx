import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentStatus } from '../../types/funding';
import { ShieldCheck, UploadCloud, CheckCircle2, AlertCircle, Clock, FileText } from 'lucide-react';
import { DemoDataBadge } from '../common/Badges';

export const DocumentVault: React.FC = () => {
  const { documents, uploadDocumentDemo, t } = useApp();
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'verified':
        return (
          <span className="badge badge-teal">
            <CheckCircle2 size={12} /> {t.funding.statusVerified}
          </span>
        );
      case 'uploaded':
        return (
          <span className="badge badge-indigo">
            <Clock size={12} /> {t.funding.statusUploaded}
          </span>
        );
      case 'under_review':
        return (
          <span className="badge badge-amber">
            <Clock size={12} /> {t.funding.statusUnderReview}
          </span>
        );
      case 'missing':
      default:
        return (
          <span className="badge badge-rose">
            <AlertCircle size={12} /> {t.funding.statusMissing}
          </span>
        );
    }
  };

  const handleSimulateUpload = (docId: string, docTitle: string) => {
    const fileName = `${docTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_2026.pdf`;
    uploadDocumentDemo(docId, fileName);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <ShieldCheck size={18} color="var(--primary-600)" />
            <h3 className="card-title">{t.funding.vaultTitle}</h3>
            <DemoDataBadge label="Private Storage Ready" />
          </div>
          <p className="card-subtitle">{t.funding.vaultSubtitle}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {documents.map((doc) => (
          <div
            key={doc.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              background: doc.status === 'missing' ? '#fffafb' : '#ffffff',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: doc.status === 'verified' ? 'var(--teal-100)' : 'var(--bg-card-subtle)',
                  color: doc.status === 'verified' ? 'var(--teal-700)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FileText size={18} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {doc.title}
                </h5>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Required for: {doc.requiredFor.join(', ')}
                </div>
                {doc.fileName && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--teal-700)', fontWeight: 600, marginTop: '0.15rem' }}>
                    File: {doc.fileName} ({doc.fileSize})
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {getStatusBadge(doc.status)}

              {doc.status === 'missing' && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSimulateUpload(doc.id, doc.title)}
                >
                  <UploadCloud size={14} /> {t.funding.uploadBtn}
                </button>
              )}

              {doc.status !== 'missing' && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleSimulateUpload(doc.id, doc.title)}
                  title="Replace or upload updated copy"
                >
                  Re-upload
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
