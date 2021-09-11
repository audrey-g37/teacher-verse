// const loginForm = async (e) => {
//   e.preventDefault();

//   const email = document.querySelector("#email").value.trim();
//   const password = document.querySelector("#password").value.trim();

//   if (email && password) {
//     const response = await fetch("/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!response.ok) {
//       console.log("Login Failed");
//       document.location.replace("/login");
//     }
//   }
// };
