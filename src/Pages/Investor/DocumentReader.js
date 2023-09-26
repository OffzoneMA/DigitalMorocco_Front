import React, { useEffect, useState } from 'react'
import { pdfjs, Document, Page } from "react-pdf";

export default function DocumentReader({src}) {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

  

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, [])
    console.log("Number of Pages:", numPages);
    
  return (
      <div className='max-w-2xl max-h-[600px] overflow-y-auto overflow-x-hidden bg-white rounded-xl p-2 shadow-2xl ' >
          <Document file={src} onLoadSuccess={({ numPages }) => setNumPages(numPages)}  >
                  {Array.apply(null, Array(numPages))
                      .map((x, i) => i + 1)
                  .map((page) => <Page  renderTextLayer={false}
        renderAnnotationLayer={false}
        customTextRenderer={false} pageNumber={page} className={"p-10 "} key={page}/>)}
          </Document>
       
          </div>
  )
}
