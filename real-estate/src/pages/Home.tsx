import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ListingItem from '../components/ListingCard';
import axios from 'axios';

type ListingType = {
  _id: string;
  ImageUrl: string[];
  name: string;
  address: string;
  description: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice: number;
  type: string;
  bedroom: number;
  bathroom: number;
};

export default function Home() {
  const [offerListings, setOfferListings] = useState<ListingType[]>([]);
  const [saleListings, setSaleListings] = useState<ListingType[]>([]);
  const [rentListings, setRentListings] = useState<ListingType[]>([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const { data } = await axios.get(`/api/listing/get?offer=true&limit=4`);
        setOfferListings(data);
        console.log("offer listing : ", data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const { data } = await axios.get(`/api/listing/get?type=rent&limit=4`);
        setRentListings(data);
        console.log("rent listing : ", data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const { data } = await axios.get(`/api/listing/get?type=sell&limit=4`);
        setSaleListings(data);
        console.log("sale listing : ", data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Real Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation modules={[Navigation]}>
        {offerListings?.length > 0 &&
          offerListings.map((listing) =>
            listing?.ImageUrl?.length > 0 ? (
              listing.ImageUrl.map((img: string, index: number) => (
                <SwiperSlide key={`${listing._id}-${index}`}>
                  <div
                    style={{
                      background: `url(${img || '/images/9024-Main-Image_1600x.webp'}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                    className="h-[500px]"
                  ></div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url('/images/9024-Main-Image_1600x.webp') center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className="h-[500px]"
                ></div>
              </SwiperSlide>
            )
          )}
      </Swiper>


      {/* listing results for offer, sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings?.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem
                  listing={listing}
                  image={listing.ImageUrl?.[0]}
                  key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings?.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem
                  listing={listing}
                  image={listing.ImageUrl?.[0]}
                  key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings?.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing}
                  image={listing.ImageUrl?.[0]}
                  key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
