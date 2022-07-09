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
            To become the world’s trusted online giving platform and making fund raising possible 
            in most of the categories. Create a community that nutures humanity.
            </i>
          </p>
        </div>

        <div className='card' style={{ '--k': 2 }}>
          {/* <img src={img2} alt='' /> */}
          <p>
            Mission <br />
            <i>
            Humanity is at the core of our being. And our mission is to augment this through crowdfunding and nuture humanity by connecting the society for a good cause.
We make crowdfunding accessible for all. At Raise For a Cause, we believe your inspiration should be shared with everyone. 
Because that is how change happens.. By giving people the tools they need to capture and share their story far and wide, we have built this website and we are just getting started.
            </i>
          </p>
        </div>

        <div className='card' style={{ '--k': 3 }}>
          {/* <img src={img3} alt='' /> */}
          <p>
            USP
            <br />
            <i>
              
Although there are more crowdfunding websites out there, they are existing for a particular category. we will be acting as a one stop platform to all the categories. We also eliminate scams by allowing only verified fundraisers to get listed.
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
