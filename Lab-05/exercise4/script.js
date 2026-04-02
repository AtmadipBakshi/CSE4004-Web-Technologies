let products = [];

window.onload = function () {
    loadProducts();
};

function loadProducts() {
    fetch("products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error loading JSON file");
            }
            return response.json();
        })
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => {
            showMessage(error.message, "error");
        });
}

function displayProducts(list) {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    let totalInventory = 0;

    list.forEach(product => {
        const total = product.price * product.quantity;
        totalInventory += total;

        const row = `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td class="${product.quantity < 5 ? 'low-stock' : ''}">
                    ${product.quantity}
                </td>
                <td>${total}</td>
            </tr>
        `;

        table.innerHTML += row;
    });

    document.getElementById("totalValue").textContent = totalInventory;
}

function addProduct() {
    const id = parseInt(productId.value);
    const name = productName.value;
    const price = parseFloat(productPrice.value);
    const quantity = parseInt(productQty.value);

    if (!id || !name || isNaN(price) || isNaN(quantity)) {
        showMessage("All fields are required!", "error");
        return;
    }

    if (products.find(p => p.id === id)) {
        showMessage("Product ID already exists!", "error");
        return;
    }

    products.push({ id, name, price, quantity });
    displayProducts(products);
    showMessage("Product added successfully!", "success");
}

function updateProduct() {
    const id = parseInt(productId.value);
    const price = parseFloat(productPrice.value);
    const quantity = parseInt(productQty.value);

    const product = products.find(p => p.id === id);

    if (!product) {
        showMessage("Product not found!", "error");
        return;
    }

    if (!isNaN(price)) product.price = price;
    if (!isNaN(quantity)) product.quantity = quantity;

    displayProducts(products);
    showMessage("Product updated successfully!", "success");
}

function deleteProduct() {
    const id = parseInt(productId.value);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        showMessage("Product not found!", "error");
        return;
    }

    products.splice(index, 1);
    displayProducts(products);
    showMessage("Product deleted successfully!", "success");
}

function searchProduct() {
    const keyword = searchBox.value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    displayProducts(filtered);
}

function showMessage(msg, type) {
    const message = document.getElementById("message");
    message.textContent = msg;
    message.className = type;
}