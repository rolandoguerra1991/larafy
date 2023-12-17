export const authGuard = async (to, from, next) => {
    await axios.get('/api/user')
      .then(({ data }) => {
        console.log(data)
      }).catch(({ response }) => {
        if (response.statusText === "Unauthorized") {
          next({ name: 'Login' });
        }
      })
}
