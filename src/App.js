import './App.css';
import React, { useEffect, useState } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {

  const [images, setImages] = useState([]);
  const [isloading, setIsoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=37965562-d6fe02fc2ab455413fa540dc5&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);

  return (
    <div className='container mx-auto'>
      <ImageSearch searchText={(text) => setTerm(text)}/>

      {!isloading && images.length === 0 && <h1 className='text-5xl text-center mx-auto mt-32'> No images found</h1> }
      {isloading ? <h1 className='text-6xl text-center mx-auto mt-32'> Loading... </h1>

    :<div className="grid grid-cols-3 gap-4">   
     {images.map( image => (
          <ImageCard key={image.id} image={image}/>
        ))}

      </div>}
    </div>

  );
}

export default App;
