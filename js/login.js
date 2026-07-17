

 const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    
    const linkToSignUp = document.getElementById('linkToSignUp');
    const linkToLogin = document.getElementById('linkToLogin');

    // --- Switch/Toggle Forms Logic ---
    linkToSignUp.addEventListener('click', function() {
      loginForm.classList.add('hidden');
      signupForm.classList.remove('hidden');
    
    });

    linkToLogin.addEventListener('click', function() {
      signupForm.classList.add('hidden');
      loginForm.classList.remove('hidden');

    });

    // --- SIGN UP SYSTEM (Data Saving) ---
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const userValue = document.getElementById('signupEnrollment').value.trim();
      const passValue = document.getElementById('signupPass').value.trim();
      const confirmPassValue = document.getElementById('signupConfirmPass').value.trim();
      let isFormValid = true;

      // Errors Reset
      document.getElementById('signupUserError').textContent = '';
      document.getElementById('signupPassError').textContent = '';
      document.getElementById('signupConfirmPassError').textContent = '';

      // Registration Validation
      if(userValue.length < 3) {
        document.getElementById('signupUserError').textContent = 'User value must have 3+ characters.';
        isFormValid = false;
      }

      if(passValue.length < 6) {
        document.getElementById('signupPassError').textContent = 'Passwords must contain 6+ characters.';
        isFormValid = false;
      }

      if(passValue !== confirmPassValue) {
        document.getElementById('signupConfirmPassError').textContent = 'Passwords do not match!';
        isFormValid = false;
      }

      if(isFormValid) {
        // LocalStorage se puraane users nikalna
        let allUsers = JSON.parse(localStorage.getItem('activeUser')) || [];
        
        // Check karna ki username pehle se toh nahi hai
        const userExists = allUsers.some(u => u.username === userValue);
        if(userExists) {
          document.getElementById('signupUserError').textContent = 'User is already registered.';
          return;
        }

        // Naya user add karna
        allUsers.push({ username: userValue, password: passValue });
        localStorage.setItem('activeUser', JSON.stringify(allUsers));

        alert('Registration Successful! Please Sign In with your credentials.');
        signupForm.reset();
        linkToLogin.click(); // Auto-switch to Login Form
      }
    });

    // --- SIGN IN SYSTEM (Authentication) ---
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const userValue = document.getElementById('loginEnrollment').value.trim();
      const passValue = document.getElementById('loginPass').value.trim();
      let isFormValid = true;

      document.getElementById('loginUserError').textContent = '';
      document.getElementById('loginPassError').textContent = '';

      if(userValue.length < 3) {
        document.getElementById('loginUserError').textContent = 'User value must have 3+ characters.';
        isFormValid = false;
      }
      if(passValue.length < 6) {
        document.getElementById('loginPassError').textContent = 'Passwords must contain 6+ characters.';
        isFormValid = false;
      }

      if(isFormValid) {
        // LocalStorage se data laakar match karna
        const allUsers = JSON.parse(localStorage.getItem('activeUser')) || [];
        const accountFound = allUsers.find(u => u.username === userValue && u.password === passValue);

        if(accountFound) {
          alert('Authentication Complete! Welcome Back.');
          // Dashboard ya main page ka path

          localStorage.setItem('isLoggedIn', true)
          localStorage.setItem('loggedInUser' , accountFound.username)
          loginForm.reset()
        
        } else {
          alert('Invalid Username or Password! Please register if you are new.');
        }
        
        
      }
    });
