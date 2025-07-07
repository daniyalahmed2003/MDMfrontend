// const Modal = ({ isOpen, onClose, children }) => {
//   return (
//     <>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="fixed inset-0 bg-black opacity-50"></div>
//           <div className="absolute top-[40%] right-[50%] bg-white p-4 rounded-lg z-10 text-right">
//             <button
//               className="text-black font-semibold hover:text-gray-700 focus:outline-none mr-2"
//               onClick={onClose}
//             >
//               X
//             </button>
//             {children}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Modal;


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-10">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;