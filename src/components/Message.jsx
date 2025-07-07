// const Message = ({ variant, children }) => {
//   const getVariantClass = () => {
//     switch (variant) {
//       case "succcess":
//         return "bg-green-100 text-green-800";
//       case "error":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-blue-100 text-blue-800";
//     }
//   };

//   return <div className={`p-4 rounded ${getVariantClass()}`}>{children}</div>;
// };

// export default Message;



const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":  // Fixed typo in "success"
        return "bg-green-50 text-green-700 border border-green-200";
      case "error":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-blue-50 text-blue-700 border border-blue-200";
    }
  };

  return (
    <div className={`p-3 rounded-lg text-sm ${getVariantClass()}`}>
      {children}
    </div>
  );
};

export default Message;