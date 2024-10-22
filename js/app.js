const apiUrl = 'http://localhost:8080/api/v1/product';

async function fetchProducts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            data.forEach(product => {
                const listItem = document.createElement('tr');
                listItem.innerHTML = `
                    <td>${product.productId}</td>
                    <td>${product.productName}</td>
                    <td>${product.productPrice} €</td>
                    <td><button onclick="deleteProduct(${product.productId})">Eliminar</button></td>
                `;
                productList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

function deleteProduct(productId) {
    fetch(`${apiUrl}/delete/${productId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Producto eliminado con éxito.');
            fetchProducts();
        } else {
            alert('Error al eliminar el producto.');
        }
    })
    .catch(error => console.error('Error al eliminar el producto:', error));
}

document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);

    const newProduct = {
        productName: productName,
        productPrice: productPrice
    };

    fetch(`${apiUrl}/insert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => {
        if (response.ok) {
            alert('Producto añadido con éxito.');
            document.getElementById('product-form').reset(); // Limpiar el formulario
            fetchProducts(); // Recargar la lista después de añadir
        } else {
            alert('Error al añadir el producto.');
        }
    })
    .catch(error => console.error('Error al añadir el producto:', error));
});


fetchProducts();
