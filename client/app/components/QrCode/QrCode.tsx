"use client";
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaQrcode } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

interface User {
  portfolioUserName: string;
  avatar?: {
    url: string;
  };
}

interface QrCodeProps {
  user: User;
}

const QrCode = ({ user }: QrCodeProps) => {
  const [showQR, setShowQR] = useState(false);
  const portfolioUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/portfolio/${user.portfolioUserName}`
    : '';

  const handleClick = () => {
    setShowQR(true);
  };

  return (
    <>
      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold dark:text-white">Share Portfolio</h3>
              <button 
                onClick={() => setShowQR(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label="Close QR code modal"
              >
                <IoClose size={24} />
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-4 bg-white rounded border border-gray-200 mb-4">
                <QRCodeSVG 
                  value={portfolioUrl} 
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                Scan this QR code to visit your portfolio
              </p>
              
              <div className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded break-all">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {portfolioUrl}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="fixed bottom-8 right-[105px] z-50 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors cursor-pointer shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
        onClick={handleClick}
        aria-label="Share Portfolio QR Code"
      >
        <FaQrcode className="text-3xl" />
      </div>
    </>
  );
};

export default QrCode;
