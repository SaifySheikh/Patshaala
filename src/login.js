    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });


    //Sujal


    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(loginForm).entries()
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        const result = await response.json();
        console.log(result.res._id)
        window.location.href = `/main.html?recruiterId=${result.res._id}`
    });


    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(signupForm).entries()
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        const result = await response.json();
        console.log(result.res._id)
        window.location.href = `/main.html?recruiterId=${result.res._id}`
    });


    //Saify
  

  
  const collegeSuggestions = [
    'Shri Ramdeobaba College',
    'Shri kamla nehru College',
    'Raisoni College',
    'Yashwantrao College',
    'St. Palloti College',
    
  ];

  const collegeInput = document.getElementById('collegeInput');

  collegeInput.addEventListener('input', function() {
    const userInput = collegeInput.value.toLowerCase();
    const suggestionContainer = document.getElementById('suggestionContainer');

    suggestionContainer.innerHTML = '';

    
    const filteredSuggestions = collegeSuggestions.filter(college =>
      college.toLowerCase().includes(userInput)
    );

    filteredSuggestions.forEach(suggestion => {
      const suggestionElement = document.createElement('div');
      suggestionElement.classList.add('suggestion');
      suggestionElement.textContent = suggestion;

      suggestionElement.addEventListener('click', function() {
        
        collegeInput.value = suggestion;
        
        suggestionContainer.innerHTML = '';
      });

      suggestionContainer.appendChild(suggestionElement);
    });
  });