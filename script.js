document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.valor');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / 200; // Smaller increment for smoother animation

        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count); // Use Math.ceil to avoid decimal values
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });

    const form = document.getElementById('form-contato');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch("https://formsubmit.co/ajax/seuemail@exemplo.com", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success === 'true') {
                alert('Mensagem enviada com sucesso!');
                form.reset();
            } else {
                alert('Erro ao enviar a mensagem. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Erro ao enviar a mensagem. Por favor, tente novamente.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const saibaMaisButton = document.querySelector('#hero button');

    saibaMaisButton.addEventListener('click', () => {
        window.location.href = 'explicacao.html';
    });
});