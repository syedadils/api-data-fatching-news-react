import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';


function App() {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

    function getTrendingNews(){
      
      const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: {safeSearch: 'Off', textFormat: 'Raw'},
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '279a50ebe4msha32b926eac43d80p190c29jsnb8c5cd2aaab1',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };

      
      axios
      .request(options)
      .then(function (response) {
        console.log(response.data);

        setData(response.data.value)

      }).catch(function (error) {
        console.error(error);
      });
    }

    getTrendingNews(); 

  }, [])

  const getNews = (e) => {
    e.preventDefault();


    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {q: query, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '279a50ebe4msha32b926eac43d80p190c29jsnb8c5cd2aaab1',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };
    
    setIsLoading(true)
    axios
    .request(options)
    .then(function (response) {
      setIsLoading(false)
      console.log(response.data.value);
      setData(response.data.value);

    })
    .catch(function (error) {
      setIsLoading(false)
      console.error(error);
    });
  }

  return (
    <div className='content'>

      <form onSubmit={getNews}>

        <input 
        type="text" 
        placeholder='Enter your topic name' 
        onChange={(e) => {
          setQuery(e.target.value)
        }} 
        />

        <button type='submit'>Get News</button>

      </form>

      <div className='content'>

        <div className='loader'>
        {(isLoading) ? "Loading..." : ""}
        </div>

        {data.map(eachPost=> (
       <div className='post' key={eachPost.name}>
          <a 
          className="tittle"
          href={eachPost.url}
          target="_blank" rel='noreferrer'
          >
          {eachPost.name}
          </a>
          <span>{moment(eachPost?.datePublished).format('Do MMMM, h:mm: a')}</span>
          <h3>{eachPost?.description}</h3>
          <img className='image' src={eachPost?.image?.thumbnail?.contentUrl?.replace("pid=News",  "")} alt="" />
        </div>))}
      </div>

    </div>
  );
}

export default App;
