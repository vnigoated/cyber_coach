import React, { useRef } from 'react';
import { Award, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { supabase } from '../../lib/supabase';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  studentName: string;
  completionDate: Date;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  courseName,
  studentName,
  completionDate
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current);
      const image = canvas.toDataURL('image/png');
      
      // Save certificate to user's certificates
      try {
        const result = await supabase.auth.getUser();
        const user = (result && (result as any).data && (result as any).data.user) ? (result as any).data.user : null;
        if (user && user.id) {
          await supabase.from('user_certificates').insert({
            user_id: user.id,
            course_name: courseName,
            issued_date: completionDate.toISOString(),
            certificate_url: image
          });
        } else {
          console.warn('No authenticated user found; certificate will not be saved to DB.');
        }
      } catch (error) {
        console.error('Failed to save certificate:', error);
      }

      // Download certificate
      const link = document.createElement('a');
      link.download = `${courseName.replace(/\s+/g, '_')}_Certificate.png`;
      link.href = image;
      link.click();
    }
  };

  const formattedDate = completionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
        <div className="p-6">
          <div ref={certificateRef} className="bg-gradient-to-br from-cyan-50 to-blue-50 p-12 rounded-lg border-8 border-double border-cyan-200">
            <div className="text-center">
              <Award className="h-16 w-16 text-cyan-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Completion</h2>
              <p className="text-gray-600 mb-8">This is to certify that</p>
              
              <p className="text-2xl font-bold text-cyan-600 mb-6">{studentName}</p>
              
              <p className="text-gray-600 mb-4">has successfully completed the course</p>
              
              <p className="text-2xl font-bold text-gray-900 mb-8">{courseName}</p>
              
              <p className="text-gray-600 mb-8">on {formattedDate}</p>
              
              <div className="max-w-xs mx-auto border-t-2 border-gray-300 pt-4">
                <p className="text-gray-500 text-sm">Course Instructor Signature</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
          <button
            onClick={downloadCertificate}
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};