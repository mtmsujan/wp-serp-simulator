import React, { useState, useRef } from "react";

const Leftside = ({
  url,
  title,
  des,
  keywords,
  fetchText,
  handledate,
  showdata,
  handleratings,
  showRatings,
  handlead,
  handlemap,
  showAd,
  showMap,
  showHeatmap,
  handleHeatmap,
  handleReset,
  handleChange,
  fetchMetaData,
  makeBold,
  handleCapitalize,
  capitalizeTitle,
  handleExportHTML,
  titleWidth,
  desWidth,
  // newHandleDescription
}) => {


  return (
    <>
      <div className="col-lg-4 mt-4">
        <div className="left-content bg-white">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3 form-wrapper position-relative">
              <label htmlFor="form-url" className="form-label label-title">
                URL
              </label>
              <input
                type="url"
                className="form-control"
                onChange={handleChange}
                name="url"
                id="form-url"
                placeholder="http://youtube.com"
                defaultValue={url}
                value={url}
                placeholder="e.g. wixsolution.com"
              />
              <button onClick={fetchMetaData} className="btn btn-sm fetch-btn" href="#">
                
                {fetchText}
              </button>
            </div>


            
            <p className="chars-info text-right" style={{ textAlign: 'right' }}>{`${title.length} chars (${titleWidth}/600px)`}</p>
            <div className="mb-3 form-wrapper position-relative mt-2">
              {/* progress bar */}

              {/* progress bar */}
              {titleWidth <= 600 ?
                  <span className="snippet-progress"
                      style={{ width: `${100/600 * titleWidth}%`, background: "#00a9ff" }}>
                  </span> :
                  <span className="snippet-progress"
                      style={{ width: '100%', background: "#d9534f" }}>
                  </span>
              }
              

              <label htmlFor="title" className="form-label label-title">
                Title 
              </label>
              <textarea
                onChange={handleChange}
                name="title"
                className="form-control"
                defaultValue={title}
                value={title}
                id="title"
                rows="2"
                style={{fontSize: '16px'}} 
                className={capitalizeTitle ? "text-capitalize form-control" : 'form-control'}
                placeholder="Try to keep the title under 600px to display it in full length."
              ></textarea>

              {titleWidth > 600 ?
                <div className="alert alert-danger mt-3 text-bold" style={{fontSize: '14px'}}>The title is wider than 600px and it may not be displayed in full length.</div> : ''
              }

              <div className="d-flex justify-content-between align-items-center  mt-4">
                <button onClick={handleCapitalize} className="btn btn-sm capitalize-btn">
                  capitalize title
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-end align-items-center  mt-4">
              <span className="chars-info">{`${des.length} chars (${desWidth}/960px)`}</span>
            </div>

            <div className="mb-3 form-wrapper position-relative mt-3">
            {desWidth < 960 ?
                  <span className="snippet-progress"
                      style={{ width: `${100/960 * desWidth}%`, background: "#00a9ff" }}>
                  </span> :
                  <span className="snippet-progress"
                      style={{ width: '100%', background: "#d9534f" }}>
                  </span>
              }
              <label htmlFor="Description" className="form-label label-title">
                Description
              </label>
              <textarea
                onChange={handleChange}
                name="des"
                defaultValue={des}
                value={des}
                className="form-control"
                id="Description"
                rows="4"
                placeholder='The meta description may get trimmed at ~960 pixels on desktop and at ~680px on mobile. Keep it below ~158 chars.'
              ></textarea>



              {/* <textarea
                onChange={newHandleDescription}
                name="des"
                defaultValue={des}
                className="form-control"
                id="Descriptionn"
                rows="4"
                placeholder='The meta description may get trimmed at ~960 pixels on desktop and at ~680px on mobile. Keep it below ~158 chars.'
              ></textarea> */}






              {desWidth > 960 ?
                <div className="alert alert-danger mt-3 text-bold" style={{fontSize: '14px'}}>The meta description may get trimmed at ~960 pixels on desktop and at ~680px on mobile. Keep it below ~158 characters.</div> : ''
              }
              
            </div>

            <div className="mb-3 form-wrapper position-relative mt-5">
              <label htmlFor="bold-key" className="form-label label-title">
                Bold keywords
              </label>
              <input
                type="text"
                className="form-control"
                onChange={makeBold}
                value={keywords}
                id="bold-key"
                placeholder="separate with a comma"
              />
            </div>

            {/* checkbox */}
            <span className="form-label  mb-2 d-block option-label d-block mt-5">
              options
            </span>
            <div className="mb-3 form-wrapper d-flex align-items-center flex-wrap">
              <div className="single-checkbox me-2 d-flex align-items-center mb-3">
                <input
                  type="checkbox"
                  className="checkbox-item"
                  onChange={handleHeatmap}
                  checked={showHeatmap}
                  id="heatmap"
                />
                <label htmlFor="heatmap" className="form-label mb-0 ms-1">
                  Heatmap
                </label>
              </div>
              <div className="single-checkbox me-2 d-flex align-items-center mb-3">
                <input
                  type="checkbox"
                  className="checkbox-item"
                  onChange={handledate}
                  checked={showdata}
                  id="date"
                />
                <label htmlFor="date" className="form-label mb-0 ms-1">
                  Date
                </label>
              </div>
              <div className="single-checkbox me-2 d-flex align-items-center mb-3">
                <input
                  type="checkbox"
                  checked={showRatings}
                  onChange={handleratings}
                  className="checkbox-item"
                  id="rating"
                />
                <label htmlFor="rating" className="form-label mb-0 ms-1">
                  Rating
                </label>
              </div>
              <div className="single-checkbox me-2 d-flex align-items-center mb-3">
                <input
                  type="checkbox"
                  checked={showAd}
                  onChange={handlead}
                  className="checkbox-item"
                  id="ads"
                />
                <label htmlFor="ads" className="form-label mb-0 ms-1">
                  Ads
                </label>
              </div>
              <div className="single-checkbox me-2 d-flex align-items-center mb-3">
                <input
                  type="checkbox"
                  checked={showMap}
                  onChange={handlemap}
                  className="checkbox-item"
                  id="map-check"
                />
                <label htmlFor="map-check" className="form-label mb-0 ms-1">
                  Map pack
                </label>
              </div>
            </div>
            {/* operational button */}
            <div className="operational-btn-grp d-flex align-items-center mt-4">
              <button onClick={handleExportHTML} className="btn btn-sm me-3 blue-btn">
                export as HTML
              </button>
              
              <button
                onClick={handleReset}
                className="btn btn-sm capitalize-btn outline"
              >
                reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Leftside;
