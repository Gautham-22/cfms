import React from 'react';
import './Aboutus.css';
// import { BsChevronDoubleRight } from 'react-icons/bs';

function Aboutus() {
  return (
    <div className='App about' id='about'>
      <div className='container'>
        <h3> About Us </h3>

        <div className='card' style={{ '--k': 1 }}>
          {/* <img src={img1} alt='' /> */}
          <p>
            Vision <br />
            <i>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
              provident obcaecati quam quisquam placeat officia laborum alias
              pariatur voluptate nostrum.
            </i>
          </p>
        </div>

        <div className='card' style={{ '--k': 2 }}>
          {/* <img src={img2} alt='' /> */}
          <p>
            Mission <br />
            <i>
              Voluptatum asperiores id atque consequuntur temporibus! Autem
              delectus quo maxime natus impedit placeat deleniti veniam
              mollitia.
            </i>
          </p>
        </div>

        <div className='card' style={{ '--k': 3 }}>
          {/* <img src={img3} alt='' /> */}
          <p>
            USP
            <br />
            <i>
              Fugit quidem, similique odit, dolorum error deleniti voluptatem
              libero ducimus eum cupiditate neque beatae fugiat iste consequatur
              itaque hic modi eaque nesciunt!
            </i>
          </p>
        </div>

        {/* <div className='members'>
          <span>View more</span>
          <BsChevronDoubleRight className='arrow-right' />
        </div> */}
      </div>
    </div>
  );
}

export default Aboutus;
