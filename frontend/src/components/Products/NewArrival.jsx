import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NewArrival = () => {

    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [canScrollLeft, setCanScrollLeft] = useState(false)

    const newArrivals = [
        {
            _id: "1",
            name: "Cello Bucket Mop",
            price: 1999,
            images:[
                {
                    url:"https://firebasestorage.googleapis.com/v0/b/om-cutlary.appspot.com/o/Product%20Images%2Fimage%3A250285Jul%2019%2C%20202221%3A00%3A19%20PM.jpg?alt=media&token=8b51da88-9c00-431e-b749-da721d180647",
                    altText: "Cello Kleen Bucket Mop"
                }
            ]
        },
        {
            _id: "2",
            name: "900 Gram Dimond Jar (Set of 3)",
            price: 139,
            images:[
                {
                    url:"https://firebasestorage.googleapis.com/v0/b/om-cutlary.appspot.com/o/Product%20Images%2Fimage%3A250600Jul%2021%2C%20202214%3A36%3A49%20PM.jpg?alt=media&token=2876ace6-7ecb-4323-a52e-38acbef08111",
                    altText: "900 Gram Dimond Jar (Set of 3)"
                }
            ]
        },
        {
            _id: "3",
            name: "Matla Stand",
            price: 50,
            images:[
                {
                    url:"https://firebasestorage.googleapis.com/v0/b/om-cutlary.appspot.com/o/Product%20Images%2Fimage%3A250601Jul%2021%2C%20202214%3A52%3A46%20PM.jpg?alt=media&token=4718d532-6d1d-40a6-bad2-d801a5cbf193",
                    altText: "Matla Stand"
                }
            ]
        },
        {
            _id: "4",
            name: "Comfort Patla",
            price: 99,
            images:[
                {
                    url:"https://firebasestorage.googleapis.com/v0/b/om-cutlary.appspot.com/o/Product%20Images%2Fimage%3A250603Jul%2021%2C%20202215%3A02%3A51%20PM.jpg?alt=media&token=b51b80ca-3f9a-4921-a24e-d9fedf46ca9d",
                    altText: "Comfort Patla"
                }
            ]
        },
        {
            _id: "5",
            name: "Medium Size Basket",
            price: 99,
            images:[
                {
                    url:"https://firebasestorage.googleapis.com/v0/b/om-cutlary.appspot.com/o/Product%20Images%2Fimage%3A250613Jul%2021%2C%20202217%3A18%3A48%20PM.jpg?alt=media&token=81e779fe-6441-499c-b625-02c4a1e50afa",
                    altText: "Medium Size Basket"
                }
            ]
        },
        {
            _id: "6",
            name: "Barni (Set of 4)",
            price: 49,
            images:[
                {
                    url:"https://firebasestorage.googleapis.com/v0/b/om-cutlary.appspot.com/o/Product%20Images%2Fimage%3A250612Jul%2021%2C%20202217%3A19%3A51%20PM.jpg?alt=media&token=fcb4edce-efe7-41ac-9593-0784aaab1764",
                    altText: "Barni"
                }
            ]
        },
        {
            _id: "7",
            name: "Big Size Basket",
            price: 149,
            images:[
                {
                    url:"https://firebasestorage.googleapis.com/v0/b/om-cutlary.appspot.com/o/Product%20Images%2Fimage%3A250610Jul%2021%2C%20202217%3A21%3A38%20PM.jpg?alt=media&token=f6475b27-4c64-4e36-b6b6-7fc04ab29ebc",
                    altText: "Big Size Basket"
                }
            ]
        },
        {
            _id: "8",
            name: "Large Dustbin",
            price: 149,
            images:[
                {
                    url:"https://firebasestorage.googleapis.com/v0/b/om-cutlary.appspot.com/o/Product%20Images%2Fimage%3A250608Jul%2021%2C%20202217%3A23%3A09%20PM.jpg?alt=media&token=6e7911be-b6a3-4ac0-a932-1a97e5e6ea01",
                    altText: "Dustbin"
                }
            ]
        },
    ]

const handleMouseDown=(e)=>{
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
}

const handleMouseMove=(e)=>{
    if(!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX
    scrollRef.current.scrollLeft = scrollLeft - walk
}

const handleMouseUpOrLeave=(e)=>{
    setIsDragging(false)
}

const scroll = (direction) =>{
    const scrollAmount = direction === 'left'? -300 : 300;
    scrollRef.current.scrollBy({left: scrollAmount, behaviour: "smooth"})
}

const updateScrollButtons = () =>{
    const container = scrollRef.current

    if(container){
        const leftScroll = container.scrollLeft
        const rightScrollable = container.scrollWidth>leftScroll+container.clientWidth
        setCanScrollLeft(leftScroll>0)
        setCanScrollRight(rightScrollable)
    }

    // console.log({
    //     scrollLeft: container.scrollLeft,
    //     clientWidth: container.clientWidth,
    //     containerScrollWidth: container.scrollWidth,
    //     offsetLeft :scrollRef.current.offsetLeft
    // })  
}

useEffect(()=>{
 const container = scrollRef.current
 if(container){
    container.addEventListener('scroll', updateScrollButtons)
 }
 return () => container.removeEventListener('scroll',updateScrollButtons)  
},[])

  return <section className='py-16 px-4 lg:px-0'>
      <div className='container mx-auto text-center mb-10 relative'>
        <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
        <p className='text-lg text-gray-600 mb-8'>
            Discover the latest products 
        </p>

        {/* Scroll Buttons */}
        <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
            <button 
            onClick={()=>scroll("left")} 
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${ canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            >
                <FiChevronLeft className='text-2xl'/>
            </button>
            <button 
            onClick={()=>scroll('right')}
            className={`p-2 rounded border ${ canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            >
                <FiChevronRight className='text-2xl'/>
            </button>
        </div>
      </div>

      {/* scrollable content */}
      <div 
      ref={scrollRef} 
      className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product)=>(
            <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                <img 
                src={product.images[0]?.url} 
                alt={product.images[0]?.altText || product.name}
                draggable="false"
                className='w-full h-[500px] object-cover rounded-lg'
                 />
                 <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                    <Link to={`/product/${product._id}`}>
                    <h4 className='font-medium'>{product.name}</h4>
                    <p className='mt-1'>&#8377;{product.price}</p>
                    </Link>
                 </div>
            </div>
        ))}
      </div>
    </section>
  
}

export default NewArrival
