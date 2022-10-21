import React, { useState } from "react";

export function Table(props) {
    const initDataShow =
      props.limit && props.bodyData
        ? props.bodyData.slice(0, Number(props.limit))
        : props.bodyData;
  
    const [dataShow, setDataShow] = useState(initDataShow);

  
    let pages = 1;
  
    let range = [];
  
    if (props.limit !== undefined) {
      let page = Math.floor(props.bodyData.length / Number(props.limit));
      pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
      range = [...Array(pages).keys()];
    }
  
    const [currPage, setCurrPage] = useState(0);
  
    const selectPage = (page) => {
      const start = Number(props.limit) * page;
      const end = start + Number(props.limit);
  
      setDataShow(props.bodyData.slice(start, end));
  
      setCurrPage(page);
    };
  
    return (
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            {props.headData && props.renderHead ? (
              <thead className="text-sm text-gray-700  bg-gray-50 ">
                <tr>
                  {props.headData.map((item, index) =>
                    props.renderHead(item, index)
                  )}
                </tr>
              </thead>
            ) : null}
            {props.bodyData && props.renderBody ? (
              <tbody>
                {dataShow.map((item, index) => props.renderBody(item, index))}
              </tbody>
            ) : null}
          </table>
        </div>
        {pages > 1 ? (
          <div className="flex w-100 justify-end items-center	mt-10">
            {range.map((item, index) => (
              <div
                key={index}
                className={`ml-5 w-8 rounded-full flex items-center justify-center cursor-pointer font-semibold hover:text-white hover:bg-red-100		 ${
                  currPage === index
                    ? "bg-red-200 rounded-full text-white font-bold	"
                    : ""
                }`}
                onClick={() => selectPage(index)}
              >
                {item + 1}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }