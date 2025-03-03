document.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem("role");
    const logoutBtn = document.getElementById("logout-btn");
    const loginBtn = document.getElementById("login-btn");
    const adminLink = document.getElementById("adminlink");

    if (loginBtn && logoutBtn) {
        if (role === "admin" || role === "user") {
            loginBtn.style.display = "none"; 
            logoutBtn.style.display = "block"; 
        } else {
            loginBtn.style.display = "block"; 
            logoutBtn.style.display = "none"; 
        }
    }
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("role"); 
            window.location.href = "login.html";
        });
    }
    if (adminLink) {
        adminLink.style.display = role === "admin" ? "block" : "none";
    }
    const slider = document.querySelector(".card-items");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const card = document.querySelector(".card");

    if (slider && prevBtn && nextBtn && card) {
        let scrollAmount = 0;
        const cardWidth = card.offsetWidth + 15;

        prevBtn.addEventListener("click", function () {
            scrollAmount -= cardWidth * 4;
            if (scrollAmount < 0) scrollAmount = 0;
            slider.style.transform = `translateX(-${scrollAmount}px)`;
        });

        nextBtn.addEventListener("click", function () {
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            scrollAmount += cardWidth * 4;
            if (scrollAmount > maxScroll) scrollAmount = maxScroll;
            slider.style.transform = `translateX(-${scrollAmount}px)`;
        });
    }
});
