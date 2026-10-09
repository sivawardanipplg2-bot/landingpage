const form = document.querySelector('form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'siva' && password === '1234') {
                window.location.href = 'index.html';
            } else {
                alert('Username atau password salah!');
            }
        });