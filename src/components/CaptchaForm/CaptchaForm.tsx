// // components/CaptchaForm.js

// 'use client';

// import { useEffect } from 'react';

// declare global {
//   interface Window {
//     antcap: {
//       initValidator: (config: any) => void;
//       getCapchaData: () => any;
//       resetStatus: () => void;
//     };
//   }
// }

// const CaptchaForm: React.FC = () => {
//   useEffect(() => {
//     // Include the RDS script dynamically
//     const script = document.createElement('script');
//     script.src =
//       'https://rds_on_premises/rds/prod/ua_aphome_h5_pwdLogin.js?t={2024010403}';
//     script.type = 'text/javascript';
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       // Initialize CAPTCHA once the script is loaded
//       window.addEventListener('antcapready', initCaptcha);
//     };

//     return () => {
//       // Clean up script tag on component unmount
//       document.head.removeChild(script);
//     };
//   }, []);

//   const initCaptcha = () => {
//     window.antcap.initValidator({
//       params: {
//         type: 'slide', // Use a sliding puzzle CAPTCHA
//         appId: 'ua_aphome_h5_pwdLogin', // Provided by your administrator
//         bizNo: 'some UUID',
//         containerId: 'J_clickWrap',
//       },
//       success(res: any) {
//         // Actions to take when the CAPTCHA is successfully validated
//         console.log('CAPTCHA validation successful');
//         // ...do something...
//       },
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const collectedData = window.antcap.getCapchaData(); // Get collected CAPTCHA data
//     console.log('Collected Data:', collectedData);

//     // Implement your logic to send collectedData to the RDS server using an API.
//     // Replace the placeholder URL with your actual API endpoint
//     fetch('/api/captcha/consult', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         source: 'JavaScript',
//         information: collectedData,
//         appId: 'yourAppId', // Provided by your administrator
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the RDS output decision
//         const { decision } = data;

//         // Implement your logic based on the decision (accept or reject)
//         if (decision === 'accept') {
//           console.log('yesssssssssssssssssssssss');
//         } else if (decision === 'reject') {
//           console.log('nooooooooooooooooooooooooooooo');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         // Handle errors (timeout, network issues, etc.)
//       })
//       .finally(() => {
//         // Reset CAPTCHA status for the next recording
//         window.antcap.resetStatus();
//       });
//   };

//   return (
//     <div className="example-item">
//       <p>Click Mode</p>
//       <form onSubmit={handleSubmit} method="post" target="/result">
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" defaultValue="username@demo.com" />
//         <br />
//         <label htmlFor="password">Password:</label>
//         <input type="password" id="password" defaultValue="pwd" />
//         <div id="J_clickWrap"></div>
//         <button className="btn-submit" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CaptchaForm;
