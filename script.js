document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Thanks for your message!");
  this.reset();
});

function sendMail(){
  let parms = {
    name : document.getElementById("name").value,
    email : document.getElementById("email").value,
    phone : document.getElementById("phone").value,
    message : document.getElementById("message").value,
  }

  emailjs.send("service_h9lw09f","template_6yc5fed",parms)
}