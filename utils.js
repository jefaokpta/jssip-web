
const BACKEND_URL = credentials.pabxUrl

async function getCallToken(token) {
    try{
        const response = await fetch(`${BACKEND_URL}/auth/call-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Erro ao obter o token:', error.message);
    }

}