//const URL = 'https://palabras-aleatorias-public-api.herokuapp.com/multiple-random';
//const URL = 'https://palabras-aleatorias-public-api.herokuapp.com/palabras-aleatorias?_page=1&_size=5';
const URL = 'https://api-palabras.herokuapp.com/palabras';

const getDiccionario = async () => {
    try {
        const data = await axios.get(URL);
        console.log(data);    
    } catch (error) {
        cosnole.log(error);
    }
    
}


//getDiccionario();
