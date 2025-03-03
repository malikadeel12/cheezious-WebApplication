document.addEventListener("DOMContentLoaded", function () {
    const userRole = localStorage.getItem("role");
    if (userRole !== "admin") {
        alert("Access Denied! Only Admins can access this page.");
        window.location.href = "index.html";
    }

    fetchItems();
});

// Fetch and display items
function fetchItems() {
    axios.get('http://localhost:8002/items/all')
        .then(response => {
            const items = response.data.items || response.data;
            let itemsTableBody = document.getElementById('itemsTableBody');
            itemsTableBody.innerHTML = '';

            items.forEach(item => {
                itemsTableBody.innerHTML += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.categorize}</td>
                        <td>${item.description}</td>
                        <td>Rs. ${item.price}</td>
                        <td><img src="${item.imageUrl}" alt="Item Image" style="width: 50px; height: 50px;"></td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editItem('${item._id}', '${item.name}','${item.categorize}', '${item.description}', '${item.price}', '${item.imageUrl}')">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteItem('${item._id}')">Delete</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error fetching items:', error));
}

// Add a new item
function addItem() {
    const newItem = {
        name: document.getElementById("itemName").value,
        categorize: document.getElementById("itemcatag").value,
        description: document.getElementById("itemDescription").value,
        price: document.getElementById("itemPrice").value,
        imageUrl: document.getElementById("itemImageUrl").value
    };

    axios.post('http://localhost:8002/items/add', newItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
        .then(() => {
            alert("Item added successfully!");
            fetchItems();
        })
        .catch(error => console.error('Error adding item:', error));
}

// Delete an item
function deleteItem(itemId) {
    if (confirm("Are you sure you want to delete this item?")) {
        axios.delete(`http://localhost:8002/items/delete/${itemId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(() => {
                alert("Item deleted successfully!");
                fetchItems();
            })
            .catch(error => {
                console.error('Error deleting item:', error);
                alert("Failed to delete item. Please try again.");
            });
    }
}

// Edit an item
function editItem(itemId, name, description, price, imageUrl) {
    document.getElementById("itemName").value = name;
    document.getElementById("itemcatag").value = categorize;
    document.getElementById("itemDescription").value = description;
    document.getElementById("itemPrice").value = price;
    document.getElementById("itemImageUrl").value = imageUrl;

    document.getElementById("itemName").focus();

    const addButton = document.querySelector("button[onclick='addItem()']");
    addButton.removeAttribute("onclick");
    addButton.textContent = "Update Item";
    addButton.className = "btn btn-primary";
    addButton.setAttribute("onclick", `updateItem('${itemId}')`);
}

// Update an item
function updateItem(itemId) {
    const updatedItem = {
        name: document.getElementById("itemName").value,
        categorize: document.getElementById("itemcatag").value,
        description: document.getElementById("itemDescription").value,
        price: document.getElementById("itemPrice").value,
        imageUrl: document.getElementById("itemImageUrl").value
    };

    axios.put(`http://localhost:8002/items/update/${itemId}`, updatedItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
        .then(() => {
            alert("Item updated successfully!");
            fetchItems();

            document.getElementById("itemName").value = "";
            document.getElementById("itemcatag").value = "";
            document.getElementById("itemDescription").value = "";
            document.getElementById("itemPrice").value = "";
            document.getElementById("itemImageUrl").value = "";

            const updateButton = document.querySelector("button[onclick^='updateItem']");
            if (updateButton) {
                updateButton.textContent = "Add Item";
                updateButton.className = "btn btn-success";
                updateButton.setAttribute("onclick", "addItem()");
            }
        })
        .catch(error => console.error(error));
}
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:8002/orders/orderdata");
        const data = await response.json();
        console.log("Fetched Orders:", data); // Debugging Log

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format: Expected an array.");
        }

        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = ""; // Clear previous entries

        data.forEach(order => {
            const name = order.name || order.customerName; // Handle both cases
            const phone = order.phone || order.customerPhone;
            const address = order.address || order.customerAddress;
            const totalPrice = order.totalPrice || order.price; // Ensure correct field

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${name}</td>
                <td>${phone}</td>
                <td>${address}</td>
                <td>
                    <ul>
                        ${order.cart_items.map(item => `<li>${item.name} (x${item.quantity}) - Rs. ${item.price}</li>`).join("")}
                    </ul>
                </td>
                <td>${totalPrice}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching orders:", error);
    }
});
