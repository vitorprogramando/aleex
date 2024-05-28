document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const search = document.getElementById('search');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    let users = [];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const id = formData.get('id');
        const method = id ? 'update' : 'create';

        fetch(`${method}.php`, {
            method: 'POST',
            body: formData
        }).then(response => response.text())
          .then(() => {
              form.reset();
              loadUsers();
          });
    });

    search.addEventListener('input', function() {
        loadUsers(search.value);
    });

    userTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit')) {
            const userId = e.target.dataset.id;
            const user = users.find(u => u.id == userId);
            document.getElementById('userId').value = user.id;
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone;
        } else if (e.target.classList.contains('delete')) {
            const userId = e.target.dataset.id;
            if (confirm('Tem certeza que deseja deletar o usuário?')) {
                fetch('delete.php', {
                    method: 'POST',
                    body: new URLSearchParams({ id: userId })
                }).then(() => loadUsers());
            }
        }
    });

    function loadUsers(query = '') {
        fetch(`read.php?search=${query}`)
            .then(response => response.json())
            .then(data => {
                users = data;
                userTable.innerHTML = users.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>
                            <button class="edit" data-id="${user.id}">Editar <i class="fa-solid fa-pen"></i></button>
                            <button class="delete" data-id="${user.id}">Excluir <i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('');
            });
    }

    loadUsers();
});
