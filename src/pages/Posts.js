import useAxios from "../hook/useAxios"
import { Constants } from "../constants"
import { useState } from "react";
const {BASE_API_URL} = Constants;

export const Posts = () => {
const [data, error, loading] = useAxios(`${BASE_API_URL}/posts`)
const [currentPage, setCurrentPage] = useState(1); //partendo da pagina 1
const postsPerPage= 10; // 10 perchè 100 
const lastPosts = currentPage * postsPerPage;
const firstPosts= lastPosts - postsPerPage; 

const pageCount = Math.ceil(data.length / postsPerPage); //arrotondo per il nr delle pagien
const currentPosts = data.slice(firstPosts, lastPosts); //cosi ci viene restituito un nuovo array con gli elementi selezionati, dall'inizio alla fine

if(error) {
    return <h3>Error: {error.message}</h3>
  }if (loading) {
    return <h3>Loading...</h3>
  }


const handleClick = (e) => {
  const {step} = e.target.dataset;
  if(
    (currentPage === 1 && step > 0 ) || 
    (currentPage === pageCount && step < 0) ||
    (currentPage > 1 && currentPage < pageCount) 
  ){
    setCurrentPage(currentPage + Number(step))
  }
}
const postsList = currentPosts.map((post)=> (
  <li key={post.id}  className="p-3 m-2 font-extrabold border-2 border-black border-solid">
    <div>
      <h2  className="text-black">{post.title}</h2>
      <h2 className="text-red-600">{post.body}</h2>
    </div>
  </li>
))

return(
        <div style={{backgroundImage: "url(/picture.webp)", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition: "center" }}> 
        <h1 className="flex justify-center mb-2 text-2xl font-bold dark:text-white md:text-5xl lg:text-6xl">Posts</h1>
        <ul>
          {postsList}
          <button onClick={handleClick} data-step={-1}>←
          </button>
          <span> Page {currentPage} of {pageCount}</span>
          <button onClick={handleClick} data-step={1}> →</button>
        </ul>
        </div>
    )
}
/*Non riesco a mettere il bg diversamente...
https://hygraph.com/blog/react-pagination
https://www.youtube.com/watch?v=jmNHcW_oszg
https://www.freecodecamp.org/italian/news/come-costruire-un-componente-di-paginazione-personalizzato-in-react/*/

//ottenere l'elenco dei post dal server con il link mandato e messo dentro const import. 
//renderizzare una tabella che ci fa vedere i post impaginandoli a gruppi di 10. ogni pagina 10 post
//nella tabella una colonna con la possibilità di eliminare uno del post 