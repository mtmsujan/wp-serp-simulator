import mapImg from "../../src/image/map.png";
import google from "../../src/image/google.png";
import heatmap from "../../src/image/heatmap.png";
import axios from 'axios';
import Parser from 'html-react-parser';
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {countries} from './countries';

import React, { useEffect, useRef } from "react";


const Rightside = ({
  url,
  title,
  des,
  showdata,
  showRatings,
  showAd,
  showMap,
  showHeatmap,
  handledesktop,
  handlemobile,
  responsive,
  capitalizeTitle,
  handleSearch,
  searchKeyword,
  titleWidth,
  desWidth,
}) => {

  const [searchResults, setSearchResults] = useState([]);
  const [country, setCountry] = useState('');
  const [skeleton, showSkeleton] = useState(true);

  const handleCountry = (e) => {
    setCountry(e.target.value);
  }

  const dotTitle = titleWidth > 600 ? title : title;
  const dotDescription = desWidth > 960 ? des : des;

  

  return (
    <>
      <div className="col-lg-8 mt-4">
        <div
          style={
            responsive === "mobile" ? { width: "400px", margin: "0 auto", transition: '-moz-initial.5s', transition: '.5s' } : { width: "100%", transition: '-moz-initial.5s', transition: '.5s' }
          }
        >
          {/* buttons */}
          <div className="col-lg-12 text-center d-flex align-items-center justify-content-end right-header">
            
            <select onChange={handleCountry} className="form-control" style={{width: '30%', marginRight: '20px'}}>
              {countries.map((country)=>(
                <option value={country.country_code} selected={country.country_code == 'us'}>{country.country_name}</option>
              ))}
              

            </select>
            
            <button onClick={handledesktop} className="device-btn me-4">
              <i className="fas fa-desktop"></i>

            </button>
            <button onClick={handlemobile} className="device-btn">
              <i className="fas fa-mobile-alt"></i>
            </button>

          </div>
          <div className="right-content shadow-sm rounded scrap-wrapper bg-white">
            {/* google header */}
            <div className="google-header d-flex justify-content-center justify-content-md-start flex-wrap ps-4">
              <img className="google-logo me-4 mb-4" src={google} alt="" />
              {/* google searchbar */}
              <div className="search-wrapper position-relative mb-4">
                <span onClick={(e)=>e.preventDefault()} className="tip">
                  tip
                </span>
                <form onSubmit={(e)=>{
                  e.preventDefault();

                  toast('Fetching google search result', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                  
                  axios.post(`${appLocalizer.apiUrl}/sujan/v1/search`, {
                    'keyword' : searchKeyword, 
                    'country' : (country.length == 0 ? 'us' : country)
                  }).then((res)=>{
                    res.data.request_info.success == true ? setSearchResults(res.data.organic_results): setSearchResults([]);

                    if(res.data.request_info.success == true){
                      toast('Fetched!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
  
                      showSkeleton(false);
                    }else{
                      toast('Failed to fetch!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    }


                    console.log(res.data['request_info']);
                    
                  });


                }}>
                  <input
                    type="text"
                    onChange={handleSearch}
                    className={`goolge-search ${responsive}`}
                    placeholder="Enter a keyword to get real search result"
                    
                  />
                </form>

                <ToastContainer closeButton={false} style={{width: '300px', textAlign: 'center'}} />
                
              </div>
            </div>

            {/* google menu */}
            <ul className={`google-menu ${responsive}`}>
              <li className="active">
                <a onClick={(e)=>e.preventDefault()} href="#">all</a>
              </li>
              <li>
                <a onClick={(e)=>e.preventDefault()} href="#">images</a>
              </li>
              <li>
                <a onClick={(e)=>e.preventDefault()} href="#">videos</a>
              </li>
              <li>
                <a onClick={(e)=>e.preventDefault()} href="#">news</a>
              </li>
              <li>
                <a onClick={(e)=>e.preventDefault()} href="#">maps</a>
              </li>
              <li>
                <a onClick={(e)=>e.preventDefault()} href="#">More</a>
              </li>
            </ul>

            {/*show  ad*/}
            {showAd ? (
              <div className="website-info-wraper">
                <a target="_blank" href="https://wixsolution.com" className="link">
                  {" "}
                  <strong>Ad.</strong> https://wixsolution.com/
                </a>
                <h4 className="title mt-2">WiX SEO Services</h4>
                <p>
                  We Bring Creative Solutions to our clients both in Marketing
                  and SEO Optimization for WIX
                </p>
              </div>
            ) : (
              ""
            )}

            {/* show map */}
            {showMap ? (
              <div className="website-info-wraper">
                <img src={mapImg} alt="" className="w-100" />
              </div>
            ) : (
              ""
            )}

            {/*searched website info*/}
            <div className="website-info-wraper position-relative">
              {showHeatmap ? (
                <img src={heatmap} alt="" className="heatmap" />
              ) : (
                ""
              )}
              <a href={url} target="_blank" className="link">
                {url.length == 0 ? 'http://wixsolution.com' : url}
              </a>

              <p className={capitalizeTitle ? "text-capitalize title mt-2 d-inline-block text-truncate" : 'title mt-2 d-inline-block text-truncate'} 
                style={{ fontSize: '20px', height: '0px', margin: '0px', padding: '0px' }}
                id="char_title">{title}</p>

              <br />

              <h4 className={capitalizeTitle ? "text-capitalize title mt-2 d-inline-block text-truncate" : 'title mt-2 d-inline-block text-truncate'} 
                style={{ maxWidth: '750px' }}
                id="scrp_title">{title.length == 0 ? 'This is an Example of a Title Tag' : dotTitle}</h4>


              <p className={'title mt-2 d-inline-block text-truncate'} 
                style={{ fontSize: '20px', height: '0px', margin: '0px', padding: '0px' }}
                id="char_description">{des}</p>

              <br />
              <div className="d-block">
                <p id='metaContent' className="d-inline-block text-truncate" style={{ maxWidth: '960px' }}>
                  {showdata ? <span className="date">Aug 20 2021 - </span> : ""}
                  {des.length == 0 ? 'Here is an example of what a snippet looks like in Google\'s SERPs. The content that appears here is usually taken from the Meta Description ' : dotDescription}


                  
                </p>
              </div>




              {showRatings ? (
                <div className="ratings-wrapper d-flex">
                  {/* ratings */}
                  <div className="ratings d-flex align-items-center">
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                  </div>

                  {/* rating info */}
                  <span className="ratings-info">Rating 4.1/5 -112 votes</span>
                </div>
              ) : (
                ""
              )}
            </div>


            {searchResults.map((result)=>(
              <div className="website-info-wraper position-relative">

                <a href={result.link} target="_blank" className="link">
                  {result.link}
                </a>
                
                <h4 className='title mt-2'>
                  <a href={result.link} target="_blank" className="title">
                    {result.title}
                  </a>
                </h4>
                <p>
                  {result.snippet}
                  
                </p>
                  
                
              </div>
            ))}


            {/* sceleton */}

            {skeleton == false ? '' : (

            
              <div className={`website-info-wraper ${responsive}`}>
                <div className="search-result is-placeholder mt-4">
                  <div>
                    <span className="snippet-url uk-display-block"></span>
                  </div>
                  <div>
                    <span className="snippet-title"></span>
                  </div>
                  <div className="snippet-descr"></div>
                </div>
                <div className="search-result is-placeholder mt-4">
                  <div>
                    <span className="snippet-url uk-display-block"></span>
                  </div>
                  <div>
                    <span className="snippet-title"></span>
                  </div>
                  <div className="snippet-descr"></div>
                </div>
                <div className="search-result is-placeholder mt-4">
                  <div>
                    <span className="snippet-url uk-display-block"></span>
                  </div>
                  <div>
                    <span className="snippet-title"></span>
                  </div>
                  <div className="snippet-descr"></div>
                </div>
                <div className="search-result is-placeholder mt-4">
                  <div>
                    <span className="snippet-url uk-display-block"></span>
                  </div>
                  <div>
                    <span className="snippet-title"></span>
                  </div>
                  <div className="snippet-descr"></div>
                </div>
              </div>

            )}


          </div>
        </div>
      </div>
    </>
  );
};

export default Rightside;
