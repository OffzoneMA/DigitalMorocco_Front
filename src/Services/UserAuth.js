export const isAuthenticated = () => {
    const userToken = sessionStorage.getItem('userToken');
    return !!userToken; // Retourne true si le token existe, sinon false
  };