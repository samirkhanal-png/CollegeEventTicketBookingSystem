const events = [
    {
        id: 1,
        title: "Campus Tech Talk",
        date: "2023-12-05",
        time: "6:00 PM",
        location: "Lecture Hall A",
        price: 5,
        imageUrl: "event1.png",
        description: "Join us for an insightful talk on the future of AI and its impact on society.",
    },
    {
        id: 2,
        title: "College Music Night",
        date: "2023-12-10",
        time: "8:00 PM",
        location: "Student Union Hall",
        price: 10,
        imageUrl: "event2.jpg",
        description: "Enjoy a night filled with live music performances by talented college bands.",
    },
    {
        id: 3,
        title: "Art & Craft Workshop",
        date: "2023-12-15",
        time: "2:00 PM",
        location: "Art Studio",
        price: 8,
        imageUrl: "event3.jpg",
        description: "Get creative and learn new art and craft techniques in this hands-on workshop.",
    },
    {
        id: 4,
        title: "Coding Bootcamp Demo Day",
        date: "2023-12-20",
        time: "7:00 PM",
        location: "Innovation Lab",
        price: 0,
        imageUrl: "event5.jpg",
        description: "Witness the final projects of our coding bootcamp graduates and network with industry professionals.",
    },
    {
        id: 5,
        title: "Sports Day",
        date: "2023-12-22",
        time: "10:00 AM",
        location: "College Sports Grounds",
        price: 3,
        imageUrl: "event4.jpg",
        description: "Participate in or watch various sports events and cheer for your favorite teams.",
    }
];

const eventsGrid = document.getElementById("events-grid");
const modal = document.getElementById("event-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDateTime = document.getElementById("modal-date-time");
const modalLocation = document.getElementById("modal-location");
const modalDescription = document.getElementById("modal-description");
const closeButton = document.querySelector(".close-button");
const ticketQuantityDisplay = document.getElementById("ticket-quantity");
const decreaseTicketsButton = document.getElementById("decrease-tickets");
const increaseTicketsButton = document.getElementById("increase-tickets");
const totalPriceDisplay = document.getElementById("total-price");
const bookTicketsButton = document.getElementById("book-tickets");

let selectedEvent = null;
let ticketQuantity = 0;

function generateEventCards() {
    events.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("event-card");
        card.innerHTML = `
            <img src="${event.imageUrl}" alt="${event.title}">
            <div class="event-card-content">
                <h3>${event.title}</h3>
                <p>${event.date} ${event.time}</p>
                <p>${event.location}</p>
                <p>Starting from: <span class="price">$${event.price}</span></p>
            </div>
        `;
        card.addEventListener("click", () => openModal(event));
        eventsGrid.appendChild(card);
    });
}

function openModal(event) {
    selectedEvent = event;
    modalImage.src = event.imageUrl;
    modalTitle.textContent = event.title;
    modalDateTime.textContent = `${event.date} ${event.time}`;
    modalLocation.textContent = event.location;
    modalDescription.textContent = event.description;
    ticketQuantity = 0;
    ticketQuantityDisplay.textContent = ticketQuantity;
    updateTotalPrice();
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function updateTotalPrice() {
    if (selectedEvent) {
        totalPriceDisplay.textContent = `$${ticketQuantity * selectedEvent.price}`;
    }
}

decreaseTicketsButton.addEventListener("click", () => {
    if (ticketQuantity > 0) {
        ticketQuantity--;
        ticketQuantityDisplay.textContent = ticketQuantity;
        updateTotalPrice();
    }
});

increaseTicketsButton.addEventListener("click", () => {
    ticketQuantity++;
    ticketQuantityDisplay.textContent = ticketQuantity;
    updateTotalPrice();
});

closeButton.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

bookTicketsButton.addEventListener("click", () => {
    if (selectedEvent && ticketQuantity > 0) {
        alert(`You have booked ${ticketQuantity} ticket(s) for ${selectedEvent.title}. Total: $${ticketQuantity * selectedEvent.price}`);
        closeModal();
    } else {
        alert("Please select tickets before booking.");
    }
});

// Interactive Design Elements (Example: Button Hover Effects)
const ticketButtons = document.querySelectorAll(".ticket-selection button");
ticketButtons.forEach(button => {
    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#b2dfdb"; // Lighter teal on hover
    });
    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#eceff1";
    });
});

bookTicketsButton.addEventListener("mouseover", () => {
    bookTicketsButton.style.backgroundColor = "#00897b";
});

bookTicketsButton.addEventListener("mouseout", () => {
    bookTicketsButton.style.backgroundColor = "#009688";
});

generateEventCards();
