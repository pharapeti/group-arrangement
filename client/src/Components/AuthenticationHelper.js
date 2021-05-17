export function signout() {
  fetch('http://localhost:6060/api/users/auth', {
        method: 'delete',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/'
      }
    })
}
