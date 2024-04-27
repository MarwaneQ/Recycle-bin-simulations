let bottleBackGround = document.querySelector(".bottle div");
let bottleParagraph = document.querySelector(".bottle p");
let bottleSelected = document.querySelectorAll(".bottle-selected .small-bottle");

bottleSelected.forEach((bottle, index) => {
    bottle.addEventListener("click", () => {
        bottle.style.transition = "opacity 0.5s ease";
        bottle.style.opacity = 0;
        setTimeout(() => {
            bottle.remove();
            let remainingBottles = document.querySelectorAll(".bottle-selected .small-bottle").length;
            let percentage = (5 - remainingBottles) * 20; 
            percentage = Math.max(percentage, 0); 
            let liters = 100 - percentage; 
            bottleBackGround.setAttribute("data-purc", `${percentage}%`);
            bottleBackGround.style.height = `${percentage}%`;
            bottleParagraph.innerHTML = `${liters}%<br> <span>Remained</span>`;
            bottleParagraph.style.top = `${50 - (percentage / 2)}%`;

            // If the 4th bottle is clicked, send a POST request to the backend
            if (index === 3) {
                // Replace 'backendURL' with the actual URL of your backend endpoint
                fetch('backendURL', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ percentage: percentage }) // Send the percentage value to the backend
                })
                .then(response => {
                    // Handle response from the backend if needed
                })
                .catch(error => {
                    // Handle error if the request fails
                    console.error('Error:', error);
                });
            }
        }, 500); // Wait for 0.5 seconds for the transition to complete
    });
});

function removeActiveBottle() {
    bottleSelected.forEach((bottle) => {
        bottle.classList.remove("active");
    });
}

function addActiveBottle(index) {
    for (let i = 0; i <= index; i++) {
        bottleSelected[i].classList.add("active");
    }
}
