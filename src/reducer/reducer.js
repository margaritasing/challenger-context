export const inicialState = {
    movies:[],   
    user:null, 
    filterMovies: [],
    filterGenero: [],

}




export const actionType={
    MOVIES:"MOVIES",
    USER:"USER",
    FILTERGENERO:"FILTERGENERO",
    FILTER:"FILTER"
}


const reducer=(state, action)=>{

    console.log(action)

    switch (action.type) {

        case "MOVIES":

        return{
            ...state,
            movies:action.movies,
            filterMovies:action.movies
        }

        case "USER":
            return{
                ...state,
                user: action.user
            }

        case "FILTER":
            const filterMovies = state.movies.filter( movie => movie.title.toLowerCase().startsWith(action.value.value.toLowerCase().trim()))          
              
            return{
                ...state,
                filterMovies:filterMovies,
            }
            
           case "FILTERGENERO":

                const filterGenero = state.movies.filter(movie => movie.genre_ids.includes(action.value))
           return{
                ...state,
                filterGenero:filterGenero,
                filterMovies:filterGenero
                
           }
    
        default:return state
    }





}

export default reducer;