import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import './bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Leftside from "./component/LeftSide";
import Rightside from "./component/RightSide";

function App() {
  // state here

  const testRef = useRef(null);

  const [scrapInfo, setscrapInfo] = useState({
    url: "",
    title: "",
    titleChar: 0,
    des: "",
    desChar: 0,
    keywords: "",
    fetchText: 'Fetch Data'
  });
  // destructure items
  const { url, title, des, desChar, titleChar, keywords, fetchText } = scrapInfo;

  const [showdata, setShowdata] = useState(false);
  const [showRatings, setShowRatings] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [responsive, setresponsive] = useState("desktop"); //mobile ,desktop
  const [capitalizeTitle, setCapitalizeTitle] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [titleWidth, setTitleWidth] = useState(0);
  const [desWidth, setdesWidth] = useState(0);


  // useeffect
  useEffect(() => {
    
  }, []);

  // meta perse



  // handle checkbox
  const handledate = (e) => {
    setShowdata(!showdata);
  };
  const handleratings = (e) => {
    setShowRatings(!showRatings);
  };
  const handlead = (e) => {
    setShowAd(!showAd);
  };
  const handlemap = (e) => {
    setShowMap(!showMap);
  };
  const handleHeatmap = (e) => {
    setShowHeatmap(!showHeatmap);
  };

  // handle change
  const handleChange = (e) => {
    setscrapInfo({
      ...scrapInfo,
      [e.target.name]: e.target.value,
    });


    // title
    setTimeout(()=>{
      let titleEl = document.getElementById("char_title");
      let width = titleEl.clientWidth;
      setTitleWidth(width)
    }, 10);

    // des
    setTimeout(()=>{
      let desEl = document.getElementById("char_description");
      let dwidth = desEl.clientWidth;
      setdesWidth(dwidth)
    }, 10);



  };

  // fetch meta data

  const fetchMetaData = (e) => {
    e.preventDefault();

    setscrapInfo({
      ...scrapInfo,
      fetchText: 'Fetching...'
    });

    const options = {
      method: 'GET',
      url: `${appLocalizer.apiUrl}/sujan/v1/serp`,
      params: {url: url},
      
    };
    
    axios.request(options).then(function (response) {
      setscrapInfo({
        ...scrapInfo,
        title: response.data.title,
        des: response.data.description,
        keywords: response.data.keywords,
        fetchText: 'Fetch Data'
      });
    }).catch(function (error) {
      console.error(error);
    });
  }




  // handle reset
  const handleReset = (e) => {
    e.preventDefault();
    setShowdata(false);
    setShowRatings(false);
    setShowAd(false);
    setShowMap(false);
    setShowHeatmap(false);

    setscrapInfo({
      ...scrapInfo,
      title : '',
      des : '',
      url: ''
    });

    
  };

  // handle responsive
  const handledesktop = (e) => {
    setresponsive("desktop");
  };

  const handlemobile = (e) => {
    setresponsive("mobile");
  };

  // makebold
  
  let desArray = des.toLowerCase().split(' ');

  const makeBold = (e) => {

    setscrapInfo({
      ...scrapInfo,
      keywords: e.target.value
    });

    let wordsToBold = e.target.value.toLowerCase().split(',');
    let wordsToBoldBySpace = e.target.value.toLowerCase().split(' ');

    document.getElementById('metaContent').innerHTML = des.replace(new RegExp('(\\b)(' + wordsToBold.join('|') + ')(\\b)','ig'), '$1<b>$2</b>$3');

    document.getElementById('metaContent').innerHTML = des.replace(new RegExp('(\\b)(' + wordsToBoldBySpace.join('|') + ')(\\b)','ig'), '$1<b>$2</b>$3');

    // wordsToBold.map((match) => {
    //   desArray.map((des) => {
    //     if (match == des) {
    //       // let replace = <b>${des}</b>;
    //       let replace = des.bold().toUpperCase();
    //       let ind = desArray.indexOf(des);
    //       desArray[ind] = replace;
    //       setscrapInfo({
    //         ...scrapInfo,
    //         des: desArray.join(' ')
    //       });
    //     } else {
    //       console.log('not found');
    //     }

    //   })
    // })


  };




  // Capitalize Title
  const handleCapitalize = () => {
    setCapitalizeTitle(true);
  }


  // handleExportHTML
  const handleExportHTML = (e) => {
    e.preventDefault();

    let webInfo = `<title>${title}</title>
    <meta name="description" content='${des}' />`;

    navigator.clipboard.writeText(webInfo);



      toast('Meta information copied!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  }


  // const [newDescription, setNewDescription] = useState([
  //   {
  //     'word' : 'one',
  //     'bold' : false
  //   },
  //   {
  //     'word' : 'two',
  //     'bold' : false 
  //   },
  //   {
  //     'word' : 'three',
  //     'bold' : false 
  //   },
  // ]);

  // const newHandleDescription = (e) => {
  //   console.log('state changed');
  //   const newDesArray = e.target.value.split(' ');
  //   newDesArray.map((singleDes)=>{

  //   });
  //   setNewDescription([
  //     ...newDescription,
  //     {
  //       'word' : 'new',
  //       'bold' : false
  //     }
  //   ]);
  // }



  return (
    <div className="container-fluid my-5">
      <ToastContainer closeButton={false} style={{width: '300px', textAlign: 'center'}} />
      <div className="row justify-content-center px-xl-5">
        <div className="col-lg-12 text-center mb-4">
          <h2 className="scrap-title">
            <span>Google</span> SERP Simulator
          </h2>
          <h5 style={{width: '80%', margin: '20px auto', lineHeight: '2em'}}>
            WiX Solution has designed a Free SERP Snippet Preview tool that can help you figure out the ideal SEO-optimized title & meta description as per Google Guidelines.
          </h5>
        </div>

        {/* left side */}
        <Leftside
          url={url}
          title={title}
          des={des}
          keywords={keywords} 
          fetchText={fetchText}
          handledate={handledate}
          handleratings={handleratings}
          handlead={handlead}
          handlemap={handlemap}
          handleHeatmap={handleHeatmap}
          showdata={showdata}
          showRatings={showRatings}
          showAd={showAd}
          showMap={showMap}
          showMap={showMap}
          showHeatmap={showHeatmap}
          handleReset={handleReset}
          handleChange={handleChange} 
          fetchMetaData={fetchMetaData}
          desChar={desChar}
          titleChar={titleChar}
          makeBold={makeBold} 
          capitalizeTitle={capitalizeTitle}
          handleCapitalize={handleCapitalize}
          handleExportHTML={handleExportHTML}
          titleWidth={titleWidth}
          desWidth={desWidth}
          // newHandleDescription={newHandleDescription}
        />

        


        {/* right content */}
        <Rightside
          url={url}
          title={title}
          des={des}
          showdata={showdata}
          showRatings={showRatings}
          showAd={showAd}
          showAd={showAd}
          showMap={showMap}
          showMap={showMap}
          showHeatmap={showHeatmap}
          handledesktop={handledesktop}
          handlemobile={handlemobile}
          responsive={responsive}
          capitalizeTitle={capitalizeTitle}
          handleSearch={handleSearch}
          searchKeyword={searchKeyword}
          titleWidth={titleWidth}
          desWidth={desWidth}
          // newHandleDescription={newHandleDescription}
          // newDescription={newDescription}
        />
      </div>
    </div>
  );
}

export default App;
