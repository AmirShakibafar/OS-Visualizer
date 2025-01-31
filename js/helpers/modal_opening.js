document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".guide-item").forEach(item => {
        const tooltipText = item.getAttribute("data-tooltip");
        if (tooltipText) {
            const tooltip = document.createElement("span");
            tooltip.classList.add("tooltip");
            tooltip.textContent = tooltipText;
            item.appendChild(tooltip);

        
            let hoverTimeout;
            item.addEventListener("mouseenter", () => {
                hoverTimeout = setTimeout(() => {
                    tooltip.style.display = "block";
                }, 100);
            });
            
            item.addEventListener("mouseleave", () => {
                clearTimeout(hoverTimeout);
                tooltip.style.display = "none";
            });
        }
    });

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
        });
    });
});