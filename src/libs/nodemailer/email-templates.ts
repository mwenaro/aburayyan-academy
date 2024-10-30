export const generateAdminNotificationTemplate = (
  studentDetails: string,
  guardianDetails: string,
  registrationDate: string,
  totalNoStudents: any,
  url: string
): string => {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>New User Registration</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: 'Arial', sans-serif;
            }
          </style>
        </head>
        <body class="bg-gray-100 text-gray-700">
          <div class="max-w-xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-lg" >
            <!-- Header -->
            <div class="text-center">
              <img src="https://ict.aburayyanacademy.com/favicon/aburayyan-logo.png" alt="Aburayyan Academy Logo" class="w-12 h-12 mx-auto mb-4" style="width:100px;height:auto" />
              <h1 class="text-xl font-bold text-gray-800">New User Registration</h1>
            </div>
  
            <!-- Message Body -->
            <div class="mt-4">
              <p class="text-gray-700">
                Dear Admin,
              </p>
              <p class="mt-2">
                A new user has successfully registered on <strong>the ICT Holiday Progeam</strong> raising the <strong>total Number to : ${totalNoStudents}</strong>. Please find the user details below:
              </p>
  
              <ul class="mt-4">
                <li><strong>Student's Details:</strong> ${studentDetails}</li>
                <li><strong>Parent/Guadian:</strong> ${guardianDetails}</li>
                <li><strong>Registration Date:</strong> ${registrationDate}</li>
              </ul>
  
              <p class="mt-4">
                Kindly take any necessary actions regarding this new registration. <br>Click <a href="${url}"> Here to View List</a>
                
              </p>
              
            </div>
  
            <!-- Footer -->
            <div class="text-center mt-8 text-sm text-gray-500">
              <p>Aburayyan Academy</p>
              <p>123 Learning Street, Education City</p>
              <p><a href="mailto:system@aburayyanacademy.com" class="underline">Contact Support</a> for any inquiries.</p>
            </div>
          </div>
        </body>
      </html>
    `;
};

export const generateUserRegistrationTemplate = (
  userName: string,
  registrationLink: string
): string => {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Welcome to Aburayyan Academy</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: 'Arial', sans-serif;
            }
          </style>
        </head>
        <body class="bg-gray-100 text-gray-700">
          <div class="max-w-xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-lg">
            <!-- Header -->
            <div class="text-center">
              <img src="https://ict.aburayyanacademy.com/favicon/aburayyan-logo.png" alt="Aburayyan Academy Logo" class="w-32 mx-auto mb-4" />
              <h1 class="text-xl font-bold text-gray-800">Welcome, ${userName}!</h1>
            </div>
  
            <!-- Message Body -->
            <div class="mt-4">
              <p class="text-gray-700">
                Congratulations on successfully registering at <strong>Aburayyan Academy</strong>! Please confirm your registration by clicking the link below.
              </p>
  
              <div class="text-center mt-6">
                <a href="${registrationLink}" class="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700">Confirm Registration</a>
              </div>
  
              <p class="mt-4">
                If you did not create an account, you can safely ignore this email.
              </p>
            </div>
  
            <!-- Footer -->
            <div class="text-center mt-8 text-sm text-gray-500">
              <p>Aburayyan Academy</p>
              <p>123 Learning Street, Education City</p>
              <p><a href="mailto:ict-registration@aburayyanacademy.com" class="underline">Contact Support</a> for any inquiries.</p>
            </div>
          </div>
        </body>
      </html>
    `;
};
