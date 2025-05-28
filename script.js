import emailjs from 'https://esm.sh/@emailjs/browser';

  emailjs.init('A6nrAxInVgOdCQIo3'); // replace with actual public key

  document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value.trim();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const formData = {
      name,
      phone,
      email,
      service,
      timestamp
    };

    Promise.all([
      emailjs.send('service_vi9wf5z', 'template_3kyd08j', formData),
      fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY4MDYzMDA0MzM1MjZkNTUzNTUxMzMi_pc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    ])
    .then(() => {
      alert("Redirecting to thank-you page...");
      window.location.href = "thank-you.html";
    })
    .catch((error) => {
      console.error("Submission error:", error);
      alert("Form submission failed. Check console for details.");
    });
  });
