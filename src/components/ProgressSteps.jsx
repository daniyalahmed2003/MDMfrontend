// const ProgressSteps = ({ step1, step2, step3 }) => {
//   return (
//     <div className="flex justify-center items-center space-x-4">
//       <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
//         <span className="ml-2">Login</span>
//         <div className="mt-2 text-lg text-center">✅</div>
//       </div>

//       {step2 && (
//         <>
//           {step1 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}
//           <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
//             <span>Shipping</span>
//             <div className="mt-2 text-lg text-center">✅</div>
//           </div>
//         </>
//       )}

//       <>
//         {step1 && step2 && step3 ? (
//           <div className="h-0.5 w-[10rem] bg-green-500"></div>
//         ) : (
//           ""
//         )}

//         <div className={`${step3 ? "text-green-500" : "text-gray-300"}`}>
//           <span className={`${!step3 ? "ml-[10rem]" : ""}`}>Summary</span>
//           {step1 && step2 && step3 ? (
//             <div className="mt-2 text-lg text-center">✅</div>
//           ) : (
//             ""
//           )}
//         </div>
//       </>
//     </div>
//   );
// };

// export default ProgressSteps;


// import axios from "../../utils/axios"; // update path according to file location
import axios from "axios";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {/* Step 1 - Login */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${step1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
          {step1 ? '✓' : '1'}
        </div>
        <span className={`mt-2 text-sm ${step1 ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
          Login
        </span>
      </div>

      {/* Connector 1 */}
      <div className={`h-1 w-16 ${step1 && step2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>

      {/* Step 2 - Shipping */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${step2 ? 'bg-green-500 text-white' : step1 ? 'bg-gray-200 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
          {step2 ? '✓' : '2'}
        </div>
        <span className={`mt-2 text-sm ${step2 ? 'text-green-600 font-medium' : step1 ? 'text-gray-500' : 'text-gray-400'}`}>
          Shipping
        </span>
      </div>

      {/* Connector 2 */}
      <div className={`h-1 w-16 ${step2 && step3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>

      {/* Step 3 - Summary */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${step3 ? 'bg-green-500 text-white' : step2 ? 'bg-gray-200 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
          {step3 ? '✓' : '3'}
        </div>
        <span className={`mt-2 text-sm ${step3 ? 'text-green-600 font-medium' : step2 ? 'text-gray-500' : 'text-gray-400'}`}>
          Summary
        </span>
      </div>
    </div>
  );
};

export default ProgressSteps;