import React,{useState,useEffect} from 'react'
import './App.css'
import Auth from './components/Auth'
import { auth, db,storage } from './Config/Firebase'
import {getDocs,collection, addDoc,deleteDoc,doc} from 'firebase/firestore'
import { ref ,uploadBytes} from 'firebase/storage'

export default function App() {
  const [movieList, setMovieList] = useState([])

  const [newMovieTitle,setnewMovieTitle]=useState("")

  const [newMRD,setnewMRD]=useState(0)

  const[newMovieOscar,setnewMovieOscar]=useState(false)

  const [fileUpload, setfileUpload] = useState(null)  

  const moviesCollectionRef = collection(db,"movies")
  const getMovieList=async()=>{
    //Read The Data
    // See the Movie List
    try {
      
    const data = await getDocs(moviesCollectionRef)
    const filteredData =data.docs.map((doc)=>({...doc.data(),id:doc.id}))
    console.log(filteredData)
    setMovieList(filteredData)
    } catch (error) {
      console.error(error)
    }
  }
  const deleteMovie=async(id)=>{
    try {
      const movieDoc=doc(db,"movies",id)
      await deleteDoc(movieDoc)
      setMovieList((prevMovieList) =>
      prevMovieList.filter((movie) => movie.id !== id)
    )
    } catch (error) {
      console.error(error)
    }
  }

  
  const uploadFile=async()=>{
    if (!fileUpload) {
      return
    }
    const filesFolderRef =ref(storage,`ProjectFolder/${fileUpload.name}`)
   
    try {
      await uploadBytes(filesFolderRef,fileUpload)
    } catch (error) {
      console.error(error)
    }

  }

  useEffect(()=>{
    
    getMovieList();
   
  },[])


  const onsubmitMovie=async()=>{
    try {
      await addDoc(moviesCollectionRef,{
        Title:newMovieTitle,
        ReleaseYear:newMRD,
        ReceiveOscar:newMovieOscar,
        userId:auth?.currentUser?.uid
      })
      getMovieList()
    } catch (error) {
      console.error(error)
    }
  }

 

  return (
    <div>
      FireBase Course
      <Auth/>
      <div>
        <input type="text" placeholder='movieTitle' onChange={(e)=>setnewMovieTitle(e.target.value)}/>
        <input type="number" placeholder='releaseDate' onChange={(e)=>setnewMRD(Number(e.target.value))}/>
        <input type="checkbox"  checked={newMovieOscar} onChange={(e)=>setnewMovieOscar(e.target.checked)}/>
        <button onClick={onsubmitMovie}>Submit Movie</button>
      </div>

      <div>
      {movieList.map((movie) => {
        return (
          <div key={movie.id}> 
            <h1 style={{color:movie.ReceiveOscar?"green":"red"}}>{movie.Title}</h1>
            <p>Date: {movie.ReleaseYear}</p>
            <button onClick={()=>{deleteMovie(movie.id)}}>Delete Movie</button>
          </div>
        );
      })}
      </div>
      <div>
        <input type="file" onChange={(e)=>setfileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  )
}
