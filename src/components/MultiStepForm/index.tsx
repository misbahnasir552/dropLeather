// // MultiStepForm.js

// 'use client';

// import { useState } from 'react';

// const MultiStepForm = () => {
//   const [formData, setFormData] = useState({
//     personalInfo: { name: '', email: '' },
//     educationInfo: { school: '', degree: '' },
//   });

//   const [currentStep, setCurrentStep] = useState('personalInfo');

//   const handleInputChange = (section, field, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [field]: value,
//       },
//     }));
//   };

//   const handleNextStep = () => {
//     // You can add validation logic here before moving to the next step
//     // For simplicity, we're moving to the next step directly
//     switch (currentStep) {
//       case 'personalInfo':
//         setCurrentStep('educationInfo');
//         break;
//       // Add more cases for additional sections
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="mx-auto mt-8 max-w-xl rounded-md bg-warning-base p-6 shadow-md">
//       {/* Display progress in the header */}
//       <header className="mb-8">
//         <ul className="flex space-x-4">
//           <li
//             className={`text-lg font-semibold ${
//               currentStep === 'personalInfo'
//                 ? 'text-primary-base'
//                 : 'text-secondary-400'
//             }`}
//           >
//             Personal Info
//           </li>
//           <li
//             className={`text-lg font-semibold ${
//               currentStep === 'educationInfo'
//                 ? 'text-primary-600'
//                 : 'text-secondary-400'
//             }`}
//           >
//             Education Info
//           </li>
//           {/* Add more list items for additional sections */}
//         </ul>
//       </header>

//       {/* Display the form based on the current step */}
//       {currentStep === 'personalInfo' && (
//         <div>
//           <h2 className="mb-4 text-2xl font-semibold">Personal Information</h2>
//           <form>
//             <div className="mb-4">
//               <label className="text-gray-600 block text-sm font-medium">
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 className="border-gray-300 focus:border-blue-500 mt-1 w-full rounded-md border p-2 focus:outline-none"
//                 value={formData.personalInfo.name}
//                 onChange={(e) =>
//                   handleInputChange('personalInfo', 'name', e.target.value)
//                 }
//               />
//             </div>
//             <div className="mb-4">
//               <label className="text-gray-600 block text-sm font-medium">
//                 Email:
//               </label>
//               <input
//                 type="text"
//                 className="border-gray-300 focus:border-blue-500 mt-1 w-full rounded-md border p-2 focus:outline-none"
//                 value={formData.personalInfo.email}
//                 onChange={(e) =>
//                   handleInputChange('personalInfo', 'email', e.target.value)
//                 }
//               />
//             </div>
//           </form>
//           <button
//             className="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2 focus:outline-none"
//             onClick={handleNextStep}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {currentStep === 'educationInfo' && (
//         <div>
//           <h2 className="mb-4 text-2xl font-semibold">Education Information</h2>
//           <form>
//             <div className="mb-4">
//               <label className="text-gray-600 block text-sm font-medium">
//                 School:
//               </label>
//               <input
//                 type="text"
//                 className="border-gray-300 focus:border-blue-500 mt-1 w-full rounded-md border p-2 focus:outline-none"
//                 value={formData.educationInfo.school}
//                 onChange={(e) =>
//                   handleInputChange('educationInfo', 'school', e.target.value)
//                 }
//               />
//             </div>
//             <div className="mb-4">
//               <label className="text-gray-600 block text-sm font-medium">
//                 Degree:
//               </label>
//               <input
//                 type="text"
//                 className="border-gray-300 focus:border-blue-500 mt-1 w-full rounded-md border p-2 focus:outline-none"
//                 value={formData.educationInfo.degree}
//                 onChange={(e) =>
//                   handleInputChange('educationInfo', 'degree', e.target.value)
//                 }
//               />
//             </div>
//           </form>
//           <button
//             className="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2 focus:outline-none"
//             onClick={handleNextStep}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiStepForm;
